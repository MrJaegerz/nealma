import { Linkedin } from "lucide-react";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/dashboard/layout-components";

export default function DashboardLinkedInPage() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>LinkedIn</LayoutTitle>
        <LayoutDescription>
          Créez et planifiez vos publications LinkedIn pour développer votre
          visibilité.
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-nealma-border/40 bg-nealma-bg-warm/30 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-nealma-100">
            <Linkedin className="size-8 text-nealma-400" />
          </div>
          <h3 className="mt-4 text-lg font-heading font-bold text-nealma-text">
            Bientôt disponible
          </h3>
          <p className="mt-2 max-w-md text-sm text-nealma-text-light">
            Générez des posts LinkedIn avec l&apos;IA, planifiez leur
            publication et suivez les performances de votre contenu.
          </p>
        </div>
      </LayoutContent>
    </Layout>
  );
}
