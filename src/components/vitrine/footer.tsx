import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "\u00C0 propos" },
  { href: "/contact", label: "Contact" },
] as const;

const soinsLinks = [
  { href: "/reservation/massage-prenatal", label: "Massage prénatal" },
  { href: "/reservation/massage-post-partum", label: "Massage post-partum" },
  { href: "/reservation/bain-enveloppe-bebe", label: "Bain enveloppé bébé" },
  { href: "/reservation/soutien-allaitement", label: "Soutien allaitement" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-nealma-border/40 bg-nealma-bg-warm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.avif"
                alt="Néalma"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-nealma-text-light">
              Infirmière diplômée spécialisée en accompagnement périnatal.
              Soins à domicile en Île-de-France.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/nealma.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-nealma-border bg-white text-nealma-text-light transition-colors hover:border-nealma-400 hover:text-nealma-400"
                aria-label="Instagram"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="https://www.facebook.com/nealma.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-nealma-border bg-white text-nealma-text-light transition-colors hover:border-nealma-400 hover:text-nealma-400"
                aria-label="Facebook"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/nealma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-nealma-border bg-white text-nealma-text-light transition-colors hover:border-nealma-400 hover:text-nealma-400"
                aria-label="LinkedIn"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
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

          {/* Soins column */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-nealma-text">
              Nos soins
            </h3>
            <nav className="flex flex-col gap-2">
              {soinsLinks.map((link) => (
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
                Île-de-France
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-nealma-text-light">
                <Clock className="size-4 shrink-0" />
                Lun–Sam · 9h–19h
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
