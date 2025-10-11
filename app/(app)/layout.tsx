"use client";

import { useEffect } from "react";
import Script from "next/script"; // Import the Script component
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import AppShell from "@/components/app-shell";
import React from "react";

/**
 * Guards the routes and redirects if the user is not authenticated.
 * This version prevents the "flash of unprotected content".
 */
function Guard({ children }: { children: React.ReactNode }) {
  // ✅ FIX: Safely access the user to prevent build crashes
  const user = useAuth()?.user;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/"); // Or your login page
    }
  }, [user, router]);

  // ✅ FIX: Return null to prevent showing the page before redirecting
  if (!user) {
    return null;
  }

  // Only render children if the user is authenticated
  return <>{children}</>;
}

/**
 * This is the layout for the authenticated section of the app.
 * It now correctly includes the Chatbase script.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppShell>
        <Guard>{children}</Guard>
      </AppShell>

      {/* ✅ The Chatbase Script is now correctly placed here */}
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
    </>
  );
}
