# 🤱 Néalma

> Accompagnement périnatal à domicile en Île-de-France

Site vitrine et plateforme de gestion pour **Néalma**, un service de soins périnataux à domicile proposé par une infirmière diplômée. Massage prénatal, post-partum, bain enveloppé bébé et soutien à l'allaitement. 🌿

---

## ✨ Fonctionnalités

- 🏠 **Site vitrine** — Présentation des services, témoignages, pages À propos & Contact
- 📅 **Réservation en ligne** — Intégration Cal.com pour la prise de rendez-vous
- 💳 **Paiement** — Intégration Stripe (webhooks inclus)
- 📝 **Blog** — Articles en MDX avec génération assistée par IA
- 📊 **Dashboard** — Gestion des rendez-vous, articles, paramètres et suivi publicitaire (Google Ads, TikTok Ads)
- 🔐 **Authentification** — Supabase Auth avec middleware protégeant les routes
- 📧 **Emails** — Envoi via Resend (formulaire de contact)
- 🔍 **SEO** — Sitemap, robots.txt, données structurées JSON-LD

## 🛠️ Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/ui, Radix UI |
| Base de données | PostgreSQL via Supabase, Drizzle ORM |
| Auth | Supabase Auth (SSR) |
| Paiement | Stripe |
| Réservation | Cal.com |
| IA | Vercel AI SDK (Anthropic, OpenAI, Google) |
| Email | Resend |
| Ads | Google Ads API, TikTok Ads API |

## 🚀 Démarrage rapide

```bash
# Cloner le repo
git clone https://github.com/MrJaegerz/nealma.git
cd nealma

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 📁 Structure du projet

```
src/
├── app/
│   ├── (vitrine)/       # Pages publiques (accueil, services, contact, à propos)
│   ├── api/             # Routes API (blog, contact, webhooks, ads)
│   ├── blog/            # Pages blog
│   ├── dashboard/       # Back-office protégé
│   ├── login/           # Authentification
│   └── reservation/     # Parcours de réservation
├── components/
│   ├── ui/              # Composants shadcn/ui
│   ├── vitrine/         # Composants du site vitrine
│   ├── blog/            # Composants blog
│   ├── booking/         # Composants réservation
│   └── dashboard/       # Composants dashboard
├── db/                  # Schéma Drizzle ORM
└── lib/                 # Services (Stripe, Supabase, Cal, AI, emails, ads)
```

## 📄 Licence

Ce projet est sous licence privée. Tous droits réservés.
