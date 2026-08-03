# HitaTCG — Architecture

Structure technique du projet. Pour le contexte business et l'état d'avancement, voir [ROADMAP.md](./ROADMAP.md).

## Stack

- **Next.js 16** (App Router, Turbopack) — attention, breaking changes vs versions antérieures (params/searchParams async partout, middleware renommé `proxy.ts`). Lire `node_modules/next/dist/docs/` avant de coder si un doute.
- **React 19.2**
- **TypeScript**
- **Tailwind CSS v4** (config CSS-first via `@theme inline` dans `globals.css`, pas de `tailwind.config.js`)
- **Supabase** — Postgres (produits/catégories), Auth (admin uniquement), Storage (photos produits)
- **Vercel** — hébergement + déploiement (push sur `main` = déploiement auto)
- **Cloudflare** — DNS du domaine `hitatcg.com` + Email Routing

## Arborescence

```
src/
  app/
    layout.tsx              racine — fonts, header/footer, metadata
    globals.css              variables CSS sémantiques + mapping Tailwind
    page.tsx                 accueil (hero, profil Whatnot, produits vedettes, avis)
    icon.png                 favicon (généré depuis le logo)

    catalogue/
      page.tsx                liste + filtres (searchParams: q, category, minPrice, maxPrice)
      [slug]/page.tsx          fiche produit (params async, Next 16)

    a-propos/page.tsx
    avis/page.tsx
    contact/page.tsx
    mentions-legales/page.tsx
    confidentialite/page.tsx

    admin/
      login/
        page.tsx               formulaire connexion
        actions.ts              server action signInWithPassword
      (dashboard)/              route group — tout ce qui est derrière le login
        layout.tsx               nav admin (Produits/Catégories/Déconnexion)
        actions.ts               server actions: logout, createProduct, updateProduct,
                                  deleteProduct, createCategory, deleteCategory, upload photos
        produits/
          page.tsx                liste (table)
          ProductForm.tsx          formulaire partagé création/édition (client component)
          nouveau/page.tsx
          [id]/page.tsx
        categories/page.tsx      liste + ajout + suppression

  components/
    SiteHeader.tsx / SiteFooter.tsx
    Logo.tsx                   logo réel (public/logo.png) via next/image
    CTAButton.tsx               bouton lien réutilisable (primary/secondary)
    ProductCard.tsx              vignette produit (catalogue + accueil)
    ProductGallery.tsx           galerie photos (fiche produit, client component)
    CatalogueFilters.tsx          barre de filtres catalogue (client component)
    StatsStrip.tsx                bandeau stats (abonnés/ventes/avis/note)
    WhatnotProfileCard.tsx        carte "profil vérifié Whatnot" (accueil)
    ReviewCard.tsx

  lib/
    config.ts                  config site : nom, tagline, liens Whatnot/Instagram,
                                stats, bio profil Whatnot — SOURCE UNIQUE pour ces valeurs
    products.ts                 data layer produits (Supabase, server-only — utilise next/headers)
    categories.ts                data layer catégories (Supabase, server-only)
    supabase/
      client.ts                  client navigateur (browser components)
      server.ts                  client serveur (Server Components/Actions, cookies)
      middleware.ts               refresh session + protection /admin, appelé par proxy.ts

  proxy.ts                    middleware racine (Next 16 : remplace middleware.ts)

supabase/
  schema.sql                  schéma complet pour un NOUVEAU projet Supabase
  migration-categories.sql    migration pour un projet existant (catégories texte → table)
  seed.sql                    catalogue de départ (18 produits réels)
  create-bucket.sql           crée le bucket Storage product-images
```

## Modèle de données

### `categories`
| colonne | type | note |
|---|---|---|
| id | uuid | PK |
| slug | text | unique, généré depuis le label |
| label | text | affiché admin + filtre catalogue |

