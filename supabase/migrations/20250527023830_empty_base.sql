/*
  # Initial Data Migration

  1. Data Population
    - Insert sample users if they don't exist
    - Insert properties with proper UUIDs
    - Insert property images
    - Insert yield data
    
  2. Data Relationships
    - Properties are linked to users
    - Images and yield data are linked to properties
*/

-- Insert sample users if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'agent@mangolands.com') THEN
    INSERT INTO users (id, email, full_name, role) VALUES
      ('d0d8aa1a-b1b0-4a4a-8c83-5c599b5aa5f3', 'agent@mangolands.com', 'John Agent', 'agent');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'seller@mangolands.com') THEN
    INSERT INTO users (id, email, full_name, role) VALUES
      ('e89f35d9-6c1c-4a1c-8d3c-3d5c2e2a7b8f', 'seller@mangolands.com', 'Mary Seller', 'seller');
  END IF;
END $$;

-- Insert properties
INSERT INTO properties (
  id, title, description, price, size, location, address, 
  latitude, longitude, type, status, features, amenities, 
  featured, owner_id, created_at, updated_at
) VALUES
  (
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'Premium Alphonso Mango Farm',
    'A well-established 25-acre Alphonso mango farm with 500+ mature trees producing premium quality mangoes. The property includes irrigation infrastructure, farm equipment, and a small office. Perfect for commercial mango production with existing export connections.',
    750000,
    25,
    'Maharashtra, India',
    '123 Farm Road, Ratnagiri, Maharashtra, India',
    16.9942,
    73.3126,
    'mango-farm',
    'For Sale',
    ARRAY['500+ mature mango trees', 'Drip irrigation system', 'Water reservoir', 'Farm equipment included', 'Organic certification'],
    ARRAY['Farm office', 'Storage facility', 'Worker housing', 'Electricity connection', 'Boundary wall'],
    true,
    'd0d8aa1a-b1b0-4a4a-8c83-5c599b5aa5f3',
    '2023-09-15T00:00:00Z',
    '2023-10-05T00:00:00Z'
  ),
  (
    'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    'Fertile Agricultural Land with Mango Potential',
    'Prime agricultural land with fertile soil perfect for mango cultivation. This 15-acre property is located in a region known for high-quality mango production. The land includes a water source and has road access, making it an excellent investment opportunity.',
    350000,
    15,
    'Andhra Pradesh, India',
    '456 Rural Highway, Vijayawada, Andhra Pradesh, India',
    16.5062,
    80.6480,
    'agricultural-land',
    'For Sale',
    ARRAY['Fertile soil', 'Natural water source', 'Road access', 'Electricity available', 'Flat terrain'],
    ARRAY['Good rainfall region', 'Nearby village', 'Agricultural support services'],
    true,
    'd0d8aa1a-b1b0-4a4a-8c83-5c599b5aa5f3',
    '2023-08-20T00:00:00Z',
    '2023-09-15T00:00:00Z'
  ),
  (
    'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    'Exclusive Mango Estate with Luxury Farmhouse',
    'A stunning 40-acre mango estate featuring a modern 4-bedroom farmhouse. This premium property includes established mango orchards with multiple premium varieties, advanced irrigation systems, and beautiful landscaped gardens. An ideal combination of luxury living and commercial agriculture.',
    1250000,
    40,
    'Gujarat, India',
    '789 Estate Drive, Valsad, Gujarat, India',
    20.5932,
    72.9342,
    'farm-house',
    'For Sale',
    ARRAY['Luxury 4-bedroom farmhouse', '800+ mango trees of multiple varieties', 'Modern drip irrigation', 'Swimming pool', 'Landscaped gardens', 'Solar power system'],
    ARRAY['Gated property', 'Caretaker residence', 'Equipment storage', 'High-speed internet', 'Security system'],
    true,
    'd0d8aa1a-b1b0-4a4a-8c83-5c599b5aa5f3',
    '2023-07-10T00:00:00Z',
    '2023-09-22T00:00:00Z'
  ),
  (
    'f47ac10b-58cc-4372-a567-0e02b2c3d482',
    'Commercial Mango Processing Plot',
    'Strategic 5-acre commercial plot ideal for mango processing facility. Located near major mango production regions with excellent transportation links. All utilities available and zoned for agricultural processing. Perfect for setting up a mango processing, packaging, or export business.',
    280000,
    5,
    'Uttar Pradesh, India',
    '101 Industrial Area, Lucknow, Uttar Pradesh, India',
    26.8467,
    80.9462,
    'commercial-plot',
    'For Sale',
    ARRAY['Commercial zoning', 'All utilities connected', 'Highway access', 'Level terrain', 'Strategic location near farms'],
    ARRAY['Industrial area benefits', 'Labor availability', 'Transportation links', 'Government incentives eligible'],
    false,
    'd0d8aa1a-b1b0-4a4a-8c83-5c599b5aa5f3',
    '2023-08-05T00:00:00Z',
    '2023-09-12T00:00:00Z'
  ),
  (
    'f47ac10b-58cc-4372-a567-0e02b2c3d483',
    'Investment Mango Orchard Package',
    'Turnkey investment opportunity with multiple mango orchards totaling 60 acres. These established farms are currently producing income with a professional management team in place. Excellent ROI potential with established distribution channels and export connections.',
    1800000,
    60,
    'Karnataka, India',
    '222 Investor Road, Bangalore Rural, Karnataka, India',
    13.0022,
    77.5569,
    'investment-plot',
    'For Sale',
    ARRAY['Professionally managed', 'Multiple orchards package', 'Established income stream', 'Premium varieties', 'Export connections'],
    ARRAY['Management facilities', 'Processing center', 'Cold storage', 'Staff quarters'],
    true,
    'd0d8aa1a-b1b0-4a4a-8c83-5c599b5aa5f3',
    '2023-06-28T00:00:00Z',
    '2023-09-30T00:00:00Z'
  ),
  (
    'f47ac10b-58cc-4372-a567-0e02b2c3d484',
    'Young Mango Plantation with Growth Potential',
    'An emerging 20-acre mango plantation with 3-year-old trees of premium varieties. This property offers excellent growth potential as the trees mature. Includes irrigation infrastructure and basic facilities. Ideal for long-term agricultural investment with increasing returns.',
    420000,
    20,
    'Tamil Nadu, India',
    '333 Growth Avenue, Salem, Tamil Nadu, India',
    11.6643,
    78.1460,
    'mango-farm',
    'For Sale',
    ARRAY['Young plantation (3 years old)', '400+ trees of premium varieties', 'Drip irrigation installed', 'Fertile soil', 'Growth potential'],
    ARRAY['Basic storage facility', 'Caretaker hut', 'Bore well', 'Farm tools included'],
    false,
    'd0d8aa1a-b1b0-4a4a-8c83-5c599b5aa5f3',
    '2023-08-15T00:00:00Z',
    '2023-09-10T00:00:00Z'
  );

