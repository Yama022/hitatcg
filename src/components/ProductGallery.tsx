"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-2xl border border-ink/10 bg-gradient-to-br from-sakura-pale to-cream-soft">
        <p className="font-display px-6 text-center text-ink-soft">Photo à venir</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10">
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border ${
                index === active ? "border-ink" : "border-ink/10"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
