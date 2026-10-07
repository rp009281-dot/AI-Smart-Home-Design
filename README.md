# AI Powered Smart Home Design: Insights And Future

> A full-stack, AI-driven architectural planning, spatial optimization, cost forecasting, and smart home automation platform.

---

## 🌟 Project Purpose & Problem Statement

### Purpose
The platform bridges the divide between non-technical homeowners and the complex world of residential civil architecture. By leveraging parametric intelligence and structural estimation algorithms, users can configure, visualize, and budget their dream home without architectural friction.

### Problem Statement
Prospective homeowners face significant hurdles:
- **Lack of technical knowledge**: Understanding Floor Area Ratio (FAR), setback rules, and spatial zoning.
- **Architectural dependence**: Lengthy turnaround times and expensive consultancy fees for early iterations.
- **Cost opacity**: Construction budget overruns (often 20–35%) due to unpredictable material inflation and hidden contractor markups.
- **Inefficient space utilization**: Cramped rooms and wasted corridors from generic layouts.
- **Fragmented tools**: No single platform unites 2D CAD layout generation, 3D WebGL visualization, itemized cost estimation, Vastu directional analysis, and smart IoT automation.

---

## 🚀 Key Features

### 1. 🤖 AI House Design Generator
- Generates 3 personalized design variations: **Budget Design**, **Balanced Design (Recommended)**, and **Premium Design**.
- Adapts to plot dimensions (length × width), number of floors, bedrooms, bathrooms, and parking requirements.
- Calculates exact plot coverage, carpet area, and circulation balance.

### 2. 📐 Interactive 2D Floor Plan
- Architectural 2D visual layout with zoom, pan, and room inspection.
- Color-coded zones: Living Lounge, Bedrooms, Kitchen (Agni), Dining, Bathrooms, Covered Parking, and Lawn Garden.
- Door swing representations, room dimension markers, and Vastu orientation tags.

### 3. 🏡 Real-Time 3D Home Visualizer (Three.js)
- 3D isometric house rendering with orbital rotation and mouse zoom controls.
- **Daylight & Night Mode** with realistic atmospheric lighting and warm interior window glow.
- **Roof Toggle** allowing users to inspect interior room partitions vs. the outer facade.
- Real-time rooftop solar PV panel array visualization.

### 4. 💰 Itemized Construction Cost Estimator
- Dynamic cost calculation formula:
  $$\text{Total Cost} = \text{Built-Up Area} \times \text{Effective Rate} + \text{Smart Tech Ecosystem} + \text{Contingency}$$
- Clear breakdown cards and Recharts donut distribution:
  - Structural Materials (Cement, Steel, Bricks, Sand) — ~50%
  - Civil & Skilled Labour — ~26%
  - Electrical Wiring & Conduits — ~7%
  - Plumbing & Sanitary Lines — ~6%
  - Flooring, Tiling & Painting Finishes — ~9%
  - Smart Home Automation & IoT Ecosystem
  - Contingency Reserve Buffer (2%)
- Approximate cost per sq.ft. benchmarked against current regional indices.

### 5. 🧱 Material Recommendation Engine
- Catalog of verified civil materials across 10 categories: **Cement, Steel, Bricks/Blocks, Flooring, Paint, Doors, Windows, Roofing, Electrical, and Plumbing**.
- Displays price ranges, durability grades, eco-ratings, and technical rationale for each recommendation.

### 6. ⚡ Smart Home Automation Ecosystem
- Comprehensive IoT device planning:
  - AI CCT Circadian tunable smart lighting
  - Biometric facial recognition video locks
  - 360° perimeter security cameras
  - Machine learning setback HVAC / AC controllers
  - Rooftop solar PV with net metering
  - Ultrasonic overhead water tank & borewell manager
  - Central Matter & Zigbee 3.0 edge automation hub

### 7. ☀️ Energy Efficiency Analysis
- Energy efficiency scoring (0–100 scale) and rating badge (Net-Zero Ready A+).
- Recommended rooftop solar PV capacity in kW, annual kWh generation estimate, and annual CO₂ reduction in metric tons.
- Passive daylighting and natural cross-ventilation orientation suggestions.