-- Insert property images
INSERT INTO property_images (property_id, url, position) VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg', 0),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'https://images.pexels.com/photos/5561519/pexels-photo-5561519.jpeg', 1),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'https://images.pexels.com/photos/158028/belgrade-serbia-fruits-market-158028.jpeg', 2),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'https://images.pexels.com/photos/8353801/pexels-photo-8353801.jpeg', 3),
  
  ('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg', 0),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'https://images.pexels.com/photos/175370/pexels-photo-175370.jpeg', 1),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg', 2),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg', 3),
  
  ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 0),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'https://images.pexels.com/photos/7174114/pexels-photo-7174114.jpeg', 1),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg', 2),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg', 3),
  
  ('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'https://images.pexels.com/photos/3855622/pexels-photo-3855622.jpeg', 0),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg', 1),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg', 2),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'https://images.pexels.com/photos/1129371/pexels-photo-1129371.jpeg', 3),
  
  ('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'https://images.pexels.com/photos/3493583/pexels-photo-3493583.jpeg', 0),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg', 1),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'https://images.pexels.com/photos/3629537/pexels-photo-3629537.jpeg', 2),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'https://images.pexels.com/photos/5331303/pexels-photo-5331303.jpeg', 3),
  
  ('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'https://images.pexels.com/photos/4750273/pexels-photo-4750273.jpeg', 0),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg', 1),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'https://images.pexels.com/photos/639105/pexels-photo-639105.jpeg', 2),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'https://images.pexels.com/photos/421797/pexels-photo-421797.jpeg', 3);

-- Insert yield data
INSERT INTO yield_data (property_id, estimated_yield, varieties_grown, harvest_season) VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 3.5, ARRAY['Alphonso', 'Kesar'], 'April to June'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 4.2, ARRAY['Kesar', 'Alphonso', 'Banganapalli', 'Dasheri'], 'March to July'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d483', 3.8, ARRAY['Banganapalli', 'Mallika', 'Alphonso', 'Totapuri'], 'March to August'),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d484', 1.5, ARRAY['Alphonso', 'Banganapalli', 'Neelam'], 'April to July');