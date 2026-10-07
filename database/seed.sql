-- ========================================================
-- AI Powered Smart Home Design: Seed Data
-- ========================================================

USE smart_home_ai;

-- Clear existing data if needed
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE materials;
TRUNCATE TABLE smart_features;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Materials Catalog
INSERT INTO materials (category, name, brand, unit, price_min, price_max, durability, quality_grade, energy_efficiency, sustainability_rating, description) VALUES
-- Cement
('Cement', 'OPC 53 Grade High Performance Cement', 'UltraTech', 'bag (50kg)', 380, 430, 'Ultra-High', 'Premium', 'Standard', 4, 'High compressive strength ideal for structural columns, beams and foundations.'),
('Cement', 'PPC Fly-Ash Blended Eco Cement', 'Ambuja Kawach', 'bag (50kg)', 350, 395, 'High', 'Balanced', 'Eco-Certified', 5, 'Superior water repellency and crack resistance with reduced carbon footprint.'),
('Cement', 'Rapid Hardening Concrete Cement', 'ACC Concrete+', 'bag (50kg)', 410, 460, 'Ultra-High', 'Luxury', 'Standard', 4, 'Fast setting and high initial strength for multi-story residential slabs.'),

-- Steel
('Steel', 'Fe-550D TMT Corrosion Resistant Rebar', 'Tata Tiscon', 'metric ton', 62000, 68000, 'Ultra-High', 'Premium', 'Standard', 4, 'Earthquake resistant with high elongation and superior ductile properties.'),
('Steel', 'Fe-500D Primary TMT Steel Bars', 'JSW Neosteel', 'metric ton', 58000, 64000, 'High', 'Balanced', 'Standard', 4, 'Reliable core tensile reinforcement for residential columns and beams.'),

-- Bricks/Blocks
('Bricks/Blocks', 'AAC Autoclaved Aerated Lightweight Blocks', 'Magicrete', 'sq.ft wall', 48, 62, 'High', 'Balanced', 'Eco-Certified', 5, 'Exceptional thermal insulation, 3x lighter than clay bricks, saves AC energy costs up to 25%.'),
('Bricks/Blocks', 'Red Clay Wire-Cut Engineered Bricks', 'Wienerberger', 'sq.ft wall', 55, 75, 'High', 'Premium', 'Standard', 4, 'Traditional structural aesthetics with excellent compressive strength and weather resistance.'),
('Bricks/Blocks', 'Fly Ash Interlocking Eco Bricks', 'EcoBricks Pro', 'sq.ft wall', 36, 46, 'Standard', 'Economy', 'Eco-Certified', 5, 'Cost-efficient, uniform dimensions reducing mortar usage and plastering costs.'),

-- Flooring
('Flooring', 'Full Body Vitrified Large Format Tiles (4x2 ft)', 'Kajaria Eternity', 'sq.ft', 75, 140, 'High', 'Balanced', 'Standard', 4, 'Scratch-resistant, low porosity, elegant modern matte and polished finishes.'),
('Flooring', 'Italian Statuario Marble Slabs', 'Classic Marble', 'sq.ft', 350, 750, 'Ultra-High', 'Luxury', 'Standard', 3, 'Luxurious natural stone with mirror polish for master living rooms and foyers.'),
('Flooring', 'SPC Water-Resistant Engineered Wood Flooring', 'Action TESA', 'sq.ft', 110, 195, 'High', 'Premium', 'Eco-Certified', 4, 'Warm aesthetic, sound dampening, 100% waterproof stone plastic composite for bedrooms.'),
('Flooring', 'Anti-Skid Ceramic Matte Floor Tiles', 'Somany Ceramics', 'sq.ft', 45, 70, 'Standard', 'Economy', 'Standard', 4, 'High grip texture ideal for bathrooms, utility, balconies and wet areas.'),

-- Paint
('Paint', 'Royale Aspira Ultra Luxury Anti-Bacterial Interior', 'Asian Paints', 'liter', 580, 720, 'Ultra-High', 'Luxury', 'Eco-Certified', 5, 'Zero VOC, flame-retardant, Teflon surface protector with stain cleanability.'),
('Paint', 'Weathercoat Long Life PU Exterior Acrylic', 'Berger Paints', 'liter', 420, 560, 'Ultra-High', 'Premium', 'Eco-Certified', 4, 'PU-reinforced exterior protection against rain, fungal growth, and intense sun heat.'),
('Paint', 'Tractor Emulsion Washable Interior Finish', 'Asian Paints', 'liter', 190, 260, 'Standard', 'Economy', 'Standard', 4, 'Cost-effective smooth interior wall finish with washability.'),

-- Doors
('Doors', 'Engineered Teakwood Paneled Main Entrance Door', 'Greenlam Mikasa', 'unit', 18000, 35000, 'Ultra-High', 'Luxury', 'Standard', 4, 'Solid core security door with weather sealant and brass mortise locking mechanism.'),
('Doors', 'HDF Molded Flush Doors for Bedrooms', 'CenturyPly', 'unit', 5500, 9500, 'High', 'Balanced', 'Eco-Certified', 4, 'Moisture-resistant bonded flush core with wood-grain veneer finish.'),
('Doors', 'Waterproof WPC Polymer Doors for Bathrooms', 'Ecoste WPC', 'unit', 3800, 6200, 'Ultra-High', 'Balanced', 'Eco-Certified', 5, '100% termite, borer, and water proof polymer core for wet areas.'),

