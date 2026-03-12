import { Header } from "@/components/vitrine/header";
import { Footer } from "@/components/vitrine/footer";

export default function VitrineLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
