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
    <footer className="footer-wrapper">
      <div className="footer-outer-padding">
        <div className="footer-card">
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(102,169,247,0.51),transparent_42%),radial-gradient(circle_at_22%_76%,rgba(197,225,255,0.88),transparent_50%),radial-gradient(circle_at_82%_38%,rgba(165,206,253,0.6),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(238,234,137,0.4)_0%,rgba(255,255,255,0)_100%)]" />

          {/* Main content grid */}
          <div className="footer-content">
            {/* Left column: Tagline */}
            <div className="footer-tagline-col">
              <h2 className={`${headingFont.className} footer-tagline`}>
                Premium Products,
                <br className="hidden sm:inline" />
                Affordable Price
              </h2>
            </div>

            {/* Right column: Logo + Socials */}
            <div className="footer-brand-col">
              <div className="footer-brand-inner">
                {/* Logo + Brand name */}
                <div className="footer-brand-row">
                  <Link
                    href="/"
                    className="footer-logo-circle"
                  >
                    <div className="footer-logo-img">
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
                    <p className={`${brandFont.className} footer-brand-name`}>
                      {siteContent.shortName} Marketing
                    </p>
                    <p className={`${brandFont.className} footer-brand-sub`}>
                      Company
                    </p>
                  </div>
                </div>

                {/* Social icons */}
                <div className="footer-socials">
                  {footerSocials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={social.label}
                        className={`group footer-social-icon ${social.wrapClass}`}
                      >
                        <Icon
                          size={26}
                          className={`transition-transform duration-200 group-hover:scale-110 ${social.iconClass}`}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="footer-copyright-bar">
            <p className="footer-copyright-text">
              Copyright {currentYear} {siteContent.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ─── Footer Base ─── */
        .footer-wrapper {
          position: relative;
          margin-top: 80px;
          padding-bottom: 16px;
          margin-bottom: -20px;
        }

        .footer-outer-padding {
          padding: 0 12px;
        }

        .footer-card {
          position: relative;
          margin: 0 auto;
          width: 100%;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(173, 195, 221, 0.75);
          background: linear-gradient(180deg, #edf5ff 0%, #eef6ff 100%);
          box-shadow: 0 26px 68px rgba(18, 35, 63, 0.12);
        }

        /* ─── Content Grid ─── */
        .footer-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          padding: 32px 20px;
        }

        /* ─── Tagline ─── */
        .footer-tagline-col {
          width: 100%;
        }

        .footer-tagline {
          font-size: clamp(1.5rem, 5vw, 2.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #4b5667;
        }

        /* ─── Brand Column ─── */
        .footer-brand-col {
          width: 100%;
        }

        .footer-brand-inner {
          max-width: 100%;
        }

        .footer-brand-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .footer-logo-circle {
          position: relative;
          display: flex;
          height: 5.5rem;
          width: 5.5rem;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 16px 30px rgba(18, 35, 63, 0.08);
          backdrop-filter: blur(4px);
        }

        .footer-logo-img {
          position: relative;
          height: 4.6rem;
          width: 4.6rem;
        }

        .footer-brand-name {
          font-size: clamp(1.6rem, 5vw, 2.8rem);
          font-weight: 800;
          font-style: italic;
          line-height: 0.95;
          letter-spacing: -0.06em;
          color: var(--primary);
          text-align: center;
        }

        .footer-brand-sub {
          margin-top: 4px;
          padding-left: 2px;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.42em;
          color: #5b6a7f;
          text-align: center;
        }

        /* ─── Social Icons ─── */
        .footer-socials {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          margin-top: 24px;
        }

        .footer-social-icon {
          display: inline-flex;
          height: 48px;
          width: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          ring: 1px solid rgba(255, 255, 255, 0.75);
          transition: all 0.2s;
        }

        .footer-social-icon:hover {
          transform: scale(1.05);
        }

        /* ─── Copyright ─── */
        .footer-copyright-bar {
          position: relative;
          margin: 0 20px;
          border-top: 1px solid rgba(91, 106, 127, 0.24);
          padding: 16px 0;
        }

        .footer-copyright-text {
          text-align: center;
          font-size: 0.85rem;
          line-height: 1.6;
          color: #7f8ca1;
        }

        /* ════════════════════════════════
           TABLET (640px+)
           ════════════════════════════════ */
        @media (min-width: 640px) {
          .footer-wrapper {
            margin-top: 100px;
            padding-bottom: 20px;
          }

          .footer-outer-padding {
            padding: 0 16px;
          }

          .footer-card {
            border-radius: 32px;
          }

          .footer-content {
            gap: 32px;
            padding: 40px 28px;
          }

          .footer-brand-row {
            flex-direction: row;
            gap: 16px;
          }

          .footer-brand-name {
            text-align: left;
          }

          .footer-brand-sub {
            text-align: left;
          }

          .footer-copyright-bar {
            margin: 0 28px;
            padding: 20px 0;
          }

          .footer-copyright-text {
            font-size: 0.9rem;
          }
        }

        /* ════════════════════════════════
           MEDIUM (768px+)
           ════════════════════════════════ */
        @media (min-width: 768px) {
          .footer-card {
            border-radius: 36px;
          }

          .footer-content {
            gap: 40px;
            padding: 48px 40px;
          }

          .footer-logo-circle {
            height: 6.5rem;
            width: 6.5rem;
          }

          .footer-logo-img {
            height: 5.5rem;
            width: 5.5rem;
          }

          .footer-brand-name {
            font-size: clamp(2rem, 4vw, 3rem);
          }

          .footer-copyright-bar {
            margin: 0 40px;
            padding: 24px 0;
          }
        }

        /* ════════════════════════════════
           DESKTOP (1024px+)
           ════════════════════════════════ */
        @media (min-width: 1024px) {
          .footer-wrapper {
            margin-top: 130px;
            padding-bottom: 24px;
          }

          .footer-outer-padding {
            padding: 0 24px;
          }

          .footer-card {
            border-radius: 40px;
          }

          .footer-content {
            flex-direction: row;
            align-items: center;
            text-align: left;
            gap: 48px;
            padding: 56px 56px;
          }

          .footer-tagline-col {
            width: auto;
            flex: 1;
          }

          .footer-tagline {
            font-size: clamp(2rem, 3.5vw, 3.4rem);
            margin-left: 20px;
          }

          .footer-brand-col {
            width: auto;
          }

          .footer-brand-inner {
            margin-left: auto;
          }

          .footer-brand-row {
            flex-direction: row;
            gap: 20px;
          }

          .footer-brand-name {
            text-align: left;
            font-size: clamp(2.2rem, 3.5vw, 3.5rem);
          }

          .footer-brand-sub {
            text-align: left;
          }

          .footer-logo-circle {
            height: 7.25rem;
            width: 7.25rem;
          }

          .footer-logo-img {
            height: 6.2rem;
            width: 6.2rem;
          }

          .footer-socials {
            gap: 20px;
            margin-top: 28px;
            justify-content: flex-start;
          }

          .footer-social-icon {
            height: 56px;
            width: 56px;
          }

          .footer-copyright-bar {
            margin: 0 56px;
            padding: 24px 0;
          }

          .footer-copyright-text {
            font-size: 0.97rem;
          }
        }

        /* ════════════════════════════════
           LARGE DESKTOP (1280px+)
           ════════════════════════════════ */
        @media (min-width: 1280px) {
          .footer-outer-padding {
            padding: 0 40px;
          }

          .footer-content {
            padding: 64px 64px;
          }

          .footer-socials {
            gap: 24px;
          }

          .footer-copyright-bar {
            margin: 0 64px;
          }
        }
      `}</style>
    </footer>
  );
}
