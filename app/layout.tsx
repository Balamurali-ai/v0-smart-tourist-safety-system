import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth-context"
import Script from "next/script" // 1. Import the Script component

export const metadata: Metadata = {
  title: "Smart Tourist Safety System",
  description: "Created for authorities",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
          <Analytics />
        </Suspense>

        {/* 2. Add the Script component here, before the closing </body> tag */}
        <Script id="chatbase-embed" strategy="afterInteractive">
          {`
            (function(){
              if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                  window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};
                  window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}});
              }
              const onLoad=function(){
                  const script=document.createElement("script");
                  script.src="https://www.chatbase.co/embed.min.js";
                  script.id="s7nauVgwXbisoOh9gDeH4";
                  script.domain="www.chatbase.co";
                  document.body.appendChild(script)
              };
              if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
