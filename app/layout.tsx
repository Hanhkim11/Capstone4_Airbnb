import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Headers from "@/components/headers/Headers";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "./customProvider/ReduxProvider";
import LoadUserFromStorage from "@/helpers/LoadUserFromStorage";

export const metadata: Metadata = {
  title: "Airbnb-Project",
  description: "Airbnb-online-booking-ticket-app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReduxProvider>
          <LoadUserFromStorage />
          <div className="container mx-auto ">
            <Headers />

            <div className="mt-50">{children}</div>
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
