import Image from "next/image";
import type { CSSProperties } from "react";

export function Logo({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Image
      src="/logo.png"
      alt="HITATCG"
      width={1024}
      height={1536}
      className={`object-contain ${className ?? ""}`}
      style={style}
      priority
    />
  );
}
