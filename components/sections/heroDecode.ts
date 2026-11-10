/**
 * Frame decoding shared by the hero's decode worker and its main-thread
 * fallback. Only the visible (cover-cropped) part of a frame is decoded: on a
 * portrait phone that is ~25% of a landscape frame, so more frames fit in the
 * same memory and no pixels are wasted.
 */

/** A region of the full frame, as fractions (0–1) of its width/height. */
export interface Region {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const FULL_REGION: Region = { x: 0, y: 0, w: 1, h: 1 };

export interface DecodeRequest {
  /** Pixel size of the encoded image. */
  srcW: number;
  srcH: number;
  /** Visible part of the frame. */
  crop: Region;
  /** Output size when `resize` is set. */
  outW: number;
  outH: number;
  resize: boolean;
}

export interface DecodedFrame {
  bmp: ImageBitmap;
  /** Which part of the full frame the bitmap holds. */
  region: Region;
}

/** Decodes the visible part of an encoded frame with createImageBitmap. */
export async function decodeBlobTo(blob: Blob, req: DecodeRequest): Promise<DecodedFrame> {
  const { srcW, srcH, crop } = req;
  const full = crop.w >= 0.999 && crop.h >= 0.999;
  const sx = full ? 0 : Math.max(0, Math.floor(crop.x * srcW));
  const sy = full ? 0 : Math.max(0, Math.floor(crop.y * srcH));
  const sw = full ? srcW : Math.min(srcW - sx, Math.ceil(crop.w * srcW));
  const sh = full ? srcH : Math.min(srcH - sy, Math.ceil(crop.h * srcH));
  const opts: ImageBitmapOptions | undefined = req.resize
    ? { resizeWidth: req.outW, resizeHeight: req.outH, resizeQuality: "medium" }
    : undefined;
  try {
    const bmp = full
      ? await createImageBitmap(blob, opts)
      : await createImageBitmap(blob, sx, sy, sw, sh, opts);
    return {
      bmp,
      region: full ? FULL_REGION : { x: sx / srcW, y: sy / srcH, w: sw / srcW, h: sh / srcH },
    };
  } catch {
    // Older engines without crop/resize options: plain full decode.
    return { bmp: await createImageBitmap(blob), region: FULL_REGION };
  }
}
