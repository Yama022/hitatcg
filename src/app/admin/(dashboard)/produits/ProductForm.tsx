"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";
import type { Category } from "@/lib/categories";
import { FormInput, FormTextarea, fieldClassName } from "@/components/FormInput";
import { Button } from "@/components/Button";

type ProductFormProps = {
  action: (formData: FormData) => void;
  product?: Product;
  categories: Category[];
  errorMessage?: string | null;
};

export function ProductForm({ action, product, categories, errorMessage }: ProductFormProps) {
  const [existingImages, setExistingImages] = useState(product?.images ?? []);

  return (
    <form action={action} className="space-y-6">
      {errorMessage && (
        <p className="rounded-lg bg-sakura-pale px-3 py-2 text-sm text-sakura-deep">
          {errorMessage}
        </p>
      )}

      <FormInput
        id="name"
        name="name"
        type="text"
        label="Nom du produit"
        required
        defaultValue={product?.name}
      />

      <FormTextarea
        id="description"
        name="description"
        label="Description"
        rows={4}
        defaultValue={product?.description}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category_id" className="text-sm font-medium text-ink">
            Catégorie
          </label>
          <select
            id="category_id"
            name="category_id"
            required
            defaultValue={product?.categoryId ?? categories[0]?.id ?? ""}
            className={`mt-1 w-full bg-white ${fieldClassName}`}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          <a
            href="/admin/categories"
            target="_blank"
            className="mt-1 inline-block text-xs text-sakura-deep hover:underline"
          >
            + Gérer les catégories
          </a>
        </div>
        <FormInput
          id="stock"
          name="stock"
          type="number"
          label="Quantité en stock"
          min={0}
          step={1}
          required
          defaultValue={product?.stock ?? 0}
        />
      </div>

      <FormInput
        id="price"
        name="price"
        type="number"
        label="Prix (€)"
        min={0}
        step={0.01}
        required
        defaultValue={product?.price}
        className="max-w-xs"
      />

      {existingImages.length > 0 && (
        <div>
          <p className="text-sm font-medium text-ink">Photos actuelles</p>
          <div className="mt-2 grid grid-cols-4 gap-3">
            {existingImages.map((src) => (
              <div key={src} className="relative">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-ink/10">
                  <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                </div>
                <label className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                  <input
                    type="checkbox"
                    name="existingImages"
                    value={src}
                    defaultChecked
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setExistingImages((prev) => prev.filter((img) => img !== src));
                      }
                    }}
                  />
                  Garder
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="images" className="text-sm font-medium text-ink">
          Ajouter des photos
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="mt-1 w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-cream"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit">
          {product ? "Enregistrer" : "Créer le produit"}
        </Button>
      </div>
    </form>
  );
}