### 8. 🧭 Computational Vastu Shastra Checker
- Quadrant directional audit based on plot facing (East, North, West, South, etc.).
- Evaluates elemental placement: Agni (South-East) for Kitchen, Nairutya (South-West) for Master Bedroom, and Ishanya (North-East) for open garden/water.
- Highlights positive alignments and practical corrective remedies with design assistance disclaimer.

### 9. 📊 Space Optimization Analysis
- Breakdown of Total Plot Area, Ground Built-Up, Carpet Area, Parking Area, and Open Garden.
- Space utilization percentage gauge with concrete spatial efficiency tips.

### 10. 📑 PDF Architectural Brief Export
- Generates a downloadable, formatted PDF report containing design parameters, room dimensions, itemized costs, and material lists.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, Recharts, Three.js, jsPDF, Canvas Confetti |
| **Backend** | Node.js, Express.js, JWT Authentication, bcryptjs, CORS, dotenv |
| **Database** | MySQL 8.0+ (with resilient embedded local JSON/file database dual-mode fallback) |

---

## 📂 Project Structure

```
smart-home-design/
│
├── frontend/                     # React + Vite + Tailwind CSS Application
│   ├── src/
│   │   ├── components/
│   │   │   └── design/           # FloorPlanCanvas, HomePreview3D, DesignComparisonModal
│   │   ├── context/              # AuthContext, DesignContext
│   │   ├── layouts/              # Navbar, Footer
│   │   ├── pages/                # Home, About, Planner, Results, CostEstimation, Materials, Dashboard, Contact, Login, Register
│   │   ├── services/             # api.js
│   │   ├── utils/                # pdfExport.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                      # Express.js REST API
│   ├── config/                   # db.js (MySQL pool + automatic local fallback)
│   ├── controllers/              # authController, projectController, aiController, materialController, contactController, savedDesignController
│   ├── middleware/               # authMiddleware, errorHandler
│   ├── routes/                   # authRoutes, projectRoutes, aiRoutes, materialRoutes, contactRoutes, savedDesignRoutes
│   ├── services/                 # aiDesignEngine, costEstimationService
│   ├── utils/                    # seedData.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── database/
│   ├── schema.sql                # Complete MySQL DDL for all 11 tables
│   ├── seed.sql                  # Baseline material rates and IoT devices
│   └── local_db.json             # Local persistent database store
│
├── README.md
├── package.json
└── .env.example
```

---

## ⚡ Quick Start & Setup Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (v24.x supported)
- **npm**: v9.0.0 or later
- **MySQL Server** (Optional: the backend automatically uses its local persistent engine if MySQL credentials are not provided)

---

### 2. Configure Environment (`.env`)

In `backend/.env`:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=super_secret_ai_smart_home_jwt_key_2026_x89a

# MySQL Settings (Optional: update with your MySQL root password if running local MySQL80)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smart_home_ai
```

---

### 3. Run the Backend API

Open a terminal:
```bash
cd backend
npm install
npm start
```
The server will start on: **`http://localhost:5000`**  
Health check: **`http://localhost:5000/api/health`**

---

### 4. Run the Frontend Client

Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
The client will open on: **`http://localhost:5173`**

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Sign in & receive JWT token | Public |
| `GET` | `/api/auth/profile` | Retrieve authenticated profile | Bearer Token |
| `POST` | `/api/ai/generate-design` | Generate 3 house design tiers | Public / Optional |
| `POST` | `/api/ai/estimate-cost` | Calculate dynamic cost estimate | Public |
| `GET` | `/api/materials` | Retrieve materials catalog | Public |
| `GET` | `/api/smart-features` | Retrieve IoT devices catalog | Public |
| `POST` | `/api/projects` | Save or create user project | Optional |
| `GET` | `/api/projects` | Get user projects | Bearer Token |
| `POST` | `/api/saved-designs` | Save design to dashboard portfolio | Bearer Token |
| `GET` | `/api/saved-designs` | Get user's saved designs | Bearer Token |
| `DELETE` | `/api/saved-designs/:id`| Remove a saved design | Bearer Token |
| `POST` | `/api/contact` | Submit inquiry / contact message | Public |

---

## 🛡️ License & Credits
Developed as an advanced full-stack architectural AI prototype. Built with React, Three.js, Node.js, and MySQL.
