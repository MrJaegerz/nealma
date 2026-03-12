"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  Megaphone,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
  {
    label: "Vue d\u2019ensemble",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Rendez-vous",
    href: "/dashboard/rendez-vous",
    icon: Calendar,
  },
  {
    label: "Blog",
    href: "/dashboard/blog",
    icon: FileText,
  },
  {
    label: "Google Ads",
    href: "/dashboard/ads/google",
    icon: BarChart3,
  },
  {
    label: "TikTok Ads",
    href: "/dashboard/ads/tiktok",
    icon: Megaphone,
  },
  {
    label: "Paramètres",
    href: "/dashboard/parametres",
    icon: Settings,
  },
];

function NavContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="px-6 py-6">
        <Link
          href="/dashboard"
          className="font-heading text-2xl font-bold text-nealma-400"
          onClick={onNavigate}
        >
          N&eacute;alma
        </Link>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-nealma-50 text-nealma-400"
                  : "text-nealma-text-light hover:bg-nealma-50/60 hover:text-nealma-text",
              )}
            >
              <link.icon className="size-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="space-y-1 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-nealma-text-light transition-colors hover:bg-nealma-50/60 hover:text-nealma-text"
        >
          <ExternalLink className="size-4 shrink-0" />
          Voir le site
        </Link>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 px-3 text-nealma-text-light hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4 shrink-0" />
          Se d&eacute;connecter
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile header with sheet trigger */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b bg-background px-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <NavContent pathname={pathname} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <span className="ml-3 font-heading text-lg font-bold text-nealma-400">
          N&eacute;alma
        </span>
      </div>

      {/* Mobile spacer so content is not hidden behind the fixed header */}
      <div className="h-14 lg:hidden" />

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-sidebar lg:block">
        <NavContent pathname={pathname} />
      </aside>
    </>
  );
}
