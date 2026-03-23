"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ShoppingCart,
    MessageCircle,
    Shield,
    Truck,
    RotateCcw,
    Star,
    ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import products from "@/data/products.json";
import { getWhatsAppUrl } from "@/data/siteContent";
import { saveSelectedProduct } from "@/lib/selectedProductStore";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const product = useMemo(
        () => products.find((p) => p.id === params.id) ?? null,
        [params.id]
    );
    const relatedProducts = useMemo(() => {
        if (!product) {
            return [];
        }

        return products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 3);
    }, [product]);

    const handlePurchase = () => {
        if (!product) {
            return;
        }

        saveSelectedProduct(product);
        router.push("/contact");
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#f8f9fa] flex items-center justify-center mx-auto mb-4">
                            <ShoppingCart size={28} className="text-[var(--text-muted)]" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Product not found</h2>
                        <p className="text-[var(--text-secondary)] mb-8">
                            The product you&apos;re looking for doesn&apos;t exist.
                        </p>
                        <Link href="/products" className="px-6 py-3 rounded-xl bg-[#1a1515] text-white text-[15px] font-semibold hover:bg-black transition-colors inline-flex items-center gap-2">
                            <ArrowLeft size={16} />
                            Back to Collection
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="bg-white min-h-screen selection:bg-[var(--primary)] selection:text-white">
            <Navbar />

            <div className="flex flex-col lg:flex-row pt-[70px] lg:pt-[80px]">
                {/* Left: Sticky Image Area */}
                <div className="lg:w-1/2 lg:sticky lg:top-[80px] lg:h-[calc(100vh-80px)] bg-[#fdfaf5] relative overflow-hidden flex items-center justify-center p-8 lg:p-16 border-r border-gray-100">
                    {/* Background blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white rounded-full blur-[80px] opacity-70 pointer-events-none" />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="w-full max-w-md xl:max-w-lg aspect-[3/4] relative z-10"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </motion.div>

                    {/* Category tag */}
                    <div className="absolute top-8 left-8 z-20 hidden lg:block">
                        <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs uppercase font-bold tracking-widest text-[#1a1515] border border-gray-200/50 shadow-sm">
                            {product.category}
                        </span>
                    </div>
                </div>

                {/* Right: Scrolling Info Area */}
                <div className="lg:w-1/2 px-6 py-12 lg:px-16 lg:py-20 xl:px-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-2xl mx-auto lg:mx-0"
                    >
                        {/* Navigation */}
                        <div className="flex items-center justify-between mb-10">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[#1a1515] transition-colors group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back
                            </Link>

                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-[13px] font-medium text-[var(--text-muted)]">
                                <span>{product.category}</span>
                                <ChevronRight size={14} />
                                <span className="text-[#1a1515]">{product.subcategory}</span>
                            </div>
                        </div>

                        {/* Title & Reviews */}
                        <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-black text-[#1a1515] leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "serif" }}>
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-[14px] font-medium text-[var(--text-secondary)]">
                                4.8 (120+ reviews)
                            </span>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-end gap-4 mb-10 pb-10 border-b border-gray-100">
                            <span className="text-4xl lg:text-5xl font-bold text-[var(--primary)] tracking-tight">
                                {formatPrice(product.price)}
                            </span>
                            <span className="text-lg text-[var(--text-muted)] line-through mb-1">
                                {formatPrice(Math.round(product.price * 1.15))}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                                The Detail
                            </h3>
                            <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] font-light">
                                {product.description}
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            {[
                                { icon: Shield, label: "Genuine Product", desc: "100% authentic quality" },
                                { icon: Truck, label: "Fast Delivery", desc: "Arrives in 2-4 days" },
                                { icon: RotateCcw, label: "Easy Returns", desc: "30-day return policy" },
                            ].map((feat) => (
                                <div key={feat.label} className="bg-[#f8f9fa] p-5 rounded-2xl border border-gray-100/60 transition-all hover:bg-white hover:shadow-lg hover:shadow-black/5">
                                    <feat.icon size={22} className="text-[#1a1515] mb-3" strokeWidth={1.5} />
                                    <h4 className="text-[14px] font-bold text-[#1a1515] mb-1">{feat.label}</h4>
                                    <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{feat.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={handlePurchase}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#1a1515] text-white py-4 rounded-xl text-[15px] font-bold hover:bg-black hover:shadow-xl hover:shadow-black/10 transition-all active:scale-[0.98]"
                            >
                                <ShoppingCart size={18} />
                                Purchase Securely
                            </button>
                            <a
                                href={getWhatsAppUrl(`Hi! I'm interested in ${product.name} (${formatPrice(product.price)})`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl text-[15px] font-bold hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/20 transition-all active:scale-[0.98]"
                            >
                                <MessageCircle size={18} />
                                Order via WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="bg-[#fcfaf7] border-t border-gray-100 pt-20 pb-28">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-end justify-between mb-12">
                                <div>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                                        More To Love
                                    </h3>
                                    <h2 className="text-3xl lg:text-4xl font-black text-[#1a1515]" style={{ fontFamily: "serif" }}>
                                        Related Pieces
                                    </h2>
                                </div>
                                <Link
                                    href="/products"
                                    className="hidden sm:inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-[var(--text-primary)] hover:underline"
                                >
                                    View All <ArrowLeft size={14} className="rotate-180" />
                                </Link>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProducts.map((rp) => (
                                    <Link key={rp.id} href={`/products/${rp.id}`} className="group block">
                                        <div className="bg-white rounded-[20px] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-gray-200">
                                            <div className="relative aspect-[4/5] overflow-hidden bg-[#fdfaf5]">
                                                <Image
                                                    src={rp.image}
                                                    alt={rp.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 640px) 100vw, 33vw"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-[#1a1515] shadow-sm">
                                                        {rp.subcategory}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="font-bold text-[17px] text-[#1a1515] mb-2 group-hover:text-[var(--primary)] transition-colors pr-4 line-clamp-1" style={{ fontFamily: "serif" }}>
                                                    {rp.name}
                                                </div>
                                                <div className="text-[16px] font-bold text-[var(--primary)]">
                                                    {formatPrice(rp.price)}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
