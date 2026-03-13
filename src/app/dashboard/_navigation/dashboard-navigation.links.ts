import {
  LayoutDashboard,
  Calendar,
  FileText,
  BarChart3,
  Megaphone,
  Settings,
} from "lucide-react";
import type { NavigationGroup } from "@/types/navigation";

export const DASHBOARD_LINKS: NavigationGroup[] = [
  {
    title: "Principal",
    links: [
      {
        href: "/dashboard",
        Icon: LayoutDashboard,
        label: "Vue d\u2019ensemble",
      },
      {
        href: "/dashboard/rendez-vous",
        Icon: Calendar,
        label: "Rendez-vous",
      },
      {
        href: "/dashboard/blog",
        Icon: FileText,
        label: "Blog",
      },
    ],
  },
  {
    title: "Marketing",
    defaultOpenStartPath: "/dashboard/ads",
    links: [
      {
        href: "/dashboard/ads/google",
        Icon: BarChart3,
        label: "Google Ads",
      },
      {
        href: "/dashboard/ads/tiktok",
        Icon: Megaphone,
        label: "TikTok Ads",
      },
    ],
  },
  {
    title: "Administration",
    links: [
      {
        href: "/dashboard/parametres",
        Icon: Settings,
        label: "Param\u00e8tres",
      },
    ],
  },
];
