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
| 2026-03-13 | — | Fix 404 reservation + fallback CalEmbed + Cal.com API v2 header | `[serviceSlug]/page.tsx`, `cal-embed.tsx`, `cal.ts` |

---

## Tier 0 — Systeme de reservation maison (remplacement Cal.com)

> **Decision** : Ne pas utiliser Cal.com (iframe, branding, dependance tierce, donnees chez eux).
> Construire un systeme de reservation integre a 100% dans Nealma, avec la DB Supabase existante.

### 0.1 Schema DB : table `availability`

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Creer une table `availability` pour definir les horaires de travail de la praticienne (jours, heures debut/fin) et une table `blocked_dates` pour les jours bloques (vacances, absences). |
| **Tech** | Drizzle ORM, migration Supabase |
| **Schema prevu** | `availability` : `id`, `day_of_week` (0-6), `start_time` (time), `end_time` (time), `is_active` (bool). `blocked_dates` : `id`, `date`, `reason` (optionnel). |
| **Fichiers concernes** | `db/schema.ts`, nouvelle migration |

### 0.2 API : calcul des creneaux disponibles

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Endpoint qui, pour un service donne et une date, retourne les creneaux horaires disponibles. Logique : horaires de la praticienne - bookings existants - jours bloques. Duree du creneau = duree du service + 15 min de battement. |
| **Tech** | Route API Next.js, requetes Supabase |
| **Endpoint** | `GET /api/availability?service=massage-prenatal&date=2026-03-20` |
| **Fichiers concernes** | `api/availability/route.ts`, `lib/availability.ts` |

### 0.3 Composant calendrier (date picker)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Composant calendrier mensuel pour choisir une date. Les jours sans creneaux disponibles sont grises. Jours bloques marques. Navigation mois par mois. |
| **Tech** | Composant custom ou `react-day-picker` (deja compatible shadcn/ui) |
| **Fichiers concernes** | `components/booking/date-picker.tsx` |

### 0.4 Composant selection de creneau horaire

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Apres choix de la date, affiche la liste des creneaux disponibles (ex: 9h00, 10h15, 11h30...). Le client clique pour selectionner. |
| **Tech** | Composant React, appel API `/api/availability` |
| **Fichiers concernes** | `components/booking/time-slots.tsx` |

### 0.5 Formulaire client (etape 3 du stepper)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Formulaire pour recueillir nom, email, telephone et notes optionnelles du client. Validation cote client + serveur. |
| **Tech** | React Hook Form ou state local, validation |
| **Fichiers concernes** | `components/booking/client-form.tsx` |

### 0.6 API : creation de booking

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Endpoint pour creer une reservation. Verifie que le creneau est toujours dispo (race condition), insere en base, declenche le paiement Stripe, envoie l'email de confirmation via Resend. |
| **Tech** | Route API Next.js, Supabase, Stripe, Resend |
| **Endpoint** | `POST /api/bookings` |
| **Fichiers concernes** | `api/bookings/route.ts` |

### 0.7 Page de confirmation (etape 4)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Recapitulatif du RDV (service, date, heure, prix). Lien de paiement Stripe si applicable. Message de confirmation + email envoye. |
| **Fichiers concernes** | `reservation/confirmation/page.tsx` |

### 0.8 Flow complet du stepper dynamique

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Assembler les etapes 1 a 4 dans un flow fluide : choix soin → date → creneau → formulaire client → confirmation. Le `BookingStepper` reflete l'etape courante. Navigation avant/arriere. |
| **Fichiers concernes** | `reservation/[serviceSlug]/page.tsx`, `booking-stepper.tsx`, tous les composants booking |

### 0.9 Admin : gestion des disponibilites

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Interface dashboard pour que la praticienne puisse : definir ses horaires hebdo, bloquer des jours specifiques, voir/annuler des RDV. |
| **Fichiers concernes** | `dashboard/rendez-vous/page.tsx`, `dashboard/parametres/page.tsx` |

### 0.10 Emails transactionnels (confirmation + rappel)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Email de confirmation envoye au client apres reservation. Email de rappel 24h avant le RDV (via cron ou Supabase Edge Function). Email a l'admin pour chaque nouveau RDV. |
| **Tech** | Resend, templates React Email |
| **Fichiers concernes** | `lib/email.ts`, nouveaux templates |

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

### 2.1 Articles connexes (blog)

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Section "Articles similaires" en bas de chaque article, basee sur la categorie. |
| **Fichiers concernes** | `blog/[slug]/page.tsx` |

### 2.2 Recherche blog

| Champ | Valeur |
|-------|--------|
| **Statut** | `pending` |
| **Date livraison** | — |
| **Description** | Barre de recherche full-text sur les articles (titre + contenu). |
| **Tech** | Supabase full-text search ou recherche locale |
| **Fichiers concernes** | `blog/page.tsx` |

### 2.3 Vercel Analytics

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
- **Decision 2026-03-13** : Remplacement de Cal.com par un systeme de reservation maison (Tier 0). Raisons : pas de dependance tierce, pas de branding Cal.com, donnees 100% dans Supabase, UX integree au design Nealma, gratuit. Cal.com reste en fallback temporaire avec un message "bientot disponible" tant que le systeme maison n'est pas pret.
- Le stepper de reservation (ancien Tier 2.1) est absorbe dans le Tier 0 (etape 0.8).
