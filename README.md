# HITATCG — Boutique en ligne

Site Next.js pour la boutique de cartes One Piece HITATCG (issue de la chaîne Whatnot), avec catalogue dynamique et panel admin (Supabase).

## Prérequis

Next.js 16 exige **Node.js ≥ 20.9**. Si besoin, une version compatible via `nvm` :

```bash
source ~/.nvm/nvm.sh
nvm use lts/iron
```

## Setup Supabase (obligatoire pour lancer le site)

Le catalogue et l'admin dépendent d'un projet Supabase. Sans ça, `npm run dev` plante sur toutes les pages produits/admin.

1. Crée un compte sur [supabase.com](https://supabase.com), puis un nouveau projet (région Europe conseillée).
2. Dans **SQL Editor**, exécute le contenu de [`supabase/schema.sql`](supabase/schema.sql) — crée la table `products`, les policies, les policies de stockage.
3. Dans **Storage**, crée un bucket nommé exactement `product-images`, coche **Public bucket**.
4. Toujours dans **SQL Editor**, exécute [`supabase/seed.sql`](supabase/seed.sql) — importe les 18 produits actuels (photos déjà dans `public/products/`, pas besoin de les re-uploader).
5. Dans **Authentication → Users**, crée manuellement ton compte admin (email + mot de passe). Pas d'inscription publique : c'est le seul compte qui pourra se connecter à `/admin`.
6. Dans **Project Settings → API**, récupère :
   - `Project URL`
   - `anon public` key
7. Crée un fichier `.env.local` à la racine du projet (jamais commité, déjà dans `.gitignore`) :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

8. Sur **Vercel** (Project Settings → Environment Variables), ajoute les deux mêmes variables pour que le site déployé fonctionne aussi.

## Lancer en développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000). Espace admin : `/admin/login`.

## Admin

- `/admin/login` — connexion (compte créé manuellement dans Supabase, voir ci-dessus)
- `/admin/produits` — liste, création, édition, suppression de produits (nom, description, catégorie, prix, stock, photos multiples)
- Le catalogue public (`/catalogue`) reflète les changements immédiatement, sans redéploiement.

## Build production

```bash
npm run build
npm run start
```

## Déploiement

Hébergé sur [Vercel](https://vercel.com), domaine `hitatcg.com` (DNS géré par Cloudflare). Chaque push sur `main` redéploie automatiquement.
