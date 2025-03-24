import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Asher",
  description: "Welcome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>
          {children}
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
