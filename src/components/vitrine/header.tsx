"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "\u00C0 propos" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-nealma-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.avif"
            alt="Néalma"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-nealma-50 hover:text-nealma-400",
                  isActive
                    ? "bg-nealma-50 text-nealma-400"
                    : "text-nealma-text"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild>
            <Link href="/reservation">Réserver</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/images/logo.avif"
                  alt="Néalma"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-nealma-50 hover:text-nealma-400",
                        isActive
                          ? "bg-nealma-50 text-nealma-400"
                          : "text-nealma-text"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                );
              })}
              <div className="mt-4 px-3">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/reservation">Réserver</Link>
                  </Button>
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
