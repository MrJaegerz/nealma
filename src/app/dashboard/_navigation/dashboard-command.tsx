"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DASHBOARD_LINKS } from "./dashboard-navigation.links";

export function DashboardCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function handleSelect(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Rechercher..." />
      <CommandList>
        <CommandEmpty>Aucun r&eacute;sultat.</CommandEmpty>
        {DASHBOARD_LINKS.map((group) => (
          <CommandGroup key={group.title} heading={group.title}>
            {group.links.map((link) => (
              <CommandItem
                key={link.href}
                onSelect={() => handleSelect(link.href)}
              >
                <link.Icon className="mr-2 size-4" />
                {link.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
