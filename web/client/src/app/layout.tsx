import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import UserProvider from "@/providers/user-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Sankalp | SOSC",
//   description: "Register for Codeblaze Hackathon and events at Sankalp by SOSC",
//   // TODO: Add more metadata
// }
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Register for Hackathon",
    "Mangalore Event",
    "Sahyadri College of Engineering and Management",
    "SOSC",
    `${MAIN_EVENT_NAME} Hackathon`,
    "Sahyadri Open Source Community",
  ],
  authors: [
    {
      name: "Deveesh Shetty",
      url: "https://deveesh.vercel.app",
    },
    {
      name: "Akkil MG",
      url: "https://github.com/AkkilMG",
    },
  ],
  creator: "Deveesh Shetty",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ShettyDeveesh",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-base`}>
        {/* <UserProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
        {/* </UserProvider> */}
      </body>
    </html>
  )
}