-- Windows
('Windows', 'UPVC Double Glazed Energy-Efficient Sliding Windows', 'Fenesta', 'sq.ft', 480, 780, 'Ultra-High', 'Premium', 'Eco-Certified', 5, 'Multi-chambered profile with Low-E double glazing; cuts noise by 40dB and heat by 30%.'),
('Windows', 'Powder Coated Anodized Aluminum 3-Track Windows', 'Jindal Aluminium', 'sq.ft', 280, 420, 'High', 'Balanced', 'Standard', 4, 'Sleek slim profile with nylon mosquito mesh track and smooth rollers.'),

-- Roofing
('Roofing', 'Solar Heat Reflective Cool Roof Tile Coating', 'Dr. Fixit / Starshield', 'sq.ft', 35, 60, 'High', 'Balanced', 'Eco-Certified', 5, 'High SRI (Solar Reflective Index) reduces roof temperature by up to 12°C.'),
('Roofing', 'Concrete Slab with APP Bituminous Waterproofing Membrane', 'Fosroc Nitoproof', 'sq.ft', 65, 110, 'Ultra-High', 'Premium', 'Standard', 4, 'Multi-layer terrace waterproofing to protect against leakage and heavy monsoons.'),

-- Electrical
('Electrical', 'FR-LSH Lead-Free Copper House Wires', 'Polycab Maxima', '100m coil', 2400, 3200, 'Ultra-High', 'Premium', 'Eco-Certified', 5, 'Flame retardant, low smoke and zero halogen emission certified copper conductors.'),
('Electrical', 'Smart Modular Touch Switches with Surge Suppressor', 'Schneider AvatarOn', 'per switch point', 250, 600, 'Ultra-High', 'Premium', 'Standard', 4, 'Sleek frameless design with built-in surge suppressor and IoT connectivity.'),
('Electrical', 'Standard Modular Switches & MCBs', 'Anchor Roma', 'per switch point', 90, 160, 'High', 'Economy', 'Standard', 4, 'Durable polycarbonate modular switches with silver cadmium oxide contacts.'),

-- Plumbing
('Plumbing', 'CPVC Lead-Free Hot & Cold Water Piping System', 'Astral Pipes', 'bundle (10ft)', 450, 750, 'Ultra-High', 'Premium', 'Eco-Certified', 5, 'NSF certified potable drinking water safe, handles high temperatures up to 93°C.'),
('Plumbing', 'UPVC Eco Drainage & Rainwater Harvest Pipes', 'Supreme Industries', 'bundle (10ft)', 380, 620, 'High', 'Balanced', 'Eco-Certified', 5, 'UV stabilized, anti-choke smooth bore piping for sewerage and stormwater.');

-- 2. Smart Home Features Catalog
INSERT INTO smart_features (category, feature_name, description, approx_price, energy_impact, icon_name) VALUES
('Lighting', 'AI Tunable CCT Smart Lighting System', 'Circadian rhythm synced smart LED downlights that adjust color temperature from warm to cool based on daylight.', 18000, 'Saves 35% lighting electricity with automatic occupancy shutoff', 'Lightbulb'),
('Security', 'AI Biometric & Video Smart Door Lock', 'Keyless entry with fingerprint, passcode, facial recognition, and smartphone remote unlocking with visitor chime camera.', 16500, 'Zero standby drain, battery lasts 12 months', 'Lock'),
('Security', '360° AI Smart Perimeter & Indoor Cameras', 'Night vision cameras with human & pet detection, 2K HDR resolution, two-way audio, and local encrypted cloud storage.', 24000, 'Low power PoE (Power over Ethernet) consumption', 'Video'),
('Climate', 'Smart Inverter HVAC & Thermostat Controller', 'Machine learning thermostat that learns family occupancy patterns, pre-cools rooms during off-peak tariff hours.', 22000, 'Reduces cooling costs by 22-28% annually', 'ThermometerSnowflake'),
('Energy', 'Rooftop Smart Solar PV with Net Metering & Battery Storage', 'Monocrystalline bifacial solar panels paired with real-time app dashboard tracking unit generation and self-consumption.', 185000, 'Generates 60-80% of total household electricity需求', 'Sun'),
('Energy', 'Whole-Home IoT Smart Energy Monitor', 'Panel-level energy meter tracking device-level wattage, peak loads, vampire draw, and billing forecast alerts.', 12500, 'Identifies inefficient appliances and reduces wastage by 15%', 'Zap'),
('Water', 'Automated Ultrasonic Water Tank & Borewell Manager', 'Automatic motor controller with anti-overflow, dry-run protection, and water consumption analytics.', 9500, 'Prevents water wastage and pump motor burnouts', 'Droplets'),
('Automation', 'Motorized Smart Curtain & Blind Actuators', 'Voice and sunlight-controlled motorized tracks that automatically close during peak afternoon heat to reduce thermal load.', 15000, 'Reduces AC cooling load by keeping solar heat out', 'Blinds'),
('Safety', 'IoT Smoke, Gas Leakage & Water Flood Sensors', 'Instant push notifications and loud acoustic siren upon detecting LPG leaks, smoke, or bathroom pipe bursts.', 8500, 'Protects property against catastrophic leaks and fires', 'ShieldAlert'),
('Hub', 'Central Edge AI Smart Home Hub (Matter & Zigbee 3.0)', 'Offline-capable central smart hub unifying lights, locks, ACs, sensors into a single unified mobile & voice dashboard.', 14000, 'Coordinates all sub-systems under 15W standby consumption', 'Cpu');
