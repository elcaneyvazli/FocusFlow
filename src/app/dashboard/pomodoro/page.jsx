"use client";
import React from "react";
import FlipCountdown from "@/components/FlipCountdown";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FlipCountdown 
        to="2025-01-01T00:00:00"
        labels={['Gün', 'Saat', 'Dakika', 'Saniye']}
        className="scale-125"
        onComplete={() => alert('Mutlu Yıllar!')}
      />
    </div>
  );
}