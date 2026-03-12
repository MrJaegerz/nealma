# Design Review Results: Toutes les pages — Néalma

**Review Date**: 2026-03-12  
**Routes**: `/` · `/services` · `/a-propos` · `/contact` · `/blog` · `/reservation` · `/login` · `/dashboard`  
**Focus Areas**: Visual Design · UX/Usability · Responsive/Mobile · Accessibility · Micro-interactions · Consistency

---

## Summary

Le site Néalma présente une identité visuelle douce et cohérente (tons chauds, typographie serif élégante, blobs animés) qui correspond bien à l'univers périnatal. Cependant, plusieurs problèmes **fonctionnels critiques** existent : une page de réservation sans header/footer, un lien 404 dans le footer, et une fonction `modalityLabel` incomplète. Les inconsistances de layout entre les pages publiques et les pages de réservation/blog nuisent à la cohérence globale, et l'accessibilité clavier/ARIA nécessite un travail ciblé.

---

## Issues

| # | Issue | Criticality | Category | Location |
|---|-------|-------------|----------|----------|
| 1 | `modalityLabel()` ne gère pas le cas `"les_deux"` → affiche le string brut `"les_deux"` sur le badge du soin "Soutien allaitement" dans les ServiceCards | 🔴 Critical | Consistency | `src/components/vitrine/service-card.tsx:37-48` |
| 2 | La page `/reservation` est hors du groupe `(vitrine)` → pas de Header ni de Footer (utilisateur perdu sans navigation ni retour au site) | 🔴 Critical | UX/Usability | `src/app/reservation/page.tsx` · `src/app/(vitrine)/layout.tsx` |
| 3 | Le Footer contient un lien `/mentions-legales` qui n'a pas de page correspondante → 404 garanti | 🔴 Critical | UX/Usability | `src/components/vitrine/footer.tsx:85-89` |
| 4 | Aucun état actif (active state) sur les liens de navigation → impossible pour l'utilisateur de savoir quelle page est active | 🟠 High | UX/Usability | `src/components/vitrine/header.tsx:38-48` |
| 5 | Le formulaire de contact est manquant d'attributs `autocomplete` sur les champs `name`, `phone` et `message` → friction inutile, problème WCAG 1.3.5 | 🟠 High | Accessibility | `src/app/(vitrine)/contact/contact-form.tsx:120-190` |
| 6 | La page `/login` utilise `bg-zinc-50 dark:bg-black` au lieu des tokens design Néalma → incohérence visuelle totale avec le reste du site | 🟠 High | Consistency | `src/app/login/page.tsx:44` |
| 7 | La page `/blog` utilise un pattern de layout complètement différent des pages vitrine : pas de hero chaud, pas d'`AnimatedBlobs`, pas de `py-20 px-4 sm:px-6 lg:px-8` → rupture visuelle | 🟠 High | Consistency | `src/app/blog/page.tsx:23-55` |
| 8 | Les icônes de la section "philosophie" sur `/a-propos` utilisent des entités HTML brutes (`&#10084;`, `&#9202;`, `&#9733;`) au lieu d'icônes Lucide → rendu inconsistant, non accessible aux lecteurs d'écran | 🟠 High | Accessibility | `src/app/(vitrine)/a-propos/page.tsx:137,148,162` |
| 9 | Sur `/services`, le bouton "Réserver ce soin" dans la vue détaillée pointe vers `/reservation` (générique) au lieu de `/reservation/[slug]` → perte du contexte service | 🟠 High | UX/Usability | `src/app/(vitrine)/services/page.tsx:151` |
| 10 | Aucun style `focus-visible` défini sur les liens de navigation, les cartes et les boutons → navigation clavier inutilisable sans repère visuel | 🟠 High | Accessibility | `src/components/vitrine/header.tsx:43` · `src/app/globals.css` |
| 11 | La page `/reservation` et la page `/blog` utilisent `font-bold` combiné avec `font-heading` → alors que toutes les pages vitrine utilisent uniquement `font-heading` sans `font-bold` | 🟡 Medium | Consistency | `src/app/reservation/page.tsx:79` · `src/app/blog/page.tsx:25` |
| 12 | La fonction `modalityLabel` est dupliquée en inline dans `reservation/page.tsx` (lignes 112-115) et dans `service-card.tsx` → devrait être une fonction utilitaire partagée | 🟡 Medium | Consistency | `src/app/reservation/page.tsx:112-115` · `src/components/vitrine/service-card.tsx:37-48` |
| 13 | La section témoignages sur la homepage et la section "Parcours" sur `/a-propos` n'ont pas d'attribut `aria-label` ni de rôle de landmark (`<section aria-label="...">`) → mauvaise navigation par lecteur d'écran | 🟡 Medium | Accessibility | `src/app/(vitrine)/page.tsx:152` · `src/app/(vitrine)/a-propos/page.tsx:75` |
| 14 | La sidebar dashboard affiche deux entrées avec le même icône `BarChart3` (Google Ads, TikTok Ads) → aucune différenciation visuelle entre les deux | 🟡 Medium | Visual Design | `src/components/dashboard/sidebar.tsx:40-55` |
| 15 | Les Hero sections de `/contact` et `/blog` n'ont pas de `AnimatedBlobs` alors que toutes les autres hero sections en ont → inconsistance dans l'utilisation du pattern visuel signature | 🟡 Medium | Consistency | `src/app/(vitrine)/contact/page.tsx:14` · `src/app/blog/page.tsx` |
| 16 | Pas de page `/not-found.tsx` personnalisée → 404 générique Next.js, hors charte graphique Néalma | 🟡 Medium | Consistency | `src/app/` |
| 17 | Les boutons CTA du Hero (`Découvrir nos services` / `Prendre rendez-vous`) n'ont pas d'`aria-label` pour les distinguer aux lecteurs d'écran | ⚪ Low | Accessibility | `src/components/vitrine/hero.tsx:21-26` |
| 18 | Aucune transition de page entre les routes → navigation abrupte, sans continuité visuelle | ⚪ Low | Micro-interactions | `src/app/layout.tsx` |
| 19 | Le footer ne comporte aucun lien vers les réseaux sociaux → opportunité manquée pour la visibilité et la confiance en ligne pour une activité de soins | ⚪ Low | UX/Usability | `src/components/vitrine/footer.tsx` |
| 20 | Les cards de services sur `/services` n'ont pas d'image ou d'illustration → la page paraît très textuelle, manque d'éléments visuels pour différencier les soins | ⚪ Low | Visual Design | `src/app/(vitrine)/services/page.tsx:107-157` |
| 21 | La police `font-body` est définie sur Helvetica Neue/Arial (polices système) → aucune police web personnalisée pour le corps du texte, ce qui contraste avec la richesse de la police serif `Eschaton` du heading | ⚪ Low | Visual Design | `src/app/globals.css:13` |
| 22 | Les StatsCards du dashboard ne montrent aucune évolution (pas de delta, pas de tendance) → données sans contexte, peu actionnables | ⚪ Low | UX/Usability | `src/components/dashboard/stats-card.tsx` |