### `products`
| colonne | type | note |
|---|---|---|
| id | uuid | PK |
| slug | text | unique, généré depuis le nom |
| name | text | |
| description | text | |
| category_id | uuid | FK → categories.id |
| price | numeric(10,2) | |
| compare_at_price | numeric(10,2) | nullable, prix barré (peu utilisé actuellement) |
| stock | integer | |
| images | text[] | URLs Supabase Storage (ou `/products/N.jpeg` pour les produits de seed) |
| whatnot_link | text | nullable, lien direct annonce Whatnot |
| created_at / updated_at | timestamptz | updated_at auto via trigger |

RLS : lecture publique (anon + authenticated), écriture réservée à `authenticated` (= le seul compte admin). Pas de `service_role` utilisé côté app — tout passe par la clé anon + RLS + session admin.

### Auth
Un seul compte, créé à la main dans Supabase Auth (pas d'inscription publique, pas de gestion de rôles). `src/proxy.ts` + `lib/supabase/middleware.ts` redirigent tout `/admin/*` non-authentifié vers `/admin/login`.

### Storage
Bucket `product-images`, public en lecture, écriture réservée aux utilisateurs authentifiés.

## Variables d'environnement

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```
Définies en local dans `.env.local` (gitignoré) et dans Vercel (Project Settings → Environment Variables, les 3 environnements). **Sans elles, le build réussit mais toutes les pages catalogue/admin plantent en 500 au runtime** (elles font des requêtes Supabase).

## Design system

Tokens CSS sémantiques dans `globals.css` (`:root`), mappés vers des utilities Tailwind via `@theme inline` pour compat avec le code existant :

```
--acc / --acc2      accent (corail, dérivé du logo)
--gr / --re / --am  succès / erreur / attention
--tx / --tx2 / --tx3  texte primaire / secondaire / tertiaire
--bg / --bg2 / --bg3  fond page / carte / carte imbriquée
--line / --line2     bordures
```
Utilities Tailwind exposées : `bg-ink`/`text-ink`/`text-ink-soft`/`text-ink-faint`/`bg-cream`/`bg-cream-soft`/`bg-sakura`/`text-sakura`/`bg-gold` (noms historiques conservés pour ne pas casser tout le code existant — voir le mapping dans `globals.css`).

Fonts : `font-display` (Instrument Serif, titres) et `font-mono` (Geist Mono, tous les chiffres). Défaut = Geist (texte courant).

**Pas de dark mode implémenté** — l'architecture de variables le permettrait facilement (ajouter un bloc `:root[data-theme="dark"]`) mais aucun toggle n'existe, ne pas en ajouter sans demande explicite.

## Sections à ajouter pour une boutique pleinement opérationnelle

Ce que l'architecture actuelle NE couvre PAS encore, dans l'ordre où ça devrait arriver (détail du "pourquoi" dans ROADMAP.md) :

1. **`cart` (état panier)** — probablement client-side (localStorage ou cookie) plutôt qu'une table DB, pas besoin de persister un panier abandonné pour ce volume
2. **Route API `checkout`** — crée une session Stripe Checkout, reçoit le panier, applique les `shipping_options`
3. **Route API `webhooks/stripe`** — reçoit `checkout.session.completed`, vérifie la signature Stripe, décrémente le stock, insère dans `orders`
4. **Table `orders`** + **table `order_items`** (une commande peut avoir plusieurs produits) — colonnes : id, email client, adresse livraison, total, statut (payée/expédiée/livrée), stripe_session_id, created_at
5. **Page `/suivi-commande`** — formulaire n° commande + email, lecture seule sur `orders`
6. **Admin `/admin/commandes`** — liste des commandes, changement de statut, ajout n° de suivi
7. **Service email transactionnel** (Resend ou équivalent) — confirmation de commande, notification expédition
8. **Page `/cgv`** — obligatoire dès l'étape 2/3, pas avant
9. **Verrou anti-survente** — soit une contrainte DB (`check (stock >= 0)` + décrément atomique via fonction Postgres), soit une vérification au moment du webhook avant de confirmer

Aucune de ces pièces n'existe dans le repo actuellement — les créer dans cet ordre, en local, sans push tant que non validé (règle en vigueur, voir ROADMAP.md).
