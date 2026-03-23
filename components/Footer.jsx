"use client";

import Image from "next/image";
import Link from "next/link";
import { Exo_2, Sora } from "next/font/google";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { siteContent } from "@/data/siteContent";

const headingFont = Sora({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const brandFont = Exo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
});

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialHrefByLabel = Object.fromEntries(
    siteContent.socials.map((social) => [social.label, social.href])
  );

  const footerSocials = [
    {
      label: "Instagram",
      href: socialHrefByLabel.Instagram ?? "#",
      icon: Instagram,
      wrapClass:
        "bg-[linear-gradient(180deg,#fff6fb_0%,#ffe8f3_100%)] shadow-[0_12px_24px_rgba(239,72,153,0.16)]",
      iconClass: "text-[#ec4899]",
    },
    {
      label: "Facebook",
      href: socialHrefByLabel.Facebook ?? "#",
      icon: Facebook,
      wrapClass:
        "bg-[linear-gradient(180deg,#eef5ff_0%,#dbeafe_100%)] shadow-[0_12px_24px_rgba(59,130,246,0.16)]",
      iconClass: "text-[#2563eb]",
    },
    {
      label: "YouTube",
      href: "#",
      icon: Youtube,
      wrapClass:
        "bg-[linear-gradient(180deg,#fff2f2_0%,#ffe0e0_100%)] shadow-[0_12px_24px_rgba(239,68,68,0.16)]",
      iconClass: "text-[#ef4444]",
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: Linkedin,
      wrapClass:
        "bg-[linear-gradient(180deg,#eff7ff_0%,#d9ecff_100%)] shadow-[0_12px_24px_rgba(14,116,144,0.16)]",
      iconClass: "text-[#0284c7]",
    },
  ];

  return (
    <footer className="relative mt-24 pb-4 sm:mt-28 sm:pb-6 md:mt-32 md:pb-8" style={{"marginBottom":"-20px",
                                                                                      "marginTop":"150px"
    }}>
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="relative mx-auto w-full overflow-hidden rounded-[32px] border border-[rgba(173,195,221,0.75)] bg-[linear-gradient(180deg,#edf5ff_0%,#eef6ff_100%)] shadow-[0_26px_68px_rgba(18,35,63,0.12)] md:rounded-[40px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(102, 169, 247, 0.51),transparent_42%),radial-gradient(circle_at_22%_76%,rgba(197, 225, 255, 0.88),transparent_50%),radial-gradient(circle_at_82%_38%,rgba(165, 206, 253, 0.6),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(238, 234, 137, 0.4)_0%,rgba(255,255,255,0)_100%)]" />

          <div className="relative grid gap-10 px-5 py-8 sm:px-7 sm:py-10 md:gap-12 md:px-10 md:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:px-14 lg:py-16 xl:px-16 xl:py-[4.5rem] 2xl:px-20">
            <div className="max-w-[32rem] lg:max-w-[36rem] xl:max-w-[40rem]">
              <h2
                className={`${headingFont.className} text-[clamp(1.2rem,3.5vw,5.4rem)] font-[800] leading-[0.94] tracking-[-0.06em] text-[#4b5667] `}
              style={{"marginLeft":"25px","marginBottom":"-10px"}}>
                Premium Products,
                Affordable Price
              </h2>
            </div>

            <div className="lg:justify-self-end"style={{"marginRight":"45px","marginTop":"15px"}}>
              <div className="mx-auto max-w-[34rem] lg:mx-0 lg:max-w-[38rem] xl:max-w-[42rem]">
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <Link
                    href="/"
                    className="group relative flex h-[7.25rem] w-[7.25rem] shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/72 shadow-[0_16px_30px_rgba(18,35,63,0.08)] backdrop-blur-sm"
                  >
                    <div className="relative h-[6.2rem] w-[6.2rem]">
                      <Image
                        src={siteContent.logoSrc}
                        alt={`${siteContent.companyName} logo`}
                        fill
                        sizes="100px"
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>

                  <div className="min-w-0">
                    <p
                      className={`${brandFont.className} text-[clamp(2.9rem,4vw,4.7rem)] font-[800] italic leading-[0.9] tracking-[-0.08em] text-[var(--primary)]`}
                    style={{"marginRight":"30px","marginTop":"15px"}}>
                      {siteContent.shortName} Marketing
                    </p>
                    <p
                      className={`${brandFont.className} mt-1 pl-1 text-[0.86rem] font-[600] uppercase tracking-[0.52em] text-[#5b6a7f]`}
                    >
                      Company
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-5">
                  {footerSocials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={social.label}
                        className={`group inline-flex h-14 w-14 items-center justify-center rounded-[14px] ring-1 ring-white/75 transition-all duration-200 hover: hover:scale-[1.02] ${social.wrapClass}`}
                      style={{"margin":"30px","marginTop":"15px"}}>
                        <Icon
                          size={30}
                          className={`transition-transform duration-200 group-hover:scale-110 ${social.iconClass}`}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-5 border-t border-[rgba(91,106,127,0.24)] px-0 py-5 sm:mx-7 sm:py-6 md:mx-10 md:py-7 lg:mx-14 xl:mx-16 2xl:mx-20">
            <p className="text-center text-[0.97rem] leading-7 text-[#7f8ca1]">
              Copyright {currentYear} {siteContent.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
