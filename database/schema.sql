-- ========================================================
-- AI Powered Smart Home Design: Insights And Future
-- Database Schema for MySQL 8.0+
-- ========================================================

CREATE DATABASE IF NOT EXISTS smart_home_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_home_ai;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(25),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    project_name VARCHAR(150) NOT NULL,
    plot_size_sqft DECIMAL(10,2) NOT NULL,
    plot_length DECIMAL(10,2) NOT NULL,
    plot_width DECIMAL(10,2) NOT NULL,
    facing_direction ENUM('North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West') DEFAULT 'East',
    budget_max DECIMAL(14,2) NOT NULL,
    floors INT DEFAULT 1,
    bedrooms INT DEFAULT 3,
    bathrooms INT DEFAULT 2,
    kitchen_type VARCHAR(50) DEFAULT 'Modular',
    living_room_type VARCHAR(50) DEFAULT 'Spacious Open-Concept',
    parking_slots INT DEFAULT 1,
    architectural_style VARCHAR(50) DEFAULT 'Modern Contemporary',
    status ENUM('draft', 'generated', 'finalized') DEFAULT 'generated',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    lifestyle_preferences JSON,
    material_preference VARCHAR(50) DEFAULT 'Balanced Durable',
    smart_features_preference JSON,
    vastu_importance ENUM('none', 'moderate', 'strict') DEFAULT 'moderate',
    energy_efficiency_level ENUM('standard', 'high', 'net_zero') DEFAULT 'high',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 4. House Designs Table
CREATE TABLE IF NOT EXISTS house_designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    tier_type ENUM('budget', 'balanced', 'premium') NOT NULL,
    design_title VARCHAR(150) NOT NULL,
    description TEXT,
    total_built_up_area DECIMAL(10,2) NOT NULL,
    carpet_area DECIMAL(10,2) NOT NULL,
    open_space_area DECIMAL(10,2) NOT NULL,
    space_utilization_pct DECIMAL(5,2) NOT NULL,
    estimated_total_cost DECIMAL(14,2) NOT NULL,
    cost_per_sqft DECIMAL(10,2) NOT NULL,
    vastu_score INT DEFAULT 85,
    energy_score INT DEFAULT 88,
    layout_data JSON NOT NULL,
    preview_3d_meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 5. Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT NOT NULL,
    room_name VARCHAR(100) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    floor_number INT DEFAULT 1,
    width_ft DECIMAL(6,2) NOT NULL,
    length_ft DECIMAL(6,2) NOT NULL,
    area_sqft DECIMAL(8,2) NOT NULL,
    vastu_direction VARCHAR(30),
    is_vastu_compliant BOOLEAN DEFAULT TRUE,
    features JSON,
    FOREIGN KEY (design_id) REFERENCES house_designs(id) ON DELETE CASCADE
);

-- 6. Cost Estimations Table
CREATE TABLE IF NOT EXISTS cost_estimations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT NOT NULL,
    total_cost DECIMAL(14,2) NOT NULL,
    cost_per_sqft DECIMAL(10,2) NOT NULL,
    material_cost DECIMAL(14,2) NOT NULL,
    labour_cost DECIMAL(14,2) NOT NULL,
    electrical_cost DECIMAL(14,2) NOT NULL,
    plumbing_cost DECIMAL(14,2) NOT NULL,
    flooring_cost DECIMAL(14,2) NOT NULL,
    painting_cost DECIMAL(14,2) NOT NULL,
    smart_home_cost DECIMAL(14,2) NOT NULL,
    finishing_cost DECIMAL(14,2) NOT NULL,
    contingency_cost DECIMAL(14,2) NOT NULL,
    breakdown_meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (design_id) REFERENCES house_designs(id) ON DELETE CASCADE
);

-- 7. Materials Catalog Table
CREATE TABLE IF NOT EXISTS materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Cement', 'Steel', 'Bricks/Blocks', 'Flooring', 'Paint', 'Doors', 'Windows', 'Roofing', 'Electrical', 'Plumbing') NOT NULL,
    name VARCHAR(120) NOT NULL,
    brand VARCHAR(100),
    unit VARCHAR(30) NOT NULL,
    price_min DECIMAL(10,2) NOT NULL,
    price_max DECIMAL(10,2) NOT NULL,
    durability ENUM('Standard', 'High', 'Ultra-High') DEFAULT 'High',
    quality_grade ENUM('Economy', 'Balanced', 'Premium', 'Luxury') DEFAULT 'Balanced',
    energy_efficiency ENUM('Standard', 'High', 'Eco-Certified') DEFAULT 'High',
    sustainability_rating INT DEFAULT 4,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Material Recommendations Table
CREATE TABLE IF NOT EXISTS material_recommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT NOT NULL,
    material_id INT NOT NULL,
    is_primary BOOLEAN DEFAULT TRUE,
    recommended_reason TEXT,
    estimated_quantity DECIMAL(10,2),
    estimated_cost DECIMAL(14,2),
    FOREIGN KEY (design_id) REFERENCES house_designs(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- 9. Smart Features Catalog Table
CREATE TABLE IF NOT EXISTS smart_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(60) NOT NULL,
    feature_name VARCHAR(120) NOT NULL,
    description TEXT,
    approx_price DECIMAL(10,2) NOT NULL,
    energy_impact VARCHAR(100),
    icon_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Saved Designs Table
CREATE TABLE IF NOT EXISTS saved_designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    design_id INT NOT NULL,
    notes TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (design_id) REFERENCES house_designs(id) ON DELETE CASCADE
);

-- 11. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'responded') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
