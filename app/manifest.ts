import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VisaSwitch — Smart Visa Navigation",
    short_name: "VisaSwitch",
    description: "Find your visa pathway, check eligibility, build your plan, and track your application.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["travel", "utilities", "lifestyle"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Australia Guide", url: "/au/guide", description: "Open the Australia visa guide" },
      { name: "UK Guide",        url: "/uk/guide", description: "Open the UK visa guide" },
      { name: "Canada Guide",    url: "/ca/guide", description: "Open the Canada visa guide" },
      { name: "Japan Guide",     url: "/jp/guide", description: "Open the Japan visa guide" },
    ],
  };
}
