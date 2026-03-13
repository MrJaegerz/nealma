import type { LucideIcon } from "lucide-react";

export type NavigationGroup = {
  title: string;
  links: NavigationLink[];
  defaultOpenStartPath?: string;
};

export type NavigationLink = {
  href: string;
  Icon: LucideIcon;
  label: string;
  links?: NavigationLink[];
};
