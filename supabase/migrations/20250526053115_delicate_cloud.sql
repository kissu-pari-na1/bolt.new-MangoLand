/*
  # Initial Schema for Mango Lands Property Website

  1. New Tables
    - `users` - Store user profiles
      - `id` (uuid, primary key) - Links to auth.users
      - `email` (text) - User's email
      - `full_name` (text) - User's full name
      - `phone` (text) - User's phone number
      - `role` (text) - User's role (buyer, seller, agent)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `properties` - Store property listings
      - `id` (uuid, primary key)
      - `title` (text) - Property title
      - `description` (text) - Property description
      - `price` (numeric) - Property price
      - `size` (numeric) - Size in acres
      - `location` (text) - Location name
      - `address` (text) - Full address
      - `latitude` (numeric) - Coordinates
      - `longitude` (numeric) - Coordinates
      - `type` (text) - Property type
      - `status` (text) - Sale status
      - `features` (text[]) - Array of features
      - `amenities` (text[]) - Array of amenities
      - `featured` (boolean) - Featured property flag
      - `owner_id` (uuid) - Reference to users
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `property_images` - Store property images
      - `id` (uuid, primary key)
      - `property_id` (uuid) - Reference to properties
      - `url` (text) - Image URL
      - `position` (integer) - Display order
      - `created_at` (timestamptz)

    - `yield_data` - Store mango farm yield information
      - `id` (uuid, primary key)
      - `property_id` (uuid) - Reference to properties
      - `estimated_yield` (numeric) - Tons per acre
      - `varieties_grown` (text[]) - Array of mango varieties
      - `harvest_season` (text) - Harvest period
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `inquiries` - Store property inquiries
      - `id` (uuid, primary key)
      - `property_id` (uuid) - Reference to properties
      - `user_id` (uuid) - Reference to users
      - `name` (text) - Inquirer's name
      - `email` (text) - Inquirer's email
      - `phone` (text) - Inquirer's phone
      - `message` (text) - Inquiry message
      - `status` (text) - Inquiry status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `favorites` - Store user's favorite properties
      - `id` (uuid, primary key)
      - `user_id` (uuid) - Reference to users
      - `property_id` (uuid) - Reference to properties
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Properties: Public read, authenticated create/update
      - Users: Authenticated read, own profile update
      - Inquiries: Authenticated create, owner/agent read
      - Favorites: Authenticated CRUD for own records
      - Images: Public read, authenticated create
      - Yield Data: Public read, authenticated create/update

  3. Indexes
    - Properties: type, status, price, size, location
    - Users: email
    - Inquiries: status
    - Property Images: property_id, position
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  role text NOT NULL DEFAULT 'buyer',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('buyer', 'seller', 'agent'))
);

-- Create properties table
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  size numeric NOT NULL CHECK (size > 0),
  location text NOT NULL,
  address text,
  latitude numeric,
  longitude numeric,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'For Sale',
  features text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  owner_id uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_type CHECK (type IN ('mango-farm', 'agricultural-land', 'commercial-plot', 'farm-house', 'investment-plot')),
  CONSTRAINT valid_status CHECK (status IN ('For Sale', 'Sold', 'Under Contract'))
);

-- Create property_images table
CREATE TABLE property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create yield_data table
CREATE TABLE yield_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  estimated_yield numeric CHECK (estimated_yield >= 0),
  varieties_grown text[] DEFAULT '{}',
  harvest_season text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create inquiries table
CREATE TABLE inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'contacted', 'closed'))
);

-- Create favorites table
CREATE TABLE favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Create indexes
CREATE INDEX properties_type_idx ON properties(type);
CREATE INDEX properties_status_idx ON properties(status);
CREATE INDEX properties_price_idx ON properties(price);
CREATE INDEX properties_size_idx ON properties(size);
CREATE INDEX properties_location_idx ON properties(location);
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX inquiries_status_idx ON inquiries(status);
CREATE INDEX property_images_property_position_idx ON property_images(property_id, position);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE yield_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Properties policies
CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can create properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Property images policies
CREATE POLICY "Anyone can view property images"
  ON property_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Property owners can manage images"
  ON property_images FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM properties
    WHERE id = property_images.property_id
    AND owner_id = auth.uid()
  ));

-- Yield data policies
CREATE POLICY "Anyone can view yield data"
  ON yield_data FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Property owners can manage yield data"
  ON yield_data FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM properties
    WHERE id = yield_data.property_id
    AND owner_id = auth.uid()
  ));

-- Inquiries policies
CREATE POLICY "Users can create inquiries"
  ON inquiries FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM properties
      WHERE id = inquiries.property_id
      AND owner_id = auth.uid()
    )
  );

-- Favorites policies
CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());