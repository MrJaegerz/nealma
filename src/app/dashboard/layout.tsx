import { DashboardNavigation } from "./_navigation/dashboard-navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardNavigation>{children}</DashboardNavigation>;
}
