import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";

const sizeMap = {
  sm: {
    frame: "h-11 w-11",
    title: "text-lg",
    tag: "text-[10px]",
    gap: "gap-3",
  },
  md: {
    frame: "h-[52px] w-[52px]",
    title: "text-xl",
    tag: "text-[11px]",
    gap: "gap-3.5",
  },
  lg: {
    frame: "h-16 w-16",
    title: "text-2xl",
    tag: "text-xs",
    gap: "gap-4",
  },
};

function BrandContent({
  size = "md",
  className = "",
  showTagline = true,
  textTone = "dark",
  priority = false,
}) {
  const styles = sizeMap[size] ?? sizeMap.md;
  const titleColor =
    textTone === "light" ? "text-white" : "text-[var(--text-primary)]";
  const tagColor =
    textTone === "light"
      ? "text-white/70"
      : "text-[var(--text-muted)]";

  return (
    <div className={`flex items-center ${styles.gap} ${className}`.trim()}>
      <div
        className={`relative overflow-hidden rounded-full border border-[var(--border-strong)] bg-white p-1 shadow-[var(--shadow-sm)] ${styles.frame}`}
      >
        <Image
          src={siteContent.logoSrc}
          alt={`${siteContent.companyName} logo`}
          fill
          sizes="64px"
          priority={priority}
          className="object-contain p-0.5"
        />
      </div>
      <div className="min-w-0">
        <p
          className={`truncate font-black uppercase tracking-[0.16em] ${styles.title} ${titleColor}`}
        >
          {siteContent.shortName}
        </p>
        {showTagline ? (
          <p className={`-mt-1 font-semibold uppercase tracking-[0.24em] ${styles.tag} ${tagColor}`}>
            {siteContent.tagline}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function BrandLockup({
  href = "/",
  size = "md",
  className = "",
  showTagline = true,
  textTone = "dark",
  priority = false,
}) {
  const content = (
    <BrandContent
      size={size}
      className={className}
      showTagline={showTagline}
      textTone={textTone}
      priority={priority}
    />
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="group inline-flex">
      {content}
    </Link>
  );
}
