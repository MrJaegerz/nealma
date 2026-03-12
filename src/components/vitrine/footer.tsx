import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "\u00C0 propos" },
  { href: "/contact", label: "Contact" },
  { href: "/reservation", label: "Réserver" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-nealma-border/40 bg-nealma-bg-warm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* About column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl tracking-tight text-nealma-400">
                Néalma
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-nealma-text-light">
              Infirmière diplômée spécialisée en accompagnement périnatal.
              Massages, bain enveloppé, soutien à l&apos;allaitement et bien
              plus, directement à votre domicile en Île-de-France.
            </p>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-nealma-text">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-nealma-text-light transition-colors hover:text-nealma-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-nealma-text">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@nealma.fr"
                  className="inline-flex items-center gap-2 text-sm text-nealma-text-light transition-colors hover:text-nealma-400"
                >
                  <Mail className="size-4 shrink-0" />
                  contact@nealma.fr
                </a>
              </li>
              <li>
                <a
                  href="tel:+33600000000"
                  className="inline-flex items-center gap-2 text-sm text-nealma-text-light transition-colors hover:text-nealma-400"
                >
                  <Phone className="size-4 shrink-0" />
                  06 00 00 00 00
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-nealma-text-light">
                <MapPin className="size-4 shrink-0" />
                Zone d&apos;intervention&nbsp;: \u00CEle-de-France
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-nealma-border/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-nealma-text-light sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Néalma. Tous droits réservés.</p>
          <Link
            href="/mentions-legales"
            className="transition-colors hover:text-nealma-400"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
