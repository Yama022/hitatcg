# HitaTCG — Roadmap

Lis ce fichier en entier avant de toucher au projet. Il te dit ce que l'app est censée faire, ce qui est déjà fait, et ce qui reste. Pour la structure technique/fichiers, voir [ARCHITECTURE.md](./ARCHITECTURE.md).

## Contexte business

HitaTCG est la boutique en ligne de Rémi Jacquemin, auto-entrepreneur, vendeur de cartes à collectionner One Piece (TCG) et d'objets dérivés (magnets imprimés en 3D) en live sur **Whatnot** (@hita_tcg — 1,5K+ abonnés, 1,4K+ ventes, 300+ avis 5★).

**Pourquoi ce site existe** : montrer patte blanche auprès de grossistes officiels One Piece TCG (Black Fire, TCG Factory, distributeurs français...) qui exigent une vitrine professionnelle avant de fournir. Ce n'est pas qu'une vitrine de façade — c'est aussi le futur outil de vente en ligne une fois le paiement branché.

**Contrainte de conception permanente** : le site doit lire "entreprise sérieuse", pas "fan site Whatnot". Palette délibérément sobre (noir/ivoire, corail en accent rare) pour cette raison — voir décision documentée dans la mémoire du projet.

**Statut légal** : Rémi est en micro-entreprise, régime franchise en base de TVA (pas de TVA facturée, pas de numéro TVA par défaut). Ça a des implications sur les mentions légales du site (déjà faites) et sur les futurs achats grossistes UE (hors scope du site).

## Ce qui est fait

### Phase 0 — Vitrine statique (obsolète, remplacée par Phase 1)
Catalogue en dur dans un fichier TS. Remplacé depuis par Supabase.

