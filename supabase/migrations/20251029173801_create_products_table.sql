/*
  # Create Products Table for Shinung Square

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `category` (text) - Product category (Seafood, Natural Spices, Catering Services, Others)
      - `description` (text) - Product description
      - `price` (numeric) - Product price
      - `image_url` (text) - Placeholder for product image
      - `in_stock` (boolean) - Availability status
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (anyone can view products)
    - Add policies for authenticated users to manage products

  3. Initial Data
    - Insert all products listed by user across categories
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text DEFAULT '',
  price numeric DEFAULT 0,
  image_url text DEFAULT '',
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Insert seafood products
INSERT INTO products (name, category, description) VALUES
  ('Oron Crayfish', 'Seafood', 'Premium quality Oron crayfish, perfect for soups and stews'),
  ('Mangala/Bargi', 'Seafood', 'Fresh dried Mangala fish, rich in flavor'),
  ('Dried Catfish', 'Seafood', 'Premium dried catfish, perfect for traditional dishes'),
  ('Bonga (Shawa) Fish', 'Seafood', 'Traditional Bonga fish, adds authentic flavor to meals'),
  ('Asa Fish', 'Seafood', 'Quality Asa fish for your cooking needs'),
  ('Sole Fish (Abo)', 'Seafood', 'Fresh Sole fish, perfect for grilling and frying'),
  ('Panla', 'Seafood', 'Premium Panla fish for soups and stews'),
  ('Stockfish Cutlet', 'Seafood', 'High-quality stockfish cutlets'),
  ('Shrimps', 'Seafood', 'Fresh shrimps, perfect for various dishes'),
  ('Prawns', 'Seafood', 'Large premium prawns'),
  ('Periwinkle', 'Seafood', 'Fresh periwinkle for traditional dishes');

-- Insert natural spices
INSERT INTO products (name, category, description) VALUES
  ('Uziza', 'Natural Spices', 'Aromatic Uziza leaves and seeds'),
  ('Ehuru', 'Natural Spices', 'Traditional Ehuru spice (African nutmeg)'),
  ('Dawa Dawa', 'Natural Spices', 'Fermented locust beans for authentic flavor'),
  ('Ginger', 'Natural Spices', 'Fresh dried ginger root'),
  ('Garlic', 'Natural Spices', 'Premium quality garlic'),
  ('Turmeric', 'Natural Spices', 'Pure turmeric powder'),
  ('Clove', 'Natural Spices', 'Aromatic clove spice'),
  ('White Soup Spices', 'Natural Spices', 'Special blend for white soup'),
  ('Pepper Soup Spices', 'Natural Spices', 'Traditional pepper soup spice mix');

-- Insert other products
INSERT INTO products (name, category, description) VALUES
  ('Dried Afang Atama', 'Vegetables & Others', 'Premium dried Afang Atama leaves'),
  ('Editang Leaves', 'Vegetables & Others', 'Fresh dried Editang leaves'),
  ('Zobo Leaves', 'Vegetables & Others', 'Quality Zobo leaves for refreshing drinks'),
  ('Garri (Ijebu)', 'Vegetables & Others', 'Authentic Ijebu Garri'),
  ('Yam (Ogoja)', 'Vegetables & Others', 'Premium Ogoja yam');

-- Insert catering service
INSERT INTO products (name, category, description) VALUES
  ('Catering Services', 'Catering', 'Professional catering services for all events');