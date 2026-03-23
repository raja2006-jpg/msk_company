const mapQuery = "MSK Marketing Company, Main Street, City";

export const siteContent = {
  logoSrc: "/msk-logo.svg",
  companyName: "MSK Marketing company",
  shortName: "MSK",
  tagline: "Marketing Company",
  description:
    "Your trusted partner for premium electronics, quality furniture, and essential home products.",
  phoneDisplay: "+91 98765 43210",
  phoneDigits: "9876543210",
  whatsappNumber: "919876543210",
  email: "info@mskmarketing.com",
  addressText: "MSK Marketing Company, Main Street, City",
  mapQuery,
  hours: [
    { day: "Monday - Friday", time: "9:00 AM - 8:00 PM" },
    { day: "Saturday", time: "9:00 AM - 6:00 PM" },
    { day: "Sunday", time: "10:00 AM - 4:00 PM" },
  ],
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
  ],
};

export function getWhatsAppUrl(message) {
  return `https://wa.me/${siteContent.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getMailtoUrl({ subject, body }) {
  return `mailto:${siteContent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getMapEmbedUrl(query = siteContent.mapQuery) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function getMapHref(query = siteContent.mapQuery) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
