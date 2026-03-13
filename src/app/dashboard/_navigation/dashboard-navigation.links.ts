import {
  LayoutDashboard,
  Calendar,
  FileText,
  PenLine,
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
        label: "Vue d'ensemble",
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
    links: [
      {
        href: "/dashboard/linkedin",
        Icon: PenLine,
        label: "LinkedIn",
      },
    ],
  },
  {
    title: "Administration",
    links: [
      {
        href: "/dashboard/settings",
        Icon: Settings,
        label: "Paramètres",
      },
    ],
  },
];
