"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ShoppingCart,
    MessageCircle,
    Shield,
    Truck,
    RotateCcw,
    ChevronRight,
    Plus,
    Monitor,
    Volume2,
    Wifi,
    Smartphone,
    Armchair,
    SprayCan,
    Droplets,
    PaintBucket,
    Package,
    ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import products from "@/data/products.json";
import { getWhatsAppUrl } from "@/data/siteContent";
import { saveSelectedProduct } from "@/lib/selectedProductStore";

/* ─────────────────────────────────────
   Category-specific specs & feature data
   ───────────────────────────────────── */
const categoryConfig = {
    Electronics: {
        specs: (p) =>
            p.subcategory === "TV"
                ? [
                      { icon: Monitor, label: "DISPLAY", value: "4K Ultra HD LED" },
                      { icon: Volume2, label: "AUDIO", value: "Dolby Digital Plus" },
                      { icon: Wifi, label: "CONNECTIVITY", value: "3× HDMI, 2× USB" },
                      { icon: Smartphone, label: "OS", value: "Android TV 11.0" },
                  ]
                : [
                      { icon: Volume2, label: "AUDIO", value: "Premium Sound" },
                      { icon: Wifi, label: "CONNECTIVITY", value: "Bluetooth 5.0" },
                      { icon: Monitor, label: "COMPATIBILITY", value: "Universal" },
                      { icon: Shield, label: "WARRANTY", value: "1 Year" },
                  ],
        badge: "NEW ARRIVAL 2024",
        showcaseTitle: (p) =>
            p.subcategory === "TV"
                ? "Cinematic Excellence In Your Living Room"
                : "Premium Audio Experience",
        showcaseItems: (p) =>
            p.subcategory === "TV"
                ? [
                      {
                          title: "True 4K Resolution",
                          desc: "Every pixel is a masterpiece. With four times the resolution of Full HD, our Ultra HD panel reveals hidden details in every scene, from the subtle texture of clothing to the vast expanse of a mountain range.",
                      },
                      {
                          title: "Dolby Audio System",
                          desc: "Sound that moves around you. Built-in speakers calibrated for deep bass and crisp dialogue ensure that you never miss a whisper or a thunderous explosion. Support for external soundbars via HDMI ARC.",
                      },
                  ]
                : [
                      {
                          title: "Crystal Clear Sound",
                          desc: "Experience audio the way it was meant to be heard. Advanced acoustics deliver immersive sound that fills every corner of the room.",
                      },
                      {
                          title: "Seamless Connectivity",
                          desc: "Connect effortlessly with Bluetooth 5.0, HDMI ARC, and multiple input options for all your devices.",
                      },
                  ],
        relatedTitle: "Complete Your Setup",
        relatedSubtitle: "Curated additions for your new home theater.",
        relatedLink: "View All Accessories",
    },
    Furniture: {
        specs: () => [
            { icon: Armchair, label: "MATERIAL", value: "Premium Wood" },
            { icon: Shield, label: "WARRANTY", value: "5 Year Warranty" },
            { icon: Package, label: "ASSEMBLY", value: "Easy Setup" },
            { icon: Truck, label: "DELIVERY", value: "White Glove" },
        ],
        badge: "PREMIUM COLLECTION",
        showcaseTitle: () => "Crafted For Modern Living",
        showcaseItems: () => [
            {
                title: "Superior Craftsmanship",
                desc: "Each piece is meticulously crafted using premium materials and time-tested techniques, ensuring durability and elegance that lasts for generations.",
            },
            {
                title: "Ergonomic Design",
                desc: "Thoughtfully designed to support your comfort. Every curve and angle is engineered for the perfect balance of style and functionality.",
            },
        ],
        relatedTitle: "Complete The Look",
        relatedSubtitle: "Pieces that complement your new furniture.",
        relatedLink: "View All Furniture",
    },
    Cleaning: {
        specs: (p) => [
            { icon: SprayCan, label: "TYPE", value: p.subcategory },
            { icon: Droplets, label: "FORMULA", value: "Professional Grade" },
            { icon: Shield, label: "SAFE", value: "Eco-Friendly" },
            { icon: PaintBucket, label: "SIZE", value: "Value Pack" },
        ],
        badge: "BEST SELLER",
        showcaseTitle: () => "Clean Like A Professional",
        showcaseItems: () => [
            {
                title: "Powerful Formula",
                desc: "Industrial-strength cleaning power in a safe, home-friendly formula. Cuts through grime and leaves surfaces sparkling without harsh chemicals.",
            },
            {
                title: "Eco-Friendly Ingredients",
                desc: "Made with biodegradable ingredients that are gentle on the environment. Safe for use around children and pets.",
            },
        ],
        relatedTitle: "Complete Your Cleaning Kit",
        relatedSubtitle: "Everything you need for a spotless home.",
        relatedLink: "View All Cleaning",
    },
};

