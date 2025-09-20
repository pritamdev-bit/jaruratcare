import { } from "next/font/google";
import "./globals.css";
import { NavbarPage } from "@/components/Navbar";



export const metadata = {
  title: "Jarurat Care",
  description: "Providing support, guidance, hope and personalized care for cancer patients and their families. Here to ensure you never face your journey alone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased min-h-screen backdrop-blur-xs`}
      >
        <NavbarPage />
        {children}
      </body>
    </html>
  );
}
