"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/data/siteContent";

export default function ProductCard({ product }) {
    // Generate simulated delivery timeline typical to reference
    const deliveryDays = product.id.charCodeAt(0) % 2 === 0 ? "":"";

    return (
        <div className="bg-[#fcf9f2] border border-[var(--primary)]/20 rounded-[14px] flex flex-col group overflow-hidden h-full shadow-[0_2px_8px_-4px_rgba(124,16,42,0.08)] hover:shadow-[0_8px_15px_-8px_var(--primary)] transition-all duration-300">
            {/* Image Section */}
            <div className="relative aspect-[4/3.5] w-full overflow-hidden border-b border-[var(--primary)]/20 bg-white">
                <Image 
                    src={product.image} 
                    alt={product.name}
                    fill 
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-[600ms]" 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Gold Category Badge */}
                <div className="absolute top-4 left-4 bg-black/20 text-white text-[11px] font-bold tracking-[0.05em] px-3.5 py-1.5 rounded-[5px] shadow-sm z-10 backdrop-blur-sm shadow-[var(--primary)]/10" style={{"padding":"5px"}}>
                    {product.subcategory || product.category}
                </div>
            </div>

            {/* Content Display */}
            <div className="p-[22px] flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-[20px] font-bold text-[var(--primary)] mb-[10px] leading-tight" style={{ fontFamily: "serif",padding:"10px" }}>
                    {product.name}
                </h3>
                
                {/* Detailed Description */}
                <p className="text-[14px] text-[var(--primary)]/80 line-clamp-2 leading-[1.6] mb-5 flex-grow pr-2" style={{padding:"5px"}}>
                    {product.description}
                </p>
                
                {/* Price and Delivery Details */}
                <div className="flex items-end justify-between mb-6">
                    <div className="text-[19px] font-bold text-[var(--primary)] tracking-tight" style={{padding:"5px"}}>
                        ₹{product.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-[13px] font-medium text-[var(--primary)]/80 pb-[2px]" style={{padding:"10px"}}>
                        {deliveryDays}
                    </div>
                </div>

                {/* Exact Vertical Action Buttons */}
                <div className="flex flex-col gap-[10px] mt-auto" style={{ "margin-top": "10px",padding:"10px"}}>
                    {/* Solid Maroon WhatsApp Button */}
                    <a
                        href={getWhatsAppUrl(`Hi! I'm interested in ${product.name} (₹${product.price})`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[var(--primary)] text-white text-[13.5px] font-bold py-[13px] px-4 rounded-[5px] flex items-center justify-center gap-2.5 transition-transform hover:bg-[var(--primary-light)] active:scale-[0.98]"
                    style={{"padding":"9px"}}>
                        <MessageCircle size={15} fill="currentColor" />
                        Buy Now
                    </a>
                    
                    {/* Outlined Custom Details Button */}
                    <Link
                        href={`/products/${product.id}`}
                        className="w-full border-[1.5px] border-[var(--primary)] text-[var(--primary)] text-[13.5px] font-bold py-[11px] px-4 rounded-[5px] flex items-center justify-center transition-colors hover:bg-[var(--primary)]/10 active:scale-[0.98]"
                    style={{"padding":"7px"}}>   
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
