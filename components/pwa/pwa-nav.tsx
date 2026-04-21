"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, RotateCw, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function PWANav() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const historyDepth = useRef(0);    // tracks how deep into history we've gone
  const forwardStack = useRef(0);    // tracks how many forward steps are available
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);

    if (standalone) {
      // Add bottom padding to body so content isn't hidden behind the bar
      document.documentElement.style.setProperty("--pwa-nav-height", "64px");
    }
  }, []);

  // Track history depth on every route change
  useEffect(() => {
    if (!isStandalone) return;
    historyDepth.current += 1;
    forwardStack.current = 0;           // navigating forward clears any forward stack
    setCanGoBack(historyDepth.current > 1);
    setCanGoForward(false);
  }, [pathname, isStandalone]);

  // Listen for popstate (browser back/forward)
  useEffect(() => {
    if (!isStandalone) return;
    function onPop() {
      // We can't reliably tell direction from popstate, so re-evaluate
      setCanGoBack(window.history.length > 1 && historyDepth.current > 1);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [isStandalone]);

  function goBack() {
    if (!canGoBack) return;
    historyDepth.current = Math.max(0, historyDepth.current - 1);
    forwardStack.current += 1;
    setCanGoBack(historyDepth.current > 1);
    setCanGoForward(true);
    window.history.back();
  }

  function goForward() {
    if (!canGoForward) return;
    historyDepth.current += 1;
    forwardStack.current = Math.max(0, forwardStack.current - 1);
    setCanGoBack(true);
    setCanGoForward(forwardStack.current > 0);
    window.history.forward();
  }

  function refresh() {
    setRefreshing(true);
    window.location.reload();
  }

  function goHome() {
    historyDepth.current = 1;
    forwardStack.current = 0;
    setCanGoBack(false);
    setCanGoForward(false);
    router.push("/");
  }

  if (!isStandalone) return null;

  return (
    <>
      {/* Spacer so page content scrolls above the bar */}
      <div style={{ height: "calc(64px + env(safe-area-inset-bottom, 0px))" }} aria-hidden />

      {/* Fixed bottom bar */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 border-t flex items-center"
        style={{
          background: "var(--nav-bg)",
          borderColor: "var(--nav-border)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          height: "calc(64px + env(safe-area-inset-bottom, 0px))",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="App navigation"
      >
        <div className="flex items-center justify-around w-full px-2 h-16">

          {/* Back */}
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-xl transition-all",
              canGoBack ? "hover:opacity-60 active:scale-95" : "opacity-25 cursor-default"
            )}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: "var(--foreground)" }} />
          </button>

          {/* Forward */}
          <button
            onClick={goForward}
            disabled={!canGoForward}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-xl transition-all",
              canGoForward ? "hover:opacity-60 active:scale-95" : "opacity-25 cursor-default"
            )}
            aria-label="Go forward"
          >
            <ArrowRight className="w-5 h-5" style={{ color: "var(--foreground)" }} />
          </button>

          {/* Refresh */}
          <button
            onClick={refresh}
            className="w-12 h-12 flex items-center justify-center rounded-xl hover:opacity-60 active:scale-95 transition-all"
            aria-label="Refresh page"
          >
            <RotateCw
              className={cn("w-5 h-5 transition-transform", refreshing && "animate-spin")}
              style={{ color: "var(--foreground)" }}
            />
          </button>

          {/* Home */}
          <button
            onClick={goHome}
            className="w-12 h-12 flex items-center justify-center rounded-xl hover:opacity-60 active:scale-95 transition-all"
            aria-label="Go to home"
          >
            <Home className="w-5 h-5" style={{ color: "var(--foreground)" }} />
          </button>

        </div>
      </nav>
    </>
  );
}
