import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";
import DashboardBreadcrumb from "./dashboard-breadcrumb";
import { DashboardCommand } from "./dashboard-command";
import { DashboardSidebar } from "./dashboard-sidebar";

export async function DashboardNavigation({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="border-border border">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger
              variant="outline"
              className="size-8 cursor-pointer"
            />
            <DashboardBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
      <DashboardCommand />
    </SidebarProvider>
  );
}
