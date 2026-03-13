# Backlog Nealma

> Suivi des ameliorations planifiees, en cours et terminees.
> **Legende statut :** `done` | `in-progress` | `pending`

---

## Historique des livraisons

| Date | Heure | Description | Fichiers principaux |
|------|-------|-------------|---------------------|
| 2026-03-12 | — | Setup initial du projet (structure, DB, pages, API) | `src/` |
| 2026-03-12 | — | Ajout AnimatedBlobs + stylisation vitrine | `globals.css`, composants vitrine |
| 2026-03-12 | — | Corrections design review (toutes pages) | `header.tsx`, `footer.tsx`, pages vitrine |
| 2026-03-12 | — | Redesign wireframe : nouveaux composants + UX | `eyebrow-badge.tsx`, `trust-strip.tsx`, `booking-stepper.tsx`, 10 fichiers |
| 2026-03-12 | — | Ajout images services (photo-first layout) | `services/page.tsx`, `page.tsx` (accueil) |

---

## Tier 1 — Priorite haute

### 1.1 Dark Mode

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Theme sombre pour toutes les pages vitrine + dashboard. Toggle dans le header, persistence localStorage, respect `prefers-color-scheme`. |
| **Tech** | `next-themes` + Tailwind CSS `dark:` variants |
| **Fichiers concernes** | `globals.css`, `header.tsx`, `layout.tsx`, toutes les pages |

### 1.2 Filtres blog par categorie (query params)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Filtrage cote serveur des articles par categorie via query params (`/blog?category=grossesse`). Les liens avec filtres sont partageables. Le filtre actif est mis en surbrillance. |
| **Tech** | `searchParams` Next.js, requete Supabase filtree |
| **Fichiers concernes** | `blog/page.tsx`, `blog_posts` schema (ajout colonne `category`) |

### 1.3 Carte zone Ile-de-France (OpenStreetMap)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Remplacer le placeholder par une vraie carte interactive centree sur l'Ile-de-France. Gratuit, sans cle API. |
| **Tech** | `react-leaflet` + OpenStreetMap tiles |
| **Fichiers concernes** | `contact/page.tsx`, nouveau composant `zone-map.tsx` |

### 1.4 Newsletter (inscription email)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Brancher le formulaire newsletter du blog a un service d'envoi. Stocker les emails inscrits, envoyer un email de bienvenue. |
| **Tech** | Resend (audiences) ou Mailchimp (gratuit) |
| **Fichiers concernes** | `blog/page.tsx`, nouvelle route API `api/newsletter/route.ts` |

### 1.5 Temps de lecture estime (blog)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Afficher "X min de lecture" sur chaque carte d'article et sur la page article. Calcul base sur le nombre de mots (~200 mots/min). |
| **Tech** | Fonction utilitaire `readTime(content)` |
| **Fichiers concernes** | `article-card.tsx`, `blog/[slug]/page.tsx`, `lib/utils.ts` |

---

## Tier 2 — Nice to have

### 2.1 Stepper de reservation dynamique

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Le BookingStepper progresse selon l'etape reelle du parcours (selection soin → choix creneau → coordonnees → confirmation). |
| **Fichiers concernes** | `booking-stepper.tsx`, pages reservation |

### 2.2 Articles connexes (blog)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Section "Articles similaires" en bas de chaque article, basee sur la categorie. |
| **Fichiers concernes** | `blog/[slug]/page.tsx` |

### 2.3 Recherche blog

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Barre de recherche full-text sur les articles (titre + contenu). |
| **Tech** | Supabase full-text search ou recherche locale |
| **Fichiers concernes** | `blog/page.tsx` |

### 2.4 Emails de confirmation RDV

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Email automatique apres reservation (confirmation + rappel 24h avant). |
| **Tech** | Resend + webhook Cal.com |
| **Fichiers concernes** | `api/webhooks/cal/route.ts`, templates email |

### 2.5 Vercel Analytics

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Suivi des visites, pages vues, performance web. Gratuit sur Vercel. |
| **Tech** | `@vercel/analytics` |
| **Fichiers concernes** | `layout.tsx` |

---

## Tier 3 — Polish

### 3.1 PWA (Progressive Web App)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Mode hors-ligne basique, installation sur mobile, manifest.json. |

### 3.2 Navigation mobile (bottom nav)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Barre de navigation fixe en bas sur mobile au lieu du menu burger. |

### 3.3 Animations Framer Motion

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Transitions de page, apparitions au scroll (fade-in), hero animations. |

### 3.4 Audit accessibilite (WCAG)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Audit complet WCAG 2.1 AA : contraste, navigation clavier, lecteur d'ecran, aria labels. |

### 3.5 Rate limiting API

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Proteger `/api/contact` et `/api/newsletter` contre le spam (rate limit par IP). |
| **Tech** | `@upstash/ratelimit` (gratuit) ou middleware custom |

### 3.6 Error boundaries + logging

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Fallback UI pour les erreurs, reporting via Sentry (gratuit tier). |

### 3.7 Admin notifications

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Email a l'admin quand : nouveau RDV, nouveau message contact, nouvel inscrit newsletter. |

### 3.8 SEO avance

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Open Graph images dynamiques, Twitter cards, schema FAQPage, breadcrumbs. |

### 3.9 CI/CD (Github Actions)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Pipeline : lint, type-check, build sur chaque PR. Auto-deploy via Vercel. |

---

## Notes

- L'authentification utilise **Supabase Auth** (pas de credentials en dur). Creer un utilisateur dans la console Supabase pour acceder au dashboard.
- Les images services utilisent actuellement des URLs Pixabay/Pexels. A remplacer par des photos propres au projet.
- Le dashboard n'a pas ete touche par le redesign wireframe (prevu pour une phase ulterieure).
