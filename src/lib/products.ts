export type ProductCategory = "carte" | "objet-3d";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  // Ligne affichée sous le nom (référence carte, ou détail de fabrication).
  subtitle: string;
  // Court libellé affiché sur la vignette.
  badge: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  description: string;
  // Dépose une photo dans /public/products/<slug>.jpg pour remplacer le visuel placeholder.
  image?: string;
  // Lien direct vers l'annonce Whatnot du produit. À défaut, le CTA pointe vers le profil.
  link?: string;
};

export const categoryLabels: Record<ProductCategory, string> = {
  carte: "Carte gradée",
  "objet-3d": "Impression 3D",
};

// Catalogue — issu de la boutique Whatnot HITATCG.
export const products: Product[] = [
  {
    slug: "luffy-op09-119-sp-fr-cgc10",
    name: "Luffy OP09-119 SP FR CCC 10",
    category: "carte",
    subtitle: "OP09-119 · CCC 10",
    badge: "Carte gradée",
    price: 400,
    stock: 1,
    description: "Carte One Piece Card Game gradée CCC 10, pièce unique.",
    image: "/products/1.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTkwMzYyODg3OA==",
  },
  {
    slug: "sanji-op12-060-event-manga-fr-cgc10",
    name: "Sanji OP12-060 Event Manga FR CCC 10",
    category: "carte",
    subtitle: "OP12-060 · CCC 10",
    badge: "Carte gradée",
    price: 200,
    stock: 1,
    description: "Carte Event Manga FR gradée CCC 10, pièce unique.",
    image: "/products/2.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTkwMzYyNzg0Mw==",
  },
  {
    slug: "sanji-st13-004-sp-fr-cgc10",
    name: "Sanji ST13-004 SP FR CCC 10",
    category: "carte",
    subtitle: "ST13-004 · CCC 10",
    badge: "Carte gradée",
    price: 220,
    stock: 1,
    description: "Carte One Piece Card Game gradée CCC 10, pièce unique.",
    image: "/products/3.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTkwMzYyNjkwOQ==",
  },
  {
    slug: "magnet-ace-3d-v2",
    name: "Magnet Ace 3D V2",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 3,
    stock: 9,
    description: "Magnet Ace imprimé en 3D V2",
    image: "/products/4.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTg5MzM1NDk2Mw==",
  },
  {
    slug: "magnet-shanks-3d-v2",
    name: "Magnet Shanks 3D V2",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 15,
    description: "Magnet Shanks imprimé en 3D V2",
    image: "/products/5.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTg5MzM0ODk0OA==",
  },
  {
    slug: "magnet-law-3d",
    name: "Magnet Law 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 14,
    description: "Magnet Law imprimé en 3D",
    image: "/products/6.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTg5MzM0NzU0Mw==",
  },
  {
    slug: "magnet-boa-3d",
    name: "Magnet Boa 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 14,
    description: "Magnet Boa imprimé en 3D",
    image: "/products/7.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTg5MzM0NjIxMg==",
  },
  {
    slug: "magnet-yamato-3d",
    name: "Magnet Yamato 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 8,
    description: "Magnet Yamato imprimé en 3D",
    image: "/products/8.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTg5MzM0NDU1MA==",
  },
  {
    slug: "magnet-jetons-ace-3d",
    name: "Magnet jetons Ace 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 15,
    description: "Magnet jetons Ace imprimé en 3D",
    image: "/products/9.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTg5MzM0MzAyOQ==",
  },
  {
    slug: "magnet-luffy-nika-3d",
    name: "Magnet Luffy NIKA 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 10,
    description: "Magnet Luffy NIKA imprimé en 3D",
    image: "/products/10.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTg5MzM0MTc1Mw==",
  },
  {
    slug: "magnet-nami-3d",
    name: "Magnet Nami 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 10,
    description: "Magnet Nami imprimé en 3D",
    image: "/products/11.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTg1MTExNzU5MQ==",
  },
  {
    slug: "magnet-gol-d-roger-3d",
    name: "Magnet Gol D. Roger 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 4,
    description: "Magnet Gol D. Roger imprimé en 3D",
    image: "/products/12.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTgwNTE4OTg5NA==",
  },
  {
    slug: "magnet-ace-3d",
    name: "Magnet Ace 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 3,
    stock: 4,
    description: "Magnet Ace imprimé en 3D",
    image: "/products/13.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTgwNTE4NjkxMA==",
  },
  {
    slug: "magnet-barbe-noire-teach-3d",
    name: "Magnet Barbe Noire (Teach) 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 4,
    description: "Magnet Barbe Noire imprimé en 3D",
    image: "/products/14.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTgwNTE4NTIyMQ==",
  },
  {
    slug: "magnet-shanks-3d",
    name: "Magnet Shanks 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 4,
    description: "Magnet Shanks imprimé en 3D",
    image: "/products/15.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTgwNTE4MzAxMA==",
  },
  {
    slug: "magnet-baggy-3d",
    name: "Magnet Baggy 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 3,
    description: "Magnet Baggy imprimé en 3D",
    image: "/products/16.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTgwNTE4MTQ2MA==",
  },
  {
    slug: "magnet-luffy-3d",
    name: "Magnet Luffy 3D",
    category: "objet-3d",
    subtitle: "Magnet imprimé à l'atelier",
    badge: "Impression 3D",
    price: 2,
    stock: 5,
    description: "Magnet Luffy imprimé en 3D",
    image: "/products/17.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTgwNTE3OTkwNg==",
  },
  {
    slug: "lot-magnet-4-yonko-3d",
    name: "Lot magnet des 4 Yonko 3D",
    category: "objet-3d",
    subtitle: "Lot de 4 magnets imprimés à l'atelier",
    badge: "Lot 3D",
    price: 7,
    stock: 10,
    description: "Lot magnet des 4 Yonko imprimé en 3D",
    image: "/products/18.jpeg",
    link: "https://www.whatnot.com/fr-FR/listing/TGlzdGluZ05vZGU6MTgwNTE3NTE4Nw==",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
