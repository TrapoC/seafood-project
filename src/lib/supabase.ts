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

// Replaceable list of sample products for local development.
// This array mirrors the product names/categories you provided so the UI shows real items.
const sampleProducts: Product[] = [
  // Seafood
  {
    id: 1,
    name: "Oron Crayfish",
    description: "Premium Oron crayfish, dried and ready for soups.",
    image_url:
      "data:image/jpeg;base64,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",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 2,
    name: "Mangala/Bargi",
    description: "Smoked Mangala (Bargi) fish — rich and flavorful.",
    image_url:
      "https://images.unsplash.com/photo-1516685018646-549d4b60b8f2?auto=format&fit=crop&w=1000&q=80",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 3,
    name: "Dried Catfish",
    description: "Sun-dried catfish — ideal for stews and local dishes.",
    image_url:
      "https://www.iyalojadirect.com/wp-content/uploads/2021/03/iyaloja-direct-23.jpg",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 4,
    name: "Bonga (Shawa) Fish",
    description: "Bonga (Shawa) — well-smoked for deep umami.",
    image_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 5,
    name: "Asa Fish",
    description: "Fresh Asa fish — clean fillets, great for grilling.",
    image_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 6,
    name: "Sole Fish (Abo)",
    description: "Sole fish (Abo) — delicate white flesh.",
    image_url:
      "https://images.unsplash.com/photo-1514514955859-0f0ae2f7c9d6?auto=format&fit=crop&w=1000&q=80",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 7,
    name: "Panla",
    description: "Smoked panla — a local favorite for soups.",
    image_url:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=80",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 8,
    name: "Stockfish cutlet",
    description: "Premium stockfish cutlet — ready to cook.",
    image_url:
      "https://www.utchyglobalservices.com/wp-content/uploads/2018/05/Stockfishcut.jpg",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 9,
    name: "Shrimps",
    description: "Fresh shrimps — peeled and deveined on request.",
    image_url:
      "https://images.unsplash.com/photo-1514516953161-9a0a8a6f1b6d?auto=format&fit=crop&w=1000&q=80",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 10,
    name: "Prawns",
    description: "Large prawns — firm texture, great for grilling.",
    image_url:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 11,
    name: "Periwinkle",
    description: "Hand-picked periwinkle — traditional coastal ingredient.",
    image_url:
      "https://images.unsplash.com/photo-1533777324565-a040eb52fac2?auto=format&fit=crop&w=1000&q=80",
    category: "Seafood",
    in_stock: false,
  },

  // Natural Spices
  {
    id: 12,
    name: "Uziza",
    description: "Aromatic uziza seeds — perfect for soups and stews.",
    image_url:
      "https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 13,
    name: "Ehuru",
    description: "Ehuru (Calabash nutmeg) — adds warm, nutty notes.",
    image_url:
      "https://images.unsplash.com/photo-1516685018646-549d4b60b8f2?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 14,
    name: "Dawa Dawa",
    description: "Fermented dawa-dawa — traditional flavor enhancer.",
    image_url:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 15,
    name: "Ginger",
    description: "Fresh ginger — zesty and aromatic.",
    image_url:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 16,
    name: "Garlic",
    description: "Premium garlic bulbs — strong and fragrant.",
    image_url:
      "https://images.unsplash.com/photo-1524594154904-9c0b6d6a8a2b?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 17,
    name: "Tumeric",
    description: "Tumeric powder — vibrant color and earthy flavor.",
    image_url:
      "https://images.unsplash.com/photo-1519731922410-6b2f0b9d3f30?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 18,
    name: "Clove",
    description: "Whole cloves — rich and aromatic.",
    image_url:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 19,
    name: "White soup spices",
    description: "Blended white soup spice mix — balanced and ready-to-use.",
    image_url:
      "https://images.unsplash.com/photo-1526312426976-2aa0c58f1b0a?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 20,
    name: "Pepper soup spices",
    description: "Pepper soup spice mix — bold and aromatic.",
    image_url:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1000&q=80",
    category: "Natural Spices",
    in_stock: true,
  },

  // Vegetables & Others / Leaves / Groceries
  {
    id: 21,
    name: "Dried Afang Leaves",
    description: "Dried Afang — ready for traditional soups.",
    image_url:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 22,
    name: "Atama Leaves",
    description: "Fresh/dried Atama leaves — aromatic local greens.",
    image_url:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1000&q=80",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 23,
    name: "Editang Leaves",
    description: "Editang leaves — ideal for soups and stews.",
    image_url:
      "https://images.unsplash.com/photo-1484981184820-2e84ea0b0d4e?auto=format&fit=crop&w=1000&q=80",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 24,
    name: "Zobo Leaves",
    description: "Zobo (hibiscus) leaves — for beverages and syrups.",
    image_url:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1000&q=80",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 25,
    name: "Garri (Ijebu)",
    description: "Premium Ijebu garri — high-quality cassava flakes.",
    image_url:
      "https://images.unsplash.com/photo-1526312426976-2aa0c58f1b0a?auto=format&fit=crop&w=1000&q=80",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 26,
    name: "Yam (Ogoja)",
    description: "Ogoja yam tubers — starchy and nutritious.",
    image_url:
      "https://images.unsplash.com/photo-1543352634-1c0b1739f2c6?auto=format&fit=crop&w=1000&q=80",
    category: "Vegetables & Others",
    in_stock: true,
  },
];

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
