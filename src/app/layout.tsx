import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Providers from "./Providers";
import { Poppins } from "next/font/google";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PeerLearn",
  description: "Learn and manage stress effectively!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} dark:bg-neutral-900 bg-white`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="pointer-events-auto">{children}
              <Toaster />
            </main>
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
