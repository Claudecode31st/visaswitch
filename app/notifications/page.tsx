import type { Metadata } from "next";
import { NotificationsClient } from "./notifications-client";

export const metadata: Metadata = {
  title: "Notifications — VisaSwitch",
  description: "Get notified when visa processing times, fees, or requirements change for the visas you're watching.",
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
