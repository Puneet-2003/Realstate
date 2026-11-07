"use client";

import React from "react";
import { Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

export function ConsultationModal({ isOpen, onClose, propertyTitle }: ConsultationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-lenis-prevent
        className="[color-scheme:dark] sm:max-w-xl max-h-[92vh] max-h-[92dvh] overflow-y-auto overscroll-contain bg-[#1E1700] border-[#BCB893]/35 p-5 sm:p-8 shadow-2xl text-[#F8F7F0] rounded-2xl"
      >
        <DialogHeader className="p-0 text-left">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#CFCCAE] font-semibold mb-1">
            <Shield className="w-3.5 h-3.5 text-[#BCB893]" />
            <span>Confidential Private Advisory</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-serif text-white font-light pr-8">
            Request a Private Consultation
          </DialogTitle>
          <DialogDescription className="text-xs text-[#CFCCAE] mt-1 leading-relaxed">
            Connect with our senior partners for off-market acquisitions, bespoke architectural
            representations, and private viewings.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          {/* Generic portfolio placeholder titles aren't a specific property. */}
          <ConsultationForm
            propertyTitle={propertyTitle && !/portfolio consultation/i.test(propertyTitle) ? propertyTitle : undefined}
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