function getConfig(product) {
    return categoryConfig[product.category] || categoryConfig.Electronics;
}

/* ─── animation variants ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
    }),
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();

    const product = useMemo(
        () => products.find((p) => p.id === params.id) ?? null,
        [params.id]
    );

    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 3);
    }, [product]);

    const handlePurchase = () => {
        if (!product) return;
        saveSelectedProduct(product);
        router.push("/contact");
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    /* ─── 404 state ─── */
    if (!product) {
        return (
            <>
                <Navbar />
                <div
                    className="min-h-screen flex items-center justify-center"
                    style={{ background: "var(--background)" }}
                >
                    <div className="text-center px-6">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                            style={{ background: "var(--surface-muted)" }}
                        >
                            <ShoppingCart size={28} style={{ color: "var(--text-muted)" }} />
                        </div>
                        <h2
                            className="text-xl font-bold mb-2"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Product not found
                        </h2>
                        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
                            The product you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <Link
                            href="/products"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Back to Collection
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const config = getConfig(product);
    const specs = config.specs(product);
    const showcaseItems = config.showcaseItems(product);
    const originalPrice = Math.round(product.price * 1.22);
    const discountPercent = Math.round(
        ((originalPrice - product.price) / originalPrice) * 100
    );

    return (
        <div style={{ background: "var(--background)", fontFamily: "'Inter', sans-serif" }}>
            <Navbar />

            {/* ══════════════════════════════════
                BREADCRUMB
               ══════════════════════════════════ */}
            <div style={{ paddingTop: 82 }}>
                <div className="container-custom">
                    <nav
                        className="flex items-center gap-2 flex-wrap"
                        style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "var(--text-muted)",
                            padding: "14px 0",
                            borderBottom: "1px solid var(--border-light)",
                        }}
                    >
                        <Link
                            href="/"
                            className="hover:text-[var(--primary)] transition-colors"
                            style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
                        >
                            Home
                        </Link>
                        <ChevronRight size={14} />
                        <Link
                            href="/products"
                            className="hover:text-[var(--primary)] transition-colors"
                            style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
                        >
                            Products
                        </Link>
                        <ChevronRight size={14} />
                        <span
                            style={{
                                color: "var(--text-primary)",
                                fontWeight: 600,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                maxWidth: 220,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {product.name}
                        </span>
                    </nav>
                </div>
            </div>

            {/* ══════════════════════════════════
                HERO — IMAGE + PRODUCT INFO
               ══════════════════════════════════ */}
            <section className="container-custom" style={{ padding: "24px 10px 40px" }}>
                <div className="detail-hero-grid">
                    {/* ── LEFT: Product Image ── */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                    >
                        <div
                            className="detail-image-container"
                            style={{
                                position: "relative",
                                background: "#f5f3ef",
                                borderRadius: "var(--radius-xl)",
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                priority
                                className="object-contain"
                                style={{ padding: "20px" }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                            />
                            {/* Premium badge */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 16,
                                    right: 16,
                                    background: "rgba(255,255,255,0.92)",
                                    backdropFilter: "blur(8px)",
                                    borderRadius: 999,
                                    padding: "8px 16px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    border: "1px solid var(--border-light)",
                                    boxShadow: "var(--shadow-sm)",
                                }}
                            >
                                <Shield size={14} style={{ color: "var(--primary)" }} />
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: "var(--text-primary)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    Premium Quality
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Product Info ── */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={1}
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
                    >
                        {/* Badge */}
                        <span
                            style={{
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: "0.14em",
                                color: "var(--primary)",
                                textTransform: "uppercase",
                                marginBottom: 12,
                            }}
                        >
                            {config.badge}
                        </span>

                        {/* Title */}
                        <h1
                            style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                                fontWeight: 900,
                                color: "var(--text-primary)",
                                lineHeight: 1.12,
                                letterSpacing: "-0.02em",
                                marginBottom: 20,
                            }}
                        >
                            {product.name}
                        </h1>

                        {/* Price row */}
                        <div
                            className="flex items-center flex-wrap"
                            style={{ gap: 12, marginBottom: 20 }}
                        >
                            <span
                                style={{
                                    fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                                    fontWeight: 800,
                                    color: "var(--text-primary)",
                                }}
                            >
                                {formatPrice(product.price)}
                            </span>
                            <span
                                style={{
                                    fontSize: 16,
                                    color: "var(--text-muted)",
                                    textDecoration: "line-through",
                                }}
                            >
                                {formatPrice(originalPrice)}
                            </span>
                            <span
                                style={{
                                    background: "#e8f5e9",
                                    color: "#2e7d32",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                }}
                            >
                                {discountPercent}% OFF
                            </span>
                        </div>

                        {/* Description */}
                        <p
                            style={{
                                fontSize: 15,
                                lineHeight: 1.8,
                                color: "var(--text-secondary)",
                                marginBottom: 28,
                                maxWidth: 520,
                            }}
                        >
                            {product.description}
                        </p>

                        {/* Specs 2×2 Grid */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 10,
                                marginBottom: 28,
                            }}
                        >
                            {specs.map((spec) => (
                                <div
                                    key={spec.label}
                                    style={{
                                        background: "var(--surface-muted)",
                                        border: "1px solid var(--border-light)",
                                        borderRadius: "var(--radius)",
                                        padding: "14px 16px",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 12,
                                        transition: "all 0.3s ease",
                                    }}
                                    className="detail-spec-card"
                                >
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 10,
                                            background: "white",
                                            border: "1px solid var(--border-light)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <spec.icon
                                            size={17}
                                            style={{ color: "var(--primary)" }}
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            style={{
                                                fontSize: 10,
                                                fontWeight: 700,
                                                color: "var(--text-muted)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em",
                                                marginBottom: 2,
                                            }}
                                        >
                                            {spec.label}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            {spec.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3" style={{ marginBottom: 20 }}>
                            <button
                                onClick={handlePurchase}
                                className="btn-primary"
                                style={{
                                    flex: 1,
                                    padding: "14px 20px",
                                    fontSize: 15,
                                    borderRadius: "var(--radius)",
                                    cursor: "pointer",
                                    border: "none",
                                }}
                            >
                                Buy Now
                                <ArrowRight size={17} />
                            </button>
                            <a
                                href={getWhatsAppUrl(
                                    `Hi! I'm interested in ${product.name} (${formatPrice(product.price)})`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                                style={{
                                    flex: 1,
                                    padding: "14px 20px",
                                    fontSize: 15,
                                    borderRadius: "var(--radius)",
                                }}
                            >
                                <MessageCircle size={17} />
                                WhatsApp
                            </a>
                        </div>

                        {/* Trust badges row */}
                        <div
                            className="flex items-center flex-wrap"
                            style={{
                                gap: 20,
                                paddingTop: 18,
                                borderTop: "1px solid var(--border-light)",
                            }}
                        >
                            {[
                                { icon: Shield, label: "Genuine Product" },
                                { icon: Truck, label: "Fast Delivery" },
                                { icon: RotateCcw, label: "Easy Returns" },
                            ].map((t) => (
                                <div
                                    key={t.label}
                                    className="flex items-center"
                                    style={{ gap: 6 }}
                                >
                                    <t.icon
                                        size={14}
                                        style={{ color: "var(--text-muted)" }}
                                        strokeWidth={1.8}
                                    />
                                    <span
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        {t.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════
                FEATURE SHOWCASE
               ══════════════════════════════════ */}
            <section
                style={{
                    background:
                        "linear-gradient(180deg, var(--surface-muted) 0%, #f4f7fb 100%)",
                    borderTop: "1px solid var(--border-light)",
                    borderBottom: "1px solid var(--border-light)",
                }}
            >
                <div
                    className="container-custom"
                    style={{ padding: "40px 10px 48px", maxWidth: 1080 }}
                >
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeUp}
                        style={{
                            fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                            fontWeight: 900,
                            color: "var(--text-primary)",
                            textAlign: "center",
                            marginBottom: 48,
                            lineHeight: 1.2,
                        }}
                    >
                        {config.showcaseTitle(product)}
                    </motion.h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                        {showcaseItems.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                variants={fadeUp}
                                custom={idx}
                                className={`showcase-row ${idx % 2 !== 0 ? "showcase-row-reverse" : ""}`}
                            >
                                {/* Text side */}
                                <div style={{ flex: 1 }}>
                                    <h3
                                        style={{
                                            fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
                                            fontWeight: 700,
                                            color: "var(--text-primary)",
                                            marginBottom: 14,
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: 15,
                                            lineHeight: 1.85,
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                                {/* Image side */}
                                <div style={{ flex: 1, width: "100%" }}>
                                    <div
                                        className="showcase-image"
                                        style={{
                                            position: "relative",
                                            aspectRatio: "16 / 10",
                                            borderRadius: "var(--radius-lg)",
                                            overflow: "hidden",
                                            background:
                                                "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-light) 100%)",
                                        }}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                            style={{
                                                padding: 24,
                                                opacity: 0.7,
                                                mixBlendMode: "luminosity",
                                            }}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background:
                                                    "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
                RELATED PRODUCTS
               ══════════════════════════════════ */}
            {relatedProducts.length > 0 && (
                <section className="container-custom" style={{ padding: "40px 10px 48px" }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeUp}
                    >
                        {/* Header row */}
                        <div
                            className="flex items-end justify-between flex-wrap"
                            style={{ marginBottom: 32, gap: 12 }}
                        >
                            <div>
                                <h2
                                    style={{
                                        fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
                                        fontWeight: 900,
                                        color: "var(--text-primary)",
                                        marginBottom: 6,
                                    }}
                                >
                                    {config.relatedTitle}
                                </h2>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    {config.relatedSubtitle}
                                </p>
                            </div>
                            <Link
                                href="/products"
                                className="hidden sm:inline-flex items-center gap-2 hover:underline"
                                style={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: "var(--primary)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                }}
                            >
                                {config.relatedLink}
                                <ExternalLink size={14} />
                            </Link>
                        </div>

                        {/* Cards */}
                        <div className="related-grid">
                            {relatedProducts.map((rp, idx) => (
                                <motion.div
                                    key={rp.id}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    custom={idx}
                                >
                                    <Link
                                        href={`/products/${rp.id}`}
                                        className="group block"
                                    >
                                        <div
                                            className="card-hover"
                                            style={{
                                                background: "white",
                                                borderRadius: "var(--radius-lg)",
                                                border: "1px solid var(--border-light)",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {/* Card image */}
                                            <div
                                                style={{
                                                    position: "relative",
                                                    aspectRatio: "4 / 3",
                                                    background: "#f5f3ef",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <Image
                                                    src={rp.image}
                                                    alt={rp.name}
                                                    fill
                                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                                    style={{ padding: 20 }}
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            </div>
                                            {/* Card info */}
                                            <div style={{ padding: "16px 18px 18px" }}>
                                                <span
                                                    style={{
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: "var(--primary)",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.1em",
                                                        display: "block",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {rp.subcategory}
                                                </span>
                                                <h3
                                                    className="group-hover:text-[var(--primary)] transition-colors line-clamp-1"
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: 700,
                                                        color: "var(--text-primary)",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {rp.name}
                                                </h3>
                                                <p
                                                    className="line-clamp-2"
                                                    style={{
                                                        fontSize: 13,
                                                        lineHeight: 1.6,
                                                        color: "var(--text-muted)",
                                                        marginBottom: 14,
                                                    }}
                                                >
                                                    {rp.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: 800,
                                                            color: "var(--text-primary)",
                                                        }}
                                                    >
                                                        {formatPrice(rp.price)}
                                                    </span>
                                                    <div
                                                        className="group-hover:scale-110 transition-transform"
                                                        style={{
                                                            width: 34,
                                                            height: 34,
                                                            borderRadius: 10,
                                                            background: "var(--primary)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <Plus size={17} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile view-all link */}
                        <div
                            className="sm:hidden"
                            style={{ textAlign: "center", marginTop: 24 }}
                        >
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 hover:underline"
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "var(--primary)",
                                }}
                            >
                                {config.relatedLink}
                                <ExternalLink size={14} />
                            </Link>
                        </div>
                    </motion.div>
                </section>
            )}

            <Footer />

            {/* ══════════════════════════════════
                RESPONSIVE STYLES
               ══════════════════════════════════ */}
            <style jsx global>{`
                /* ─── Image container sizing ─── */
                .detail-image-container {
                    aspect-ratio: 4 / 3;
                    max-height: 340px;
                }

                /* ─── Hero grid: stack on mobile, side-by-side on desktop ─── */
                .detail-hero-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                }

                @media (min-width: 768px) {
                    .detail-hero-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 36px;
                        align-items: start;
                    }
                    .detail-image-container {
                        aspect-ratio: 5 / 4;
                        max-height: 400px;
                    }
                }

                @media (min-width: 1024px) {
                    .detail-hero-grid {
                        grid-template-columns: 52% 48%;
                        gap: 48px;
                    }
                    .detail-image-container {
                        aspect-ratio: 5 / 4;
                        max-height: 440px;
                    }
                }

                /* ─── Spec card hover ─── */
                .detail-spec-card:hover {
                    background: white !important;
                    box-shadow: var(--shadow-sm);
                    border-color: var(--border-strong) !important;
                }

                /* ─── Showcase rows: stack on mobile ─── */
                .showcase-row {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .showcase-image {
                    max-height: 220px;
                }

                @media (min-width: 768px) {
                    .showcase-row {
                        flex-direction: row;
                        gap: 32px;
                        align-items: center;
                    }
                    .showcase-row > div {
                        flex: 1;
                    }
                    .showcase-row-reverse {
                        flex-direction: row-reverse;
                    }
                    .showcase-image {
                        max-height: 260px;
                    }
                }

                /* ─── Related products grid ─── */
                .related-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                }

                @media (min-width: 640px) {
                    .related-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (min-width: 1024px) {
                    .related-grid {
                        grid-template-columns: 1fr 1fr 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
