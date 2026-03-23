"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShoppingBag,
  Clock3,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandLockup from "@/components/BrandLockup";
import {
  getMailtoUrl,
  getMapEmbedUrl,
  getMapHref,
  getWhatsAppUrl,
  siteContent,
} from "@/data/siteContent";
import {
  clearSelectedProductStorage,
  readSelectedProduct,
  subscribeToSelectedProduct,
} from "@/lib/selectedProductStore";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function buildMessage(formData, selectedProduct) {
  const lines = [
    "New enquiry",
    "",
    `Name: ${formData.name.trim()}`,
    `Email: ${formData.email.trim()}`,
    `Phone: ${formData.phone.trim()}`,
    `Subject: ${formData.subject.trim()}`,
    "",
    "Message:",
    formData.message.trim(),
  ];

  if (selectedProduct) {
    lines.push(
      "",
      "Selected product:",
      `${selectedProduct.name} - ${formatPrice(selectedProduct.price)}`,
      selectedProduct.description
    );
  }

  return lines.join("\n");
}

export default function ContactPage() {
  const selectedProduct = useSyncExternalStore(
    subscribeToSelectedProduct,
    readSelectedProduct,
    () => null
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const mapHref = getMapHref();
  const mapEmbedUrl = getMapEmbedUrl();

  const contactCards = [
    {
      icon: Phone,
      title: "Phone",
      value: siteContent.phoneDisplay,
      href: `tel:${siteContent.phoneDigits}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: siteContent.phoneDisplay,
      href: getWhatsAppUrl("Hi! I'm interested in your products."),
    },
    {
      icon: Mail,
      title: "Email",
      value: siteContent.email,
      href: `mailto:${siteContent.email}`,
    },
    {
      icon: MapPin,
      title: "Address",
      value: siteContent.addressText,
      href: mapHref,
    },
  ];

  const quickActions = [
    "Ask for product availability",
    "Request current pricing",
    "Plan a WhatsApp callback",
  ];

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Please enter your phone number";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      nextErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = "Please enter a subject";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please enter your message";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  const handleWhatsAppSend = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const message = buildMessage(formData, selectedProduct);
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  const handleEmailSend = () => {
    if (!validate()) {
      return;
    }

    const message = buildMessage(formData, selectedProduct);
    window.location.href = getMailtoUrl({
      subject: `${formData.subject.trim()} | ${siteContent.companyName}`,
      body: message,
    });
  };

  const clearProduct = () => {
    clearSelectedProductStorage();
  };

  return (
    <>
      <Navbar />

      <section className="section-shell min-h-screen pt-[120px] pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="box-panel mb-8 overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] transition-colors hover:text-[var(--primary-light)]"
                >
                  <ArrowLeft size={15} />
                  Back to Home
                </Link>
                <div className="hidden h-8 w-px bg-[var(--border)] md:block" />
                <BrandLockup href="/" size="sm" />
              </div>

              <a
                href={getWhatsAppUrl("Hi! I want to talk to MSK Marketing Company.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !w-full md:!w-auto"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-10"
          >
            <span className="eyebrow mb-5">Contact Section</span>
            <h1 className="section-title">
              Send us a message and we will
              <br />
              <span className="gradient-text">take it forward quickly.</span>
            </h1>
            <p className="section-subtitle mt-5">
              This layout keeps enquiries clean: one structured form, quick contact
              cards, and a mini map so customers can reach the business in the way that
              suits them best.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="box-panel p-6 md:p-8"
            >
              {selectedProduct ? (
                <div className="mb-8 rounded-[18px] border border-[var(--border-light)] bg-[var(--surface-muted)] p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                      <ShoppingBag size={14} />
                      Selected Product
                    </span>
                    <button
                      type="button"
                      onClick={clearProduct}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--border)] bg-white text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--primary)]"
                      aria-label="Remove selected product"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative h-24 w-full overflow-hidden rounded-[14px] border border-[var(--border-light)] bg-white sm:w-24">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-black text-[var(--text-primary)]">
                        {selectedProduct.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {selectedProduct.description}
                      </p>
                      <p className="mt-3 text-base font-black text-[var(--primary)]">
                        {formatPrice(selectedProduct.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <form className="space-y-6" onSubmit={handleWhatsAppSend}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="Your full name"
                      className={`input-field ${errors.name ? "!border-red-400" : ""}`}
                    />
                    {errors.name ? (
                      <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="your.email@example.com"
                      className={`input-field ${errors.email ? "!border-red-400" : ""}`}
                    />
                    {errors.email ? (
                      <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className={`input-field ${errors.phone ? "!border-red-400" : ""}`}
                    />
                    {errors.phone ? (
                      <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(event) => updateField("subject", event.target.value)}
                      placeholder="What is this regarding?"
                      className={`input-field ${errors.subject ? "!border-red-400" : ""}`}
                    />
                    {errors.subject ? (
                      <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Tell us more about your enquiry..."
                    className={`input-field min-h-[170px] resize-y ${errors.message ? "!border-red-400" : ""}`}
                  />
                  {errors.message ? (
                    <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                  ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <button type="submit" className="whatsapp-btn !w-full !py-4">
                    <Send size={18} />
                    Send via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleEmailSend}
                    className="btn-outline !w-full !py-4"
                  >
                    <Mail size={18} />
                    Send via Email
                  </button>
                </div>

                <p className="text-sm text-[var(--text-muted)]">
                  Required fields help us respond with the right product details faster.
                </p>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="space-y-5"
            >
              {contactCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="box-panel block p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] border border-[var(--border-light)] bg-[var(--surface-muted)] text-[var(--primary)]">
                      <card.icon size={22} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        {card.title}
                      </p>
                      <p className="mt-2 text-lg font-black leading-7 text-[var(--text-primary)]">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}

              <div className="box-panel p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-[var(--border-light)] bg-[var(--surface-muted)] text-[var(--primary)]">
                    <Clock3 size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Business Hours
                    </p>
                    <p className="text-lg font-black text-[var(--text-primary)]">
                      Opening Schedule
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {siteContent.hours.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between gap-4 rounded-[12px] border border-[var(--border-light)] bg-[var(--surface-muted)]/60 px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-[var(--text-secondary)]">
                        {item.day}
                      </span>
                      <span className="text-sm font-black text-[var(--primary)]">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="box-panel p-5">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Quick Actions
                </p>
                <div className="mt-4 space-y-3">
                  {quickActions.map((action) => (
                    <div
                      key={action}
                      className="rounded-[12px] border border-[var(--border-light)] bg-[var(--surface-muted)]/60 px-4 py-3 text-sm font-semibold text-[var(--text-secondary)]"
                    >
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="box-panel mt-10 overflow-hidden p-5 md:p-6"
          >
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Visit Our Location
                </p>
                <h2 className="mt-2 text-2xl font-black text-[var(--text-primary)]">
                  Mini map for quick directions
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                  The address is still using the current placeholder details from the
                  repo, but the section is fully wired for a real Google Maps destination.
                </p>
              </div>

              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !w-full md:!w-auto"
              >
                <MapPin size={18} />
                Open in Google Maps
              </a>
            </div>

            <div className="overflow-hidden rounded-[20px] border border-[var(--border-light)] bg-[var(--surface-muted)]">
              <iframe
                title={`${siteContent.companyName} map`}
                src={mapEmbedUrl}
                className="h-[260px] w-full md:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
