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
      "https://i.etsystatic.com/32805252/r/il/836445/3461367714/il_794xN.3461367714_aao4.jpg",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 2,
    name: "Mangala/Bargi",
    description: "Smoked Mangala (Bargi) fish — rich and flavorful.",
    image_url:
      "https://www.picclickimg.com/q14AAOSwoD1lVoc0/Nigerian-Mangala-Smoked-Tasty-Dried-Fish.webp",
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
      "https://africanmarketdubai.com/wp-content/uploads/2021/01/c93c565e-e9c6-467c-9858-3e7a06167610.jpg",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 5,
    name: "Asa Fish",
    description: "Fresh Asa fish — clean fillets, great for grilling.",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmSkGEWpYa5OCbLya4QSZfayF3o9Jaf3ADdg&s",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 6,
    name: "Sole Fish (Abo)",
    description: "Sole fish (Abo) — delicate white flesh.",
    image_url:
      "https://images.hive.blog/DQmNSpsHpWMd8ujtpjfg5SPYau8Mpm4HUqKpUuhBzTmYvKJ/FE6E6356-5D24-4E6F-97B5-97B9C3252834.jpeg",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 7,
    name: "Panla",
    description: "Smoked panla — a local favorite for soups.",
    image_url:
      "https://greenbasket.com.ng/wp-content/uploads/2023/12/Smoked-Fish.png",
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
      "https://www.seriouseats.com/thmb/ch4c6o15shxPyfO8jnSfUh_wQ0s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__08__09102015-grilled-lemongrass-shrimp-shaozhizhong-8-a5525792ce7a4c9693af0a564eae74a4.jpg",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 10,
    name: "Prawns",
    description: "Large prawns — firm texture, great for grilling.",
    image_url:
      "https://www.foodandwine.com/thmb/efFCylKyN5KxcnfbnFDXRj3TVAg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Garlic-Ganbak-Skillet-Spot-Prawns-with-Garlic-and-Spanish-Paprika-FT-RECIPE0823-3a33676e58674a01904a5a086604b220.jpg",
    category: "Seafood",
    in_stock: true,
  },
  {
    id: 11,
    name: "Periwinkle",
    description: "Hand-picked periwinkle — traditional coastal ingredient.",
    image_url:
      "https://c7.staticflickr.com/9/8548/29608181854_1c5fdd9fbd_c.jpg",
    category: "Seafood",
    in_stock: true,
  },

  // Natural Spices
  {
    id: 12,
    name: "Uziza",
    description: "Aromatic uziza seeds — perfect for soups and stews.",
    image_url:
      "https://mile12market.com/wp-content/uploads/2016/11/Uziza.jpg",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 13,
    name: "Ehuru",
    description: "Ehuru (Calabash nutmeg) — adds warm, nutty notes.",
    image_url:
      "https://foodieng.com/wp-content/uploads/2022/05/ehuru.png",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 14,
    name: "Dawa Dawa",
    description: "Fermented dawa-dawa — traditional flavor enhancer.",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Dawa_a_tsabobinta.jpg",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 15,
    name: "Ginger",
    description: "Fresh ginger — zesty and aromatic.",
    image_url:
      "https://files.nccih.nih.gov/ginger-thinkstockphotos-531052216-square.jpg",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 16,
    name: "Garlic",
    description: "Premium garlic bulbs — strong and fragrant.",
    image_url:
      "https://mile12market.com/wp-content/uploads/2014/12/mile12_market_online_garlic.png",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 17,
    name: "Tumeric",
    description: "Tumeric powder — vibrant color and earthy flavor.",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/170201133809-turmeric-stock.jpg?q=x_2,y_62,h_1228,w_2182,c_crop/h_833,w_1480",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 18,
    name: "Clove",
    description: "Whole cloves — rich and aromatic.",
    image_url:
      "https://www.naturadoriente.com/13010-large_default/whole-cloves.jpg",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 19,
    name: "White soup spices",
    description: "Blended white soup spice mix — balanced and ready-to-use.",
    image_url:
      "https://adalinelagos.com/wp-content/uploads/2023/10/New-Project-40.jpg",
    category: "Natural Spices",
    in_stock: true,
  },
  {
    id: 20,
    name: "Pepper soup spices",
    description: "Pepper soup spice mix — bold and aromatic.",
    image_url:
      "https://247foods.ng/wp-content/uploads/2025/03/Pepper-Soup-Spice-Half-Paint.png",
    category: "Natural Spices",
    in_stock: true,
  },

  // Vegetables & Others / Leaves / Groceries
  {
    id: 21,
    name: "Dried Afang Leaves",
    description: "Dried Afang — ready for traditional soups.",
    image_url:
      "https://shopafricausa.com/cdn/shop/files/WhatsApp-Image-2021-06-08-at-08.15.08-1_1200x1200.jpg?v=1745862327",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 22,
    name: "Atama Leaves",
    description: "Fresh/dried Atama leaves — aromatic local greens.",
    image_url:
      "https://www.pricepally.com/_next/image?url=https%3A%2F%2Fpp-new-node-medusa-prod-bucket.s3.us-east-1.amazonaws.com%2FAtama%20Leaves%20General(1)-1724766020081.jpg&w=3840&q=75",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 23,
    name: "Editang Leaves",
    description: "Editang leaves — ideal for soups and stews.",
    image_url:
      "https://www.pricepally.com/_next/image?url=https%3A%2F%2Fpp-new-node-medusa-prod-bucket.s3.us-east-1.amazonaws.com%2Feditan%20leaves-1719044733552.jpg&w=3840&q=75",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 24,
    name: "Zobo Leaves",
    description: "Zobo (hibiscus) leaves — for beverages and syrups.",
    image_url:
      "https://mile12market.com/wp-content/uploads/2014/12/mile12_market_online_hibiscus_leaves_zobo.png",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 25,
    name: "Garri (Ijebu)",
    description: "Premium Ijebu garri — high-quality cassava flakes.",
    image_url:
      "https://www.ampflexi.com/wp-content/uploads/2023/02/FEB342E8-D837-49B9-812D-1D61756FA55B.png",
    category: "Vegetables & Others",
    in_stock: true,
  },
  {
    id: 26,
    name: "Yam (Ogoja)",
    description: "Ogoja yam tubers — starchy and nutritious.",
    image_url:
      "https://www.pricepally.com/_next/image?url=https%3A%2F%2Fpp-new-node-medusa-prod-bucket.s3.us-east-1.amazonaws.com%2FYam%20-%20mumuyi%20general-1724942140744-1737166620171.jpg&w=3840&q=75",
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
