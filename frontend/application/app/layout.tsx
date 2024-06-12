import Footer from "@/features/footer";
import Navbar from "@/features/Navbar";
import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Edutheater",
  description: "Educational Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="relative overflow-hidden">
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
