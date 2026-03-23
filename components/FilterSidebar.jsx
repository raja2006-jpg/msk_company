"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Filter } from "lucide-react";

const CategoryCheckbox = ({ label, checked, onChange, count }) => (
    <label className="flex items-center gap-3 py-2 cursor-pointer group select-none">
        <div className={`relative w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200 ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 group-hover:border-blue-400'}`}>
            <Check size={13} strokeWidth={3.5} className={`text-white transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} />
        </div>
        <span className={`text-[14.5px] transition-colors ${checked ? 'font-semibold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
            {label}
        </span>
        {count !== undefined && (
            <span className="ml-auto text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {count}
            </span>
        )}
    </label>
);

export default function FilterSidebar({
    categories,
    subcategoriesMap,
    selectedCategories,
    setSelectedCategories,
    selectedSubcategories,
    setSelectedSubcategories,
    counts
}) {
    const [expandedCats, setExpandedCats] = useState(
        categories.reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
    );

    const toggleCatExpansion = (cat) => {
        setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
    };

    const handleCategoryCheck = (cat) => {
        if (selectedCategories.includes(cat)) {
            // Uncheck category -> uncheck its subcategories too
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
            const subsToRemove = subcategoriesMap[cat] || [];
            setSelectedSubcategories(selectedSubcategories.filter(s => !subsToRemove.includes(s)));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    const handleSubcategoryCheck = (sub, parentCat) => {
        if (selectedSubcategories.includes(sub)) {
            setSelectedSubcategories(selectedSubcategories.filter(s => s !== sub));
        } else {
            setSelectedSubcategories([...selectedSubcategories, sub]);
            // Auto check parent category if not checked
            if (!selectedCategories.includes(parentCat)) {
                setSelectedCategories([...selectedCategories, parentCat]);
            }
        }
    };

    const clearAll = () => {
        setSelectedCategories([]);
        setSelectedSubcategories([]);
    };

    const hasFilters = selectedCategories.length > 0 || selectedSubcategories.length > 0;

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-gray-900">
                    <Filter size={20} strokeWidth={2.5} />
                    <h2 className="text-lg font-bold">Filters</h2>
                </div>
                {hasFilters && (
                    <button 
                        onClick={clearAll}
                        className="text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wide"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {categories.map((cat) => {
                    const isExpanded = expandedCats[cat];
                    const subs = subcategoriesMap[cat] || [];
                    const isCatChecked = selectedCategories.includes(cat);

                    return (
                        <div key={cat} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                            {/* Category Header */}
                            <div className="flex items-center justify-between mb-2">
                                <CategoryCheckbox 
                                    label={cat} 
                                    checked={isCatChecked}
                                    onChange={() => handleCategoryCheck(cat)}
                                    count={counts.categories[cat]}
                                />
                                {subs.length > 0 && (
                                    <button 
                                        onClick={() => toggleCatExpansion(cat)}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
                                    >
                                        <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                    </button>
                                )}
                            </div>

                            {/* Subcategories Accordion */}
                            <AnimatePresence>
                                {isExpanded && subs.length > 0 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pl-8 pt-1 flex flex-col gap-1 relative">
                                            {/* Left branch line styling */}
                                            <div className="absolute left-[11px] top-0 bottom-4 w-[1px] bg-gray-200 rounded-full" />
                                            
                                            {subs.map((sub) => (
                                                <div key={sub} className="relative z-10">
                                                    <CategoryCheckbox 
                                                        label={sub} 
                                                        checked={selectedSubcategories.includes(sub)}
                                                        onChange={() => handleSubcategoryCheck(sub, cat)}
                                                        count={counts.subcategories[sub]}
                                                    />
                                                </div>
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
    );
}
