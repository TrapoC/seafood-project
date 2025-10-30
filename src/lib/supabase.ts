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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm0o7ZPcECVITIf9M2F4lsU16-Jgk_s1fXCw&s",
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
