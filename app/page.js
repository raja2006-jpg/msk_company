"use client";

import Link from "next/link";
import Image from "next/image";
import { Pacifico } from "next/font/google";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  ArrowRight,
  Bookmark,
  Heart,
  Instagram,
  MessageCircle,
  Pause,
  Play,
  Send,
  Star,
  Tv,
  Armchair,
  SprayCan,

  Users,
  Building,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import products from "@/data/products.json";
import { getWhatsAppUrl, siteContent } from "@/data/siteContent";

const instagramHeadingFont = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const instagramBackgroundDots = [
  { top: "7%", left: "4%", size: 12, opacity: 0.18 },
  { top: "13%", left: "17%", size: 18, opacity: 0.12 },
  { top: "9%", left: "29%", size: 14, opacity: 0.2 },
  { top: "17%", left: "42%", size: 10, opacity: 0.16 },
  { top: "11%", left: "57%", size: 16, opacity: 0.14 },
  { top: "15%", left: "72%", size: 13, opacity: 0.2 },
  { top: "8%", left: "88%", size: 17, opacity: 0.13 },
  { top: "28%", left: "9%", size: 16, opacity: 0.14 },
  { top: "24%", left: "23%", size: 11, opacity: 0.12 },
  { top: "31%", left: "36%", size: 15, opacity: 0.18 },
  { top: "25%", left: "51%", size: 12, opacity: 0.16 },
  { top: "33%", left: "66%", size: 18, opacity: 0.13 },
  { top: "27%", left: "81%", size: 14, opacity: 0.2 },
  { top: "44%", left: "6%", size: 13, opacity: 0.16 },
  { top: "49%", left: "19%", size: 17, opacity: 0.12 },
  { top: "41%", left: "33%", size: 12, opacity: 0.2 },
  { top: "47%", left: "48%", size: 16, opacity: 0.14 },
  { top: "43%", left: "63%", size: 11, opacity: 0.18 },
  { top: "51%", left: "77%", size: 15, opacity: 0.13 },
  { top: "46%", left: "91%", size: 12, opacity: 0.18 },
  { top: "63%", left: "11%", size: 18, opacity: 0.14 },
  { top: "58%", left: "27%", size: 13, opacity: 0.18 },
  { top: "66%", left: "41%", size: 16, opacity: 0.12 },
  { top: "61%", left: "55%", size: 10, opacity: 0.2 },
  { top: "68%", left: "70%", size: 14, opacity: 0.15 },
  { top: "60%", left: "84%", size: 17, opacity: 0.12 },
  { top: "79%", left: "7%", size: 12, opacity: 0.18 },
  { top: "85%", left: "22%", size: 16, opacity: 0.13 },
  { top: "76%", left: "38%", size: 14, opacity: 0.2 },
  { top: "83%", left: "53%", size: 18, opacity: 0.12 },
  { top: "78%", left: "68%", size: 11, opacity: 0.16 },
  { top: "86%", left: "82%", size: 15, opacity: 0.18 },
  { top: "81%", left: "93%", size: 13, opacity: 0.12 },
];

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const instagramVideoRef = useRef(null);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isInstagramVideoPlaying, setIsInstagramVideoPlaying] = useState(true);
  const featuredProducts = [
    products.find((product) => product.category === "Electronics"),
    products.find((product) => product.category === "Furniture"),
    products.find((product) => product.category === "Cleaning"),
    products.find((product) => product.id === "elec-003"),
    products.find((product) => product.id === "furn-002"),
    products.find((product) => product.id === "clean-005"),
  ].filter(Boolean);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const bestSellerIcons = {
    Electronics: Tv,
    Furniture: Armchair,
    Cleaning: SprayCan,
  };
  const heroSlides = [
    {
      key: "electronics",
      title: "Electronics",
      eyebrow: "Smart Entertainment",
      description:
        "Upgrade your space with smart TVs and sound systems selected for a sharper, more immersive home setup.",
      image: products.find((product) => product.id === "elec-001")?.image ?? "/products/tv-55.jpg",
      alt: products.find((product) => product.id === "elec-001")?.name ?? "Ultra HD Smart TV",
      icon: Tv,
      surfaceGradient: "linear-gradient(135deg, #0f2746 0%, #17355d 46%, #2d5b92 100%)",
      isIllustration: false,
      stat: "4K Smart TVs",
    },
    {
      key: "furniture",
      title: "Furniture",
      eyebrow: "Comfort-First Living",
      description:
        "Discover sofas and statement pieces that bring comfort, presence, and a premium finish to every room.",
      image: products.find((product) => product.id === "furn-001")?.image ?? "/products/sofa-l.jpg",
      alt: products.find((product) => product.id === "furn-001")?.name ?? "Premium L-Shape Sofa",
      icon: Armchair,
      surfaceGradient: "linear-gradient(135deg, #1d2b3b 0%, #385271 48%, #728fb1 100%)",
      isIllustration: false,
      stat: "Premium Sofas",
    },
    {
      key: "home-essentials",
      title: "Cleaners",
      eyebrow: "Everyday Care",
      description:
        "Keep daily life easy with practical home essentials designed to keep your spaces fresh, clean, and ready to use.",
      image:
        products.find((product) => product.id === "clean-002")?.image ??
        "/products/cleaning-spray.svg",
      alt:
        products.find((product) => product.id === "clean-002")?.name ??
        "Multi-Surface Cleaning Spray",
      icon: SprayCan,
      surfaceGradient: "linear-gradient(135deg, #12344f 0%, #1a4f73 50%, #4f86c6 100%)",
      isIllustration: true,
      stat: "Everyday Essentials",
    },
  ];
  const activeHero = heroSlides[activeHeroIndex] ?? heroSlides[0];
  const companyStats = [
    {
      value: "500+",
      label: "products available",
      icon: Tv,
      iconWrapClass: "bg-[#e4edf8]",
      iconClass: "text-[#17355d]",
    },
    {
      value: "1000+",
      label: "Happy Customers",
      icon: Users,
      iconWrapClass: "bg-[#e9f2fd]",
      iconClass: "text-[#2d5b92]",
    },
    {
      value: "5+",
      label: "Years Experience",
      icon: Award,
      iconWrapClass: "bg-[#eaf0f9]",
      iconClass: "text-[#21446f]",
    },
    {
      value: "50+",
      label: "Brand Partners",
      icon: Building,
      iconWrapClass: "bg-[#edf4fd]",
      iconClass: "text-[#4f86c6]",
    },
  ];

  const instagramHref =
    siteContent.socials.find((social) => social.label.toLowerCase() === "instagram")?.href ?? "#";
  const hasInstagramLink = instagramHref !== "#";
  const instagramHandle = `${siteContent.shortName.toLowerCase()}_marketingco`;

  const handleInstagramVideoReady = async () => {
    const video = instagramVideoRef.current;

    if (!video) {
      return;
    }

    try {
      await video.play();
      setIsInstagramVideoPlaying(true);
    } catch {
      setIsInstagramVideoPlaying(false);
    }
  };

  const toggleInstagramVideoPlayback = async () => {
    const video = instagramVideoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setIsInstagramVideoPlaying(true);
      } catch {
        setIsInstagramVideoPlaying(false);
      }

      return;
    }

    video.pause();
    setIsInstagramVideoPlaying(false);
  };

  useEffect(() => {
    const rotateInterval = window.setTimeout(() => {
      setActiveHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 4300);

    return () => window.clearTimeout(rotateInterval);
  }, [activeHeroIndex, heroSlides.length]);

  return (
    <>
      <Navbar />

      <section className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1324] pt-20 lg:pt-0">
        {/* Full Bleed Background Image Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div
              key={`bg-img-${activeHero.key}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div 
                className="absolute inset-0 opacity-80" 
                style={{ background: activeHero.surfaceGradient }} 
              />
              <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeHero.image}
                  alt={activeHero.alt}
                  fill
                  priority
                  className={`object-cover transition-opacity duration-1000 ${activeHero.isIllustration ? "object-contain p-20 opacity-25" : "opacity-50"}`}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {/* Subtle vignette/overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#fffdf7]/40 z-10 pointer-events-none" />
        </div>

        {/* Centered Content */}
        <div className="container-custom relative z-20 w-full px-4 sm:px-6 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeHero.key}`}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              variants={stagger}
              className="flex flex-col items-center max-w-4xl mx-auto"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-[6px] bg-white/10 backdrop-blur-md border border-white/10 px-10 py-5 text-xs md:text-sm font-bold tracking-[0.2em] text-[#eef4fb] uppercase shadow-lg"
                style={{"padding":"10px 10px"}}>
                  {(() => {
                    const HeroIcon = activeHero.icon;
                    return <HeroIcon size={16} />;
                  })()}
                  {activeHero.eyebrow}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                variants={fadeInUp}
                className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[1.05] tracking-[-0.03em] text-white drop-shadow-2xl mb-6"
              >
                <span className="block text-white/95">Buy your perfect</span>
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a8c6e8]">
                  {activeHero.title}
                </span>
                <span className="block mt-1 text-white/95">Interiors</span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                variants={fadeInUp}
                className="mt-2 max-w-2xl text-[clamp(1.05rem,2.5vw,1.25rem)] leading-relaxed text-[#dbe5f0] drop-shadow-md font-medium"
              >
                {activeHero.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={fadeInUp} className="mt-10 mb-8 lg:mb-0">
                <Link
                  href="/products"
                  className="group flex items-center gap-5 rounded-full bg-white/95 backdrop-blur-md pl-8 pr-2 py-2 text-base md:text-lg font-bold tracking-wide text-[var(--primary)] transition-all duration-300 hover:bg-white hover:text-[var(--primary-dark)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1"
                style={{"paddingLeft":"20px","border":"4px solid var(--border-strong)","borderRadius":"50px","marginTop":"20px"}}>
                  <span>Explore now</span>
                  <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-md transition-all duration-400 hover:rotate-45"
                  >
                    <ArrowRight size={25} width={30} height={30} className="transition-transform duration-300 group-hover:translate-x-1 " />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-3 opacity-75">
          <span className="text-[#dbe5f0] text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] h-10 bg-gradient-to-b from-white/80 to-transparent rounded-full"
          />
        </div>
      </section>

    

      <section className="section-padding relative overflow-hidden bg-[#fffdf7]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,249,236,0.9),rgba(255,253,247,0.86)_42%,rgba(255,255,255,0.78)_100%)]" />
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(51, 117, 216, 0.2) 0px, rgba(28, 102, 214, 0.2) 2px, transparent 2.4px)",
              backgroundSize: "50px 50px",
              backgroundPosition: "14px 12px",
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection>
            <motion.div
              variants={fadeInUp}
              className="mb-12 flex flex-col items-center gap-4 text-center"
            >
              <div className="flex flex-col items-center">
                
                <h2 className="section-title">
                  Our Best <span className="gradient-text">Sellers</span>
                </h2>
              </div>
                <Link
                href="/products"
                className="group flex items-center gap-2 font-semibold text-[var(--primary)] transition-all hover:gap-3 mb-4 mt-2 "
              >
                View All Products
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </Link> 
             
            </motion.div>
            
          </AnimatedSection>
         

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <Link href={`/products/${product.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-[20px] bg-[#111827] shadow-[0_18px_45px_rgba(15,23,42,0.16)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_28px_60px_rgba(15,23,42,0.22)]">
                    <div className="relative aspect-[0.88] overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/22 to-black/12 transition-all duration-500 group-hover:from-black/84 group-hover:via-black/38 group-hover:to-black/18" />
                     <div className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/29 text-white backdrop-blur-md transition-all duration-900 transform group-hover:rotate-20">
                        {(() => {
                          const CardIcon = bestSellerIcons[product.category] ?? Star;
                          return <CardIcon size={23} strokeWidth={2} />;  
                        })()}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 items-center">
                        <div className="translate-y-7 transition-transform duration-500 group-hover:translate-y-0">
                          <div className="pr-14">
                           
                            <h3 className="text-[1.9rem] font-extrabold leading-none tracking-[-0.04em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] text-center transition-all duration-300 group-hover:text-center">
                              {product.name}
                            </h3>
                          </div>

                          <div className="mt-4 max-w-[90%] overflow-hidden text-center transition-all duration-300 group-hover:max-w-full">
                            <p className="line-clamp-2 translate-y-4 text-sm leading-6 text-white/88 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 transition-colors duration-300 group-hover:text-[var(--demo)]">
                              {product.description}
                            </p>
                          </div>

                         
                        </div>
                      </div>

                     
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding relative overflow-hidden bg-[#fbf60ee]">
        <div className="absolute inset-0">
          <div className="absolute left-[-8%] top-10 h-80 w-80 rounded-full bg-[#fff40d7] blur-3xl" />
          <div className="absolute right-[-4%] top-8 h-[26rem] w-[26rem] rounded-full bg-[#eed90ff]/60 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-[  ]/70 blur-3xl" />
          <div className="absolute inset-0 pointer-events-none">
            {instagramBackgroundDots.map((dot, index) => (
              <span
                key={index}
                className="absolute rounded-full bg-[var(--dots)] animate-pulse"
                style={{
                  top: dot.top,
                  left: dot.left,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  opacity: dot.opacity,
                }}
              />
            ))}
          </div>
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 14% 18%, rgba(13, 27, 50, 0.53), transparent 28%), radial-gradient(circle at 82% 16%, rgba(196, 213, 255, 0.15), transparent 26%), radial-gradient(circle at 50% 88%, rgba(255,228,239,0.8), transparent 22%)",
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div variants={fadeInUp} className="max-w-xl">
              <span className="inline-flex rounded-[5px]   px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)] shadow-[0_12px_24px_rgba(188,144,71,0.08)] backdrop-blur-sm">
                Explore From Instagram
              </span>

              <h2
                className={`font-bold mt-8 max-w-lg text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.32] text-[var(--text-primary)] ${instagramHeadingFont.className}`}
              >
                Watch Our Latest Updates
                <br />
                on Instagram
              </h2>

              <p className="mt-8 max-w-2xl text-[1.1rem] leading-9 text-[var(--text-primary)] font-medium ]">
                 Follow our page for more featured products, and the newest updates from
                {` ${siteContent.companyName}.`}
              </p>

              <div className="mt-12">
                <a
                  href={instagramHref}
                  target={hasInstagramLink ? "_blank" : undefined}
                  rel={hasInstagramLink ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-3 rounded-[7px] bg-gradient-to-r from-[#9d35ff] via-[#df4cd4] to-[#ff2e83] px-10 py-10 text-lg font-bold text-white  transition-all hover:scale-105 group-hover:rotate-12 "
                  style={{"padding": "5px"}}>
                  <Instagram size={22} className="transition-transform duration-300 hover:rotate-12 " />
                  Follow on Instagram
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative mx-auto w-full max-w-[400px] max-h-[590px] mt-8 lg:mt-0">
              <div className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(214,165,71,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(170,114,255,0.24),_transparent_34%)] blur-3xl" />

              <div className="relative rounded-[30px] border border-white/75 bg-white/55 p-4 shadow-[0_36px_80px_rgba(139,87,55,0.16)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_48px_120px_rgba(139,87,55,0.24)]">
                <div className="overflow-hidden rounded-[12px] border border-[#eadfd7] bg-white shadow-[0_18px_40px_rgba(17,24,39,0.06)]">
                  <div className="flex items-center gap-4 border-b border-[#ebe3db] px-4 pt-4 pb-3.5 sm:px-5 sm:pt-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f8d34b] via-[#ff6b8c] to-[#9164ff] p-[2px]">
                      <div className="flex  items-center justify-center rounded-full ">
                        <Image
                          src={siteContent.logoSrc}
                          alt={siteContent.companyName}
                          width={38}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.98rem] font-semibold leading-none text-[#1f2937]">
                        {instagramHandle}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#667085]">
                        Original audio
                      </p>
                    </div>

                    <a
                      href={instagramHref}
                      target={hasInstagramLink ? "_blank" : undefined}
                      rel={hasInstagramLink ? "noopener noreferrer" : undefined}
                      className="mr-3 inline-flex shrink-0 items-center justify-center rounded-[5px] bg-[#0095f6] px-4 py-2 text-sm font-semibold leading-none text-white transition-all duration-200 hover:bg-[#1877f2] "
                    style={{"padding": "5px", "fontSize": "0.8rem","marginRight": "8.5px"
                             
                    }}>
                      Follow Us
                    </a>
                  </div>

                  <div className="relative aspect-[8/9] overflow-hidden bg-black">
                    <video
                      ref={instagramVideoRef}
                      
                      loop
                      
                      playsInline
                      preload="metadata"
                      onLoadedData={handleInstagramVideoReady}
                      onPause={() => setIsInstagramVideoPlaying(false)}
                      onPlay={() => setIsInstagramVideoPlaying(true)}
                      
                      
                      className="h-full w-full object-cover"
                    >
                      <source src="/videos/instagram-placeholder.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-black/18" />

                    <button
                      type="button"
                      onClick={toggleInstagramVideoPlayback}
                      aria-label={isInstagramVideoPlaying ? "Pause Instagram reel" : "Play Instagram reel"}
                      className="group absolute left-1/2 top-1/2 flex h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/1 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <span className="flex h-full w-full items-center justify-center rounded-full border border-white/25 bg-black/18 text-white/60 shadow-[0_18px_36px_rgba(0,0,0,0.26)] transition-all duration-200 group-hover:bg-black/25">
                        {isInstagramVideoPlaying ? <Pause size={28} /> : <Play size={28} />}
                      </span>
                    </button>

                    <div className="absolute inset-x-0 bottom-7 px-6 text-center">
                     
                      <p className="mt-2 text-sm font-medium text-white/82">
                        {isInstagramVideoPlaying ? "Tap to pause the reel" : "Tap to play the reel"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white">
                    <a
                      href={instagramHref}
                      target={hasInstagramLink ? "_blank" : undefined}
                      rel={hasInstagramLink ? "noopener noreferrer" : undefined}
                      className="block px-5 pt-4 pb-3 text-[0.98rem] font-semibold text-[#0095f6] transition-colors hover:text-[#1877f2] items-center"
                    >
                      View more on Instagram
                    </a>

                    <div className="border-t border-[#efe6df] px-4 py-3.5 sm:px-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#111827]">
                          <button
                            type="button"
                            aria-label="Like reel"
                            className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#fff1f4] hover:text-[#ff3040] active:scale-95"
                          >
                            <Heart
                              size={22}
                              strokeWidth={2.1}
                              className="transition-transform duration-200 group-hover:scale-110"
                            />
                          </button>
                          <button
                            type="button"
                            aria-label="Comment on reel"
                            className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#f3f4f6] hover:text-[#111827] active:scale-95"
                          >
                            <MessageCircle
                              size={22}
                              strokeWidth={2.1}
                              className="  hover:scale-110 hover:text-[var(--demo)]"
                            />
                          </button>
                          <button
                            type="button"
                            aria-label="Share reel"
                            className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#eef6ff] hover:text-[#0095f6] active:scale-95"
                          >
                            <Send
                              size={21}
                              strokeWidth={2.1}
                              className="-translate-y-px rotate-[-12deg] transition-transform duration-200 group-hover:scale-110"
                            />
                          </button>
                        </div>

                        <button
                          type="button"
                          aria-label="Save reel"
                          className="group flex h-10 w-10 items-center justify-center rounded-full text-[#111827] transition-all duration-200 hover:bg-[#f3f4f6] hover:text-[#111827] active:scale-95"
                        >
                          <Bookmark
                            size={21}
                            strokeWidth={2.1}
                            className="transition-transform duration-200 group-hover:scale-110"
                          />
                        </button>
                      </div>

                      
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative  mt-100  py-20 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-85"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(79, 134, 198, 0.18) 1.15px, transparent 1.15px)",
            backgroundSize: "28px 28px",
            backgroundPosition: "10px 12px",
          }}
        />
        <div className="pointer-events-none absolute left-[8%] top-[-4rem] h-40 w-40 rounded-full bg-[rgba(79,134,198,0.12)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-5rem] right-[8%] h-48 w-48 rounded-full bg-[rgba(45,91,146,0.12)] blur-3xl" />

        <div className="container-custom relative z-10">
          <AnimatedSection className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {companyStats.map((stat) => {
              const StatIcon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="mx-auto flex min-h-[250px] w-full max-w-[252px] flex-col items-center justify-center rounded-[24px] border border-[rgba(191,208,227,0.92)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_50%,rgba(242,247,252,0.97)_100%)] px-7 py-8 text-center shadow-[0_20px_44px_rgba(18,35,63,0.08)] ring-1 ring-white/75 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_58px_rgba(18,35,63,0.12)]"
                >
                  <div
                    className={`mx-auto mb-7 flex h-[78px] w-[78px] items-center justify-center rounded-full border border-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ${stat.iconWrapClass}`}
                  >
                    <StatIcon size={32} strokeWidth={2.1} className={stat.iconClass} />
                  </div>
                  <p className="text-[3.05rem] font-extrabold leading-none tracking-[-0.04em] text-[var(--primary)]">
                    {stat.value}
                  </p>
                  <p className="mt-5 text-[1.02rem] font-medium leading-snug text-[var(--text-secondary)] md:text-[1.08rem]">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </AnimatedSection>
        </div>
      </section>

     

      <Footer />
    </>
  );
}