### Phase 1 — Boutique dynamique + admin (FAIT)
- **Base de données Supabase** : produits et catégories en DB, plus de redéploiement nécessaire pour changer le catalogue
- **Panel admin** (`/admin`, non lié publiquement nulle part sur le site) :
  - Connexion (compte unique, créé à la main dans Supabase Auth — pas d'inscription publique)
  - CRUD produits : nom, description, catégorie, prix, stock, photos multiples (upload vers Supabase Storage)
  - CRUD catégories : créer/supprimer à la volée, plus besoin de toucher au code pour ajouter "Booster", "Display", etc.
- **Catalogue public dynamique** avec filtres (nom, catégorie, prix min/max) via l'URL, catégories peuplées depuis la DB
- **Fiche produit** avec galerie multi-photos
- Testé de bout en bout contre un vrai projet Supabase avant chaque push (auth, lecture, écriture, upload/suppression storage)

### Légal
- Mentions légales (`/mentions-legales`) — éditeur, SIRET, hébergeur Vercel, propriété intellectuelle
- Politique de confidentialité (`/confidentialite`) — RGPD, adaptée à la réalité du site (zéro cookie, zéro formulaire, contact par liens directs uniquement)
- **Trou de conformité assumé** : adresse de l'éditeur absente des mentions légales, sur demande explicite de Rémi (vie privée). Légalement l'adresse est obligatoire pour une entreprise individuelle (LCEN art. 6-III). Solution propre si ça devient un problème : domiciliation commerciale (~15€/mois).
- **CGV pas encore rédigées** — obligatoires seulement une fois un vrai paiement en ligne actif (Phase 2). Ne pas les écrire avant que Phase 2 démarre.

### Infra / déploiement
- Hébergé sur **Vercel**, domaine **hitatcg.com**
- DNS géré par **Cloudflare** (le domaine a été acheté via Vercel puis les nameservers pointés vers Cloudflare)
- Email **contact@hitatcg.com** → forward vers le Gmail perso de Rémi via Cloudflare Email Routing (gratuit, pas de vraie boîte mail séparée)
- Repo GitHub : `Yama022/hitatcg`, connecté à Vercel (push sur `main` = déploiement auto)
- Node 20.20.2 requis en local (voir `README.md` du repo)

### Design
- Design system "ledger premium" : Instrument Serif (titres) + Geist (texte) + Geist Mono (tous les chiffres — prix, stats, stock)
- Palette sémantique en variables CSS (`--acc`, `--tx`, `--bg`, etc. dans `globals.css`), déclinée du logo réel (encre noire + corail sakura)
- Composants : cartes stats en bandeau divisé, filtre catégorie en sélecteur segmenté, boutons `rounded-lg` (pas de pills)

## Ce qui reste

### Workflow actuel (important, lis ça avant de coder)
**Règle établie avec Rémi (2026-07-21)** : les petites features/fixes sur ce qui est déjà en prod peuvent se pusher directement comme avant. Mais **Stripe et toute feature après lui restent en local, sans push**, tant que Rémi n'a pas validé. Raison : payer/commander en vrai est trop risqué pour du push automatique mi-chantier. Voir la mémoire du projet pour le détail exact de cette règle.

### Phase 2 — Paiement (Stripe) — PAS COMMENCÉ
Dans l'ordre de dépendance :
1. **Panier** — plusieurs articles, pas juste un bouton "acheter" isolé par produit
2. **Stripe Checkout** — session créée côté serveur (Server Action ou route API), redirige vers la page paiement hébergée par Stripe
3. **Livraison** — tarifs configurables directement dans Stripe Checkout (`shipping_options`), pas de calcul custom à coder
4. **Webhook Stripe** (`checkout.session.completed`) — décrémente le stock en DB, crée la commande, déclenche l'email de confirmation
5. **Table `orders`** dans Supabase — n° commande, email client, articles, total, adresse, statut
6. **Anti-survente** — empêcher un achat si le stock tombe à 0 entre deux clients (race condition sur le décrément)
7. **CGV** — rédiger, devient obligatoire dès que le paiement est actif
8. **Clés Stripe test → live** — tout valider en mode test avant de bascule réel

**Décision déjà prise** : pas de PayPal en plus de Stripe (complexité pour gain marginal vu le volume). Pas de compte client obligatoire — voir plus bas.

### Phase 3 — Suivi commande client — PAS COMMENCÉ
**Décision déjà prise avec Rémi** : pas de système de login client. Juste "suivre ma commande" par n° de commande + email. Compte client complet (mot de passe, historique) jugé inutile à cette échelle — à reconsidérer seulement si programme de fidélité envisagé un jour.
- Page "suivre ma commande" (lookup order_id + email, pas de compte)
- Email de confirmation de commande (reçu Stripe auto, ou email custom via Resend)

### Phase 4 — Admin commandes + polish — PAS COMMENCÉ
- Panel admin commandes (liste, marquer expédié, ajouter n° de suivi) — à côté de Produits/Catégories
- Alertes stock bas
- Dashboard ventes basique dans l'admin
- Nettoyage : suppression produit ne supprime pas les photos orphelines sur Supabase Storage (mineur, pas fait)

### Hors scope du site (process manuel, pas de code)
- **Génération de bordereaux d'expédition** — pas d'intégration transporteur prévue. Utiliser Boxtal/Sendcloud manuellement par commande tant que le volume reste faible. Réévaluer une intégration API seulement si le volume explose.
- **Sourcing grossiste** (Black Fire, TCG Factory, distributeurs français) — démarche business de Rémi, aucun lien avec le code du site.

## Pièges déjà rencontrés (pour éviter de reperdre du temps)

- **Tailwind v4 + classe CSS custom hors `@layer`** : une règle CSS non-layered bat toujours une utility Tailwind (layered), peu importe l'ordre/spécificité. Rencontré 2 fois (`max-w-none` sur le logo header, `.label-tag` qui écrasait les couleurs). Fix fiable : ne jamais mettre `color`/propriétés qui doivent être overridables dans une classe custom — tout passer par des utilities Tailwind composables.
- **JSX qui avale un espace entre `{expr}` et le texte suivant** : rencontré sur `/avis` et `/mentions-legales`, pas sur des JSX visuellement identiques ailleurs (cause exacte jamais élucidée). Fix : `{expr}{" "}` explicite plutôt que compter sur le whitespace implicite JSX.
- **Screenshots du navigateur en retard sur le DOM réel** : le outil de screenshot de ce environnement affiche parfois des images `next/image` comme non-chargées alors qu'elles le sont (confirmé par `img.complete`/`naturalWidth` en JS). Toujours vérifier via le DOM avant de conclure à un bug si un screenshot semble cassé.
- **Node 20.8.1 par défaut sur la machine, Next 16 exige ≥20.9** — utiliser `nvm use lts/iron` (20.20.2) systématiquement.
- **Next.js 16 : dossiers préfixés `_` sont exclus du routing** (convention "dossier privé") — a cassé une route de test API une fois.
