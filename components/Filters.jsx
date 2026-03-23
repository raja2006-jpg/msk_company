"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Sofa, Sparkles, ChevronRight, Search, X } from "lucide-react";

const categories = [
    { key: "Electronics", label: "Electronics", icon: Monitor },
    { key: "Furniture", label: "Furniture", icon: Sofa },
    { key: "Cleaning", label: "Cleaning Liquids", icon: Sparkles },
];

const subcategories = {
    Electronics: ["TV", "Accessories"],
    Furniture: ["Sofa", "Bureau", "Cupboard", "Doors", "Windows"],
    Cleaning: ["Soap", "Oil", "Liquids"],
};

export default function Filters({
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
}) {
    const handleCategoryClick = (cat) => {
        if (selectedCategory === cat) {
            setSelectedCategory("");
            setSelectedSubcategory("");
        } else {
            setSelectedCategory(cat);
            setSelectedSubcategory("");
        }
    };

    const handleSubcategoryClick = (sub) => {
        if (selectedSubcategory === sub) {
            setSelectedSubcategory("");
        } else {
            setSelectedSubcategory(sub);
        }
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Search */}
            <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 pl-1">
                    Search
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Find products..."
                        className="w-full bg-[#f8f9fa] border border-transparent rounded-2xl py-3.5 pl-11 pr-10 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:bg-white focus:border-[var(--border-light)] focus:shadow-[0_0_0_4px_rgba(23,53,93,0.05)] transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-[18px] h-[18px]" />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                            <X className="w-[18px] h-[18px]" />
                        </button>
                    )}
                </div>
            </div>

            {/* Categories */}
            <div>
                <div className="flex items-center justify-between mb-4 pl-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        Categories
                    </h3>
                    {(selectedCategory || selectedSubcategory) && (
                        <button 
                            onClick={() => { setSelectedCategory(""); setSelectedSubcategory(""); }}
                            className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider hover:underline"
                        >
                            Clear All
                        </button>
                    )}
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <button
                        onClick={() => {
                            setSelectedCategory("");
                            setSelectedSubcategory("");
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-300 ${!selectedCategory
                                ? "bg-[var(--primary)]/5 text-[var(--primary)] shadow-sm"
                                : "text-[var(--text-secondary)] hover:bg-[#f8f9fa] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${!selectedCategory ? 'bg-[var(--primary)]' : 'bg-transparent'}`} />
                        All Products
                    </button>

                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isExpanded = selectedCategory === cat.key;
                        const hasSubcategories = subcategories[cat.key]?.length > 0;

                        return (
                            <div key={cat.key} className="flex flex-col">
                                <button
                                    onClick={() => handleCategoryClick(cat.key)}
                                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-300 ${isExpanded
                                            ? "bg-[var(--primary)] text-white shadow-[0_8px_20px_rgba(23,53,93,0.15)]"
                                            : "text-[var(--text-secondary)] hover:bg-[#f8f9fa] hover:text-[var(--text-primary)]"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={18} strokeWidth={isExpanded ? 2.5 : 2} />
                                        <span>{cat.label}</span>
                                    </div>
                                    {hasSubcategories && (
                                        <ChevronRight size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-white/80' : 'opacity-40'}`} />
                                    )}
                                </button>

                                {/* Subcategories Accordion */}
                                <AnimatePresence>
                                    {isExpanded && hasSubcategories && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col gap-1 pt-3 pb-1 pl-5 pr-2 relative">
                                                {/* Left branch line */}
                                                <div className="absolute left-8 top-1 bottom-3 w-[1px] bg-[var(--border-light)]" />
                                                
                                                {subcategories[cat.key].map((sub) => (
                                                    <button
                                                        key={sub}
                                                        onClick={() => handleSubcategoryClick(sub)}
                                                        className={`w-full flex items-center gap-3 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all relative z-10 ${selectedSubcategory === sub
                                                                ? "bg-[var(--surface-muted)] text-[var(--primary)] font-semibold shadow-sm ml-1"
                                                                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[#f8f9fa] hover:translate-x-1"
                                                            }`}
                                                    >
                                                        <div className={`w-[5px] h-[5px] rounded-full ${selectedSubcategory === sub ? 'bg-[var(--primary)]' : 'bg-transparent'}`} />
                                                        {sub}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
