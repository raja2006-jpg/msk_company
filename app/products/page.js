"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

// Custom Dropdown Component to exactly match the reference screenshot

const CustomDropdown = ({
    options,
    value,
    onChange,
    icon: Icon,
    placeholder,
    centerText = true
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full isolate" ref={dropdownRef}>

            {/* ✅ TRIGGER (CLEAN GLASS — NO DIRTY BLUR) */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="
                    h-[50px]
                    border border-[var(--border)]
                    rounded-[8px]
                    flex items-center px-4
                    cursor-pointer text-[var(--primary)]
                    
                    bg-white/40
                    backdrop-blur-sm
                    
                    hover:bg-white/80
                    transition-all duration-200
                    shadow-sm
                "
            >
                {Icon && <Icon size={20} className="mr-3 opacity-80" style={{ color: "var(--primary)", "margin-left": "10px" }} />}

                <span className={`flex-1 text-[15px] ${centerText ? 'text-center' : 'text-left'} font-medium`}>
                    {value || placeholder}
                </span>

                <ChevronDown
                    size={20}
                    className={`ml-3 opacity-70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: "var(--primary)", "margin-right": "10px" }} />
            </div>

            {/* ✅ DROPDOWN */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="
                            absolute top-[calc(100%+8px)] left-0 right-0 z-50
                            rounded-[12px]
                            
                            border border-[var(--border)]
                            bg-white/20
                            backdrop-blur-xl
                            
                            shadow-[3px_6px_3px_rgba(0,0,0,0.08)]
                            overflow-hidden
                        "
                    >
                        <div className="max-h-[260px] overflow-y-auto custom-scrollbar">
                            {options.map((opt) => (
                                <div
                                    key={opt}
                                    onClick={() => {
                                        onChange(opt);
                                        setIsOpen(false);
                                    }}
                                    className="
                                        px-4 py-3 text-[14px]
                                        cursor-pointer flex justify-between items-center
                                        text-[var(--primary)]
                                        
                                        hover:bg-[var(--primary)] hover:text-white
                                        transition-all
                                    "
                                    style={{ "padding": '10px', "margin-left": "5px", "margin-right": "5px", "margin-top": "8px", "margin-bottom": "8px", "border-radius": "8px" }}
                                >
                                    <span className={value === opt ? 'font-semibold' : 'font-medium'}>
                                        {opt}
                                    </span>

                                    {value === opt && (
                                        <Check size={16} className="opacity-80" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedSubcategory, setSelectedSubcategory] = useState("All Varieties");
    const [searchQuery, setSearchQuery] = useState("");

    // Reset subcategory dropdown back to 'All' when standard category changes
    useEffect(() => {
        setSelectedSubcategory("All Varieties");
    }, [selectedCategory]);

    // Populate Main Category options natively from source data
    const categoryOptions = useMemo(() => {
        return ["All Categories", ...new Set(products.map(p => p.category))];
    }, []);

    // Dynamically limit varieties rendering mapped strictly to selected Main Category
    const subcategoryOptions = useMemo(() => {
        let subs;
        if (selectedCategory === "All Categories") {
            subs = new Set(products.map(p => p.subcategory).filter(Boolean));
        } else {
            subs = new Set(products.filter(p => p.category === selectedCategory).map(p => p.subcategory).filter(Boolean));
        }
        return ["All Varieties", ...Array.from(subs)];
    }, [selectedCategory]);

    // Dynamic filtering engine
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
            const matchesSubcategory = selectedSubcategory === "All Varieties" || product.subcategory === selectedSubcategory;

            const matchesSearch = searchQuery
                ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()))
                : true;

            return matchesCategory && matchesSubcategory && matchesSearch;
        });
    }, [selectedCategory, selectedSubcategory, searchQuery]);

    return (
        <div className="bg-[#fcf9f2] min-h-screen font-sans">
            <Navbar />

            {/* Products Section */}
            <section className="pt-40 pb-20 relative z-10" style={{ paddingTop: '160px' }}>
                <div className="container-custom max-w-[1340px]">

                    {/* Exact Filter Bar Layout from Snapshot repurposed for subcategories */}
                   <div className="products-filter-bar">
    
    {/* 🔍 Search */}
    <div className="filter-search">
        <Search size={18} className="search-icon" />
        <input
            type="text"
            placeholder="Search designs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>

    {/* 🔽 Filters Row */}
    <div className="filter-row">
        
        <div className="filter-item">
            <CustomDropdown
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                icon={Filter}
                centerText={true}
            />
        </div>

        <div className="filter-item">
            <CustomDropdown
                options={subcategoryOptions}
                value={selectedSubcategory}
                onChange={setSelectedSubcategory}
                centerText={true}
            />
        </div>

    </div>
</div>

                    {/* Product Grid Layout */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-x-6 gap-y-10 relative z-0">
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
                                    className="h-full"
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-28 border border-dashed border-[var(--border)] rounded-[16px]">
                            <h3 className="text-2xl font-bold text-[var(--primary)] mb-3" style={{ fontFamily: "serif" }}>
                                No products found
                            </h3>
                            <button
                                onClick={() => {
                                    setSelectedCategory("All Categories");
                                    setSelectedSubcategory("All Varieties");
                                    setSearchQuery("");
                                }}
                                className="mt-4 px-8 py-3 rounded-[5px] border border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