---

## Criticality Legend

- 🔴 **Critical** : Casse la fonctionnalité ou viole des standards d'accessibilité / d'expérience de base
- 🟠 **High** : Impact significatif sur l'expérience utilisateur ou la qualité du design
- 🟡 **Medium** : Problème notable à adresser pour améliorer la cohérence et la qualité
- ⚪ **Low** : Amélioration souhaitable, nice-to-have

---

## Next Steps (priorisation recommandée)

### Immédiat (Critiques)
1. **Fix `modalityLabel`** → ajouter le case `"les_deux"` dans `service-card.tsx` et extraire une fonction utilitaire partagée dans `src/lib/utils.ts`
2. **Déplacer `/reservation`** dans le groupe `(vitrine)` ou y ajouter manuellement `<Header />` et `<Footer />`
3. **Créer la page `/mentions-legales`** ou retirer le lien du footer

### Court terme (High)
4. **Active nav state** : utiliser `usePathname()` dans le Header pour appliquer une classe active sur le lien courant
5. **Attributs `autocomplete`** sur le formulaire de contact
6. **Harmoniser `/login`** avec les tokens Néalma (`bg-nealma-bg-warm`, etc.)
7. **Harmoniser `/blog`** avec le pattern de layout vitrine (hero chaud + AnimatedBlobs)
8. **Remplacer les entités HTML** par des icônes Lucide sur `/a-propos`
9. **Fix lien "Réserver ce soin"** sur `/services` → pointer vers `/reservation/${service.slug}`
10. **Ajouter des styles `focus-visible`** dans `globals.css` pour tous les éléments interactifs

### Moyen terme (Medium + Low)
11. Créer une page `/not-found.tsx` brandée Néalma
12. Différencier les icônes Google Ads / TikTok Ads dans la sidebar
13. Ajouter `aria-label` aux sections de la homepage
14. Envisager une police de corps (ex: Inter, Lato) pour mieux pairer avec Eschaton
15. Ajouter des illustrations ou images aux cards services
16. Envisager une transition de page légère (Framer Motion ou `@next/link` prefetch avec fade)
