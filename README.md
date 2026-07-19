# HITATCG — Boutique en ligne

Site vitrine Next.js pour la boutique de cartes One Piece HITATCG (issue de la chaîne Whatnot).

## Prérequis

Next.js 16 exige **Node.js ≥ 20.9**. La version par défaut de ce Mac (20.8.1) est trop ancienne.
Une version compatible (20.20.2) a été installée via `nvm` :

```bash
source ~/.nvm/nvm.sh
nvm use lts/iron
```

## Lancer en développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## À personnaliser avant mise en ligne

- **`src/lib/config.ts`** — lien Whatnot réel, email de contact, Instagram.
- **`src/lib/products.ts`** — catalogue réel (les produits actuels sont des exemples).
- **`public/products/`** — dépose une photo `<slug>.jpg` par carte pour remplacer le visuel placeholder.
- **Logo** — dépose le fichier réel (`logo.png` ou `.svg`) dans `public/` et remplace le composant `src/components/Logo.tsx` par une balise `<Image>` pointant dessus. Palette actuelle recréée à la main (encre `#1c1b18`, sakura `#f0a8b4`, ivoire `#f7f2e7`, or `#bd9a4c`).
- **Avis clients** (`src/app/page.tsx` et `src/app/avis/page.tsx`) — remplace les avis d'exemple par de vrais extraits/captures de tes avis Whatnot.

## Build production

```bash
npm run build
npm run start
```

## Déploiement

Projet prêt pour [Vercel](https://vercel.com/new) (gratuit pour ce type de site). Aucune variable d'environnement requise pour l'instant.
