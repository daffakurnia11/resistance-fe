import type { Metadata } from "next";
import "@/styles/globals.css";
import Notification from "@/components/notification";
import Modal from "@/components/modal";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-dvh flex justify-center items-center p-6 relative">
        <main className="w-full">
          {children}
          <Notification />
          <Modal />
        </main>
      </body>
    </html>
  );
}
