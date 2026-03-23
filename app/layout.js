import "./globals.css";

export const metadata = {
  title: "MSK Marketing Company | Electronics, Furniture & Home Essentials",
  description: "Your trusted partner for premium electronics, quality furniture, and essential cleaning products. Browse our catalog and order easily via WhatsApp.",
  keywords: "electronics, furniture, cleaning products, TV, sofa, cupboard, doors, windows,cleaning liquids, home essentials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
