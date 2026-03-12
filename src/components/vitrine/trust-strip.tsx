import { Award, Star, Home, Clock } from "lucide-react";

const trustItems = [
  { icon: Award, label: "Infirmiere diplomee d'Etat" },
  { icon: Star, label: "+50 familles accompagnees" },
  { icon: Home, label: "Tout l'Ile-de-France" },
  { icon: Clock, label: "Lun-Sam, 9h-19h" },
] as const;

export function TrustStrip() {
  return (
    <div className="border-y border-nealma-border/40 bg-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 sm:gap-10">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 text-sm text-nealma-text-light"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nealma-bg-warm">
              <item.icon className="size-4 text-nealma-400" />
            </div>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
