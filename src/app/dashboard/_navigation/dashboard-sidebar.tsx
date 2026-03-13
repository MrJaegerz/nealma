"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarNavigationMenu } from "@/components/ui/sidebar-utils";
import { ChevronDown, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, type PropsWithChildren } from "react";
import { DASHBOARD_LINKS } from "./dashboard-navigation.links";
import { SidebarUserButton } from "./sidebar-user-button";

export function DashboardSidebar() {
  const links = DASHBOARD_LINKS;

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Image
            src="/images/logo.avif"
            alt="Nealma"
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
          <span className="font-heading font-semibold text-nealma-text">
            Nealma
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {links.map((link) => (
          <ItemCollapsing
            defaultOpenStartPath={link.defaultOpenStartPath}
            key={link.title}
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {link.title}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarNavigationMenu link={link} />
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </ItemCollapsing>
        ))}
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" />
                <span>Voir le site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarUserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const ItemCollapsing = (
  props: PropsWithChildren<{ defaultOpenStartPath?: string }>,
) => {
  const pathname = usePathname();

  const isOpen = props.defaultOpenStartPath
    ? pathname.startsWith(props.defaultOpenStartPath)
    : true;

  const [open, setOpen] = useState(isOpen);

  return (
    <Collapsible
      defaultOpen={isOpen}
      onOpenChange={setOpen}
      open={open || isOpen}
      className="group/collapsible"
    >
      {props.children}
    </Collapsible>
  );
};
