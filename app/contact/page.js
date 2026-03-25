"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShoppingBag,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

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

  const mapEmbedUrl = getMapEmbedUrl();
  const mapHref = getMapHref();

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Please enter your full name";
    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = "Please enter your phone number";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      nextErrors.phone = "Enter a valid 10-digit number";
    }
    if (!formData.subject.trim()) nextErrors.subject = "Please enter a subject";
    if (!formData.message.trim()) nextErrors.message = "Please enter your message";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field, value) => {
    setFormData((c) => ({ ...c, [field]: value }));
    if (errors[field]) setErrors((c) => ({ ...c, [field]: "" }));
  };

  const handleWhatsAppSend = (event) => {
    event.preventDefault();
    if (!validate()) return;
    const message = buildMessage(formData, selectedProduct);
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  const handleEmailSend = () => {
    if (!validate()) return;
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
    <div style={{ background: "var(--background)", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ══════════════════════════════════
          ENQUIRY FORM SECTION
         ══════════════════════════════════ */}
      <section style={{ paddingTop: 88 }}>
        <div className="container-custom" style={{ padding: "0 10px" }}>
          {/* Section heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            style={{ textAlign: "center", padding: "40px 0 36px" }}
          >
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                marginBottom: 12,
              }}
            >
              Enquire Now
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Fill out the form below and our team will get back to you within 24
              hours.
            </p>
          </motion.div>

          {/* Selected product banner */}
          {selectedProduct && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              style={{
                maxWidth: 760,
                margin: "0 auto 28px",
                background: "var(--surface-muted)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--primary)",
                  }}
                >
                  <ShoppingBag size={13} />
                  Selected Product
                </span>
                <button
                  type="button"
                  onClick={clearProduct}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    transition: "all 0.2s",
                  }}
                  aria-label="Remove selected product"
                >
                  <X size={14} />
                </button>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div
                  style={{
                    position: "relative",
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--border-light)",
                    background: "white",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: "var(--text-primary)",
                    }}
                  >
                    {selectedProduct.name}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: "var(--primary)",
                      marginTop: 2,
                    }}
                  >
                    {formatPrice(selectedProduct.price)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── FORM CARD ─── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            style={{
              maxWidth: 760,
              margin: "0 auto",
              background: "rgba(255,255,255,0.92)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-sm)",
              padding: "32px 28px",
            }}
            className="contact-form-card"
          >
            <form onSubmit={handleWhatsAppSend}>
              {/* Row 1: Name, Phone, Email */}
              <div className="contact-row-3">
                <div className="contact-field">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Name"
                    className="contact-input"
                    style={errors.name ? { borderColor: "#ef4444" } : {}}
                  />
                  {errors.name && (
                    <p className="contact-error">{errors.name}</p>
                  )}
                </div>
                <div className="contact-field">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      updateField(
                        "phone",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="Phone"
                    className="contact-input"
                    style={errors.phone ? { borderColor: "#ef4444" } : {}}
                  />
                  {errors.phone && (
                    <p className="contact-error">{errors.phone}</p>
                  )}
                </div>
                <div className="contact-field">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="E-mail"
                    className="contact-input"
                    style={errors.email ? { borderColor: "#ef4444" } : {}}
                  />
                  {errors.email && (
                    <p className="contact-error">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Subject */}
              <div style={{ marginTop: 16 }}>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  placeholder="Subject"
                  className="contact-input"
                  style={errors.subject ? { borderColor: "#ef4444" } : {}}
                />
                {errors.subject && (
                  <p className="contact-error">{errors.subject}</p>
                )}
              </div>

              {/* Row 3: Message */}
              <div style={{ marginTop: 16 }}>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Message"
                  className="contact-input contact-textarea"
                  style={errors.message ? { borderColor: "#ef4444" } : {}}
                />
                {errors.message && (
                  <p className="contact-error">{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 14,
                  marginTop: 28,
                }}
                className="contact-btn-row "
              >
                <button
                  type="submit"
                  className="btn-primary contact-submit-btn"
                  style={{
                    padding: "15px 90px",
                    fontSize: 15,
                    borderRadius: "var(--radius)",
                    cursor: "pointer",
                    border: "none",
                    minWidth: 200,
                    transition: "all 0.50s ease",
                  }}
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector(".contact-send-icon");
                    if (icon) icon.style.transform = "rotate(45deg)";
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector(".contact-send-icon");
                    if (icon) icon.style.transform = "rotate(0deg)";
                  }}
                >
                  Contact Us
                  <Send
                    size={16}
                    className="contact-send-icon"
                    style={{ transition: "transform 0.50s ease" }}
                  />
                </button>
               
              </div>
            </form>
          </motion.div>

          {/* ─── QUICK CONTACT BAR ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={3}
            style={{
              maxWidth: 760,
              margin: "24px auto 0",
              display: "flex",
              justifyContent: "center",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <a
              href={`tel:${siteContent.phoneDigits}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-secondary)",
                transition: "color 0.2s",
              }}
              className="contact-quick-link"
            >
              <Phone size={15} style={{ color: "var(--primary)" }} />
              {siteContent.phoneDisplay}
            </a>
            <a
              href={getWhatsAppUrl("Hi! I'm interested in your products.")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-secondary)",
                transition: "color 0.2s",
              }}
              className="contact-quick-link"
            >
              <MessageCircle size={15} style={{ color: "#25d366" }} />
              WhatsApp
            </a>
            <a
              href={`mailto:${siteContent.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-secondary)",
                transition: "color 0.2s",
              }}
              className="contact-quick-link"
            >
              <Mail size={15} style={{ color: "var(--primary)" }} />
              {siteContent.email}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          MAP SECTION
         ══════════════════════════════════ */}
      <section className="container-custom" style={{ padding: "0 10px", marginTop: 48, marginBottom: 48 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={0}
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-sm)",
            overflow: "hidden",
          }}
          className="contact-map-card"
        >
          {/* Map header: title + icon */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }} className="contact-map-header">
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
                  fontWeight: 800,
                  color: "var(--primary)",
                  marginBottom: 10,
                }}
              >
                Visit Our Store
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  maxWidth: 480,
                }}
              >
                Located at {siteContent.addressText}. We welcome visitors during business hours.
              </p>
            </div>
            {/* Circular map pin icon */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MapPin size={20} style={{ color: "white" }} />
            </div>
          </div>

          {/* Open in Maps link */}
          <div className="contact-map-link-row">
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: "var(--primary)",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              className="contact-maps-link"
            >
              Open in Maps
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Map embed */}
          <div className="contact-map-wrapper">
            <iframe
              title={`${siteContent.companyName} map`}
              src={mapEmbedUrl}
              className="contact-map"
              style={{
                width: "100%",
                border: "none",
                display: "block",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>

      <Footer />

      {/* ══════════════════════════════════
          RESPONSIVE STYLES
         ══════════════════════════════════ */}
      <style jsx global>{`
        /* ─── 3-column row for Name / Phone / Email ─── */
        .contact-row-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .contact-row-3 {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 14px;
          }
        }

        /* ─── Input styling ─── */
        .contact-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 0.95rem;
          font-family: "Inter", sans-serif;
          color: var(--text-primary);
          background: white;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }

        .contact-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(23, 53, 93, 0.08);
        }

        .contact-input::placeholder {
          color: var(--text-muted);
          font-weight: 400;
        }

        .contact-textarea {
          min-height: 130px;
          resize: vertical;
        }

        .contact-error {
          margin-top: 4px;
          font-size: 12px;
          color: #ef4444;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
        }

        /* ─── Form card padding ─── */
        .contact-form-card {
          padding: 24px 18px !important;
        }

        @media (min-width: 640px) {
          .contact-form-card {
            padding: 36px 32px !important;
          }
        }

        @media (min-width: 768px) {
          .contact-form-card {
            padding: 40px 40px !important;
          }
        }

        /* ─── Buttons row ─── */
        .contact-btn-row {
          flex-direction: column;
        }

        .contact-btn-row .btn-primary,
        .contact-btn-row .btn-outline {
          width: 100%;
        }

        @media (min-width: 640px) {
          .contact-btn-row {
            flex-direction: row;
          }
          .contact-btn-row .btn-primary,
          .contact-btn-row .btn-outline {
            width: auto;
          }
        }

        /* ─── Quick contact links ─── */
        .contact-quick-link:hover {
          color: var(--primary) !important;
        }

        /* ─── Map card layout ─── */
        .contact-map-card {
          padding: 0 !important;
        }

        .contact-map-header {
          padding: 24px 22px 0;
        }

        .contact-map-link-row {
          padding: 14px 22px 0;
        }

        .contact-maps-link:hover {
          opacity: 0.7;
        }

        .contact-map-wrapper {
          padding: 16px;
        }

        .contact-map {
          height: 280px;
          border-radius: var(--radius);
        }

        @media (min-width: 640px) {
          .contact-map-header {
            padding: 28px 28px 0;
          }
          .contact-map-link-row {
            padding: 16px 28px 0;
          }
          .contact-map-wrapper {
            padding: 20px;
          }
          .contact-map {
            height: 340px;
          }
        }

        @media (min-width: 768px) {
          .contact-map-header {
            padding: 32px 32px 0;
          }
          .contact-map-link-row {
            padding: 18px 32px 0;
          }
          .contact-map-wrapper {
            padding: 24px;
          }
          .contact-map {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
