/*
  Supabase client template with development fallback.

  Usage:
  - Create a `.env` file at the project root (Vite) with:
      VITE_SUPABASE_URL=https://your-project.supabase.co
      VITE_SUPABASE_KEY=your-anon-or-service-key

  - When those env vars are present we create a real Supabase client via `createClient`.
  - Otherwise we expose a small mock provider that returns sample products for local UI development.
*/

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Product = {
  id: number;
  name: string;
  description?: string | null;
  image_url?: string | null;
  category?: string | null;
  in_stock?: boolean | null;
};

// Generate 20 sample products for visual testing
const sampleProducts: Product[] = Array.from({ length: 20 }).map((_, idx) => {
  const i = idx + 1;
  const categories = [
    "Seafood",
    "Natural Spices",
    "Vegetables & Others",
    "Catering",
  ];
  const category = categories[idx % categories.length];
  const nameBases: Record<string, string[]> = {
    Seafood: [
      "Wild Shrimp",
      "Grilled Fish",
      "Lobster",
      "Fresh Tuna",
      "Salmon Fillet",
    ],
    "Natural Spices": [
      "Spice Mix",
      "Pepper Blend",
      "Garlic Powder",
      "Citrus Seasoning",
      "Herb Mix",
    ],
    "Vegetables & Others": [
      "Mixed Veg Pack",
      "Plantain",
      "Yam Tubers",
      "Okra Bundle",
      "Tomato Crate",
    ],
    Catering: [
      "Event Catering (Small)",
      "Buffet Package",
      "Party Platter",
      "Catering (Medium)",
      "Catering (Large)",
    ],
  };

  const nameBase = nameBases[category][idx % 5];
  const images = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1604908177053-2d5b0d5a7b2f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1541542684-8e8c5e2c05b6?auto=format&fit=crop&w=1000&q=80",
  ];

  return {
    id: i,
    name: `${nameBase} ${i}`,
    description: `${nameBase} — quality you can trust.`,
    image_url: images[i % images.length],
    category,
    in_stock: i % 7 !== 0,
  };
});

// Read Vite env vars (Vite exposes vars prefixed with VITE_ via import.meta.env)
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || "";
const SUPABASE_KEY = (import.meta.env.VITE_SUPABASE_KEY as string) || "";

type MockProvider = {
  from: (table: string) => {
    select: (cols: string) => {
      order: (
        col: string,
        opts?: unknown
      ) => {
        order: (
          col2: string,
          opts2?: unknown
        ) => Promise<{ data: Product[] | null; error: unknown }>;
      };
    };
  };
};

let supabase: SupabaseClient | MockProvider;

if (SUPABASE_URL && SUPABASE_KEY) {
  // Create a real Supabase client
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY) as SupabaseClient;
} else {
  // Fallback mock provider
  supabase = {
    from(table: string) {
      void table;
      return {
        select(_cols: string) {
          void _cols;
          return {
            order(_col: string, _opts?: unknown) {
              void _col;
              void _opts;
              return {
                order(_col2: string, _opts2?: unknown) {
                  void _col2;
                  void _opts2;
                  return Promise.resolve({
                    data: sampleProducts as Product[],
                    error: null,
                  });
                },
              };
            },
          };
        },
      };
    },
  };
}

export { supabase };
