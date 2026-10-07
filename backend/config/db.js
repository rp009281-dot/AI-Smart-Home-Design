const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const { defaultMaterials, defaultSmartFeatures } = require('../utils/seedData');

let pool = null;
let isUsingFallback = false;

// Local JSON fallback store path
const localDbPath = path.join(__dirname, '..', '..', 'database', 'local_db.json');

function initLocalStore() {
  if (!fs.existsSync(localDbPath)) {
    const initialData = {
      users: [],
      projects: [],
      user_preferences: [],
      house_designs: [],
      rooms: [],
      cost_estimations: [],
      materials: defaultMaterials,
      material_recommendations: [],
      smart_features: defaultSmartFeatures,
      saved_designs: [],
      contact_messages: []
    };
    fs.mkdirSync(path.dirname(localDbPath), { recursive: true });
    fs.writeFileSync(localDbPath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function getLocalStore() {
  initLocalStore();
  try {
    const raw = fs.readFileSync(localDbPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local_db.json, resetting:', err);
    initLocalStore();
    return JSON.parse(fs.readFileSync(localDbPath, 'utf-8'));
  }
}

function saveLocalStore(data) {
  try {
    fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving local_db.json:', err);
  }
}

async function initDatabase() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const port = process.env.DB_PORT || 3306;
  const database = process.env.DB_NAME || 'smart_home_ai';

  try {
    console.log(`[DB] Attempting connection to MySQL at ${host}:${port} as ${user}...`);
    // First connect without specifying database to create it if needed
    const rootConnection = await mysql.createConnection({
      host,
      user,
      password,
      port,
      connectTimeout: 3000
    });

    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConnection.end();

    // Now establish pool with database
    pool = mysql.createPool({
      host,
      user,
      password,
      port,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log(`[DB] Successfully connected to MySQL database: ${database}`);

    // Read schema.sql and create tables
    const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
      const statements = schemaSql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.toLowerCase().startsWith('create database') && !s.toLowerCase().startsWith('use '));

      for (const statement of statements) {
        try {
          await connection.query(statement);
        } catch (stmtErr) {
          // Ignore table already exists warnings
        }
      }
      console.log('[DB] MySQL schema verified.');
    }

    // Check if materials table has rows, if not, seed it
    const [matRows] = await connection.query('SELECT COUNT(*) as cnt FROM materials');
    if (matRows[0].cnt === 0) {
      console.log('[DB] Seeding baseline materials into MySQL...');
      for (const m of defaultMaterials) {
        await connection.query(
          `INSERT INTO materials (category, name, brand, unit, price_min, price_max, durability, quality_grade, energy_efficiency, sustainability_rating, description)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [m.category, m.name, m.brand, m.unit, m.price_min, m.price_max, m.durability, m.quality_grade, m.energy_efficiency, m.sustainability_rating, m.description]
        );
      }
    }

    const [smartRows] = await connection.query('SELECT COUNT(*) as cnt FROM smart_features');
    if (smartRows[0].cnt === 0) {
      console.log('[DB] Seeding baseline smart features into MySQL...');
      for (const s of defaultSmartFeatures) {
        await connection.query(
          `INSERT INTO smart_features (category, feature_name, description, approx_price, energy_impact, icon_name)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [s.category, s.feature_name, s.description, s.approx_price, s.energy_impact, s.icon_name]
        );
      }
    }

    connection.release();
    isUsingFallback = false;
    return;
  } catch (err) {
    console.warn(`[DB] Notice: MySQL is not accessible (${err.message}).`);
    console.warn('[DB] Switching to persistent local JSON database fallback.');
    console.warn('[DB] To connect to MySQL later, set DB_PASSWORD in backend/.env.');
    initLocalStore();
    isUsingFallback = true;
  }
}

// Universal database helper interface
const db = {
  isFallback: () => isUsingFallback,

  async query(sql, params = []) {
    if (!isUsingFallback && pool) {
      const [rows] = await pool.query(sql, params);
      return rows;
    }
    // Fallback handler
    return [];
  },

  // Specialized repositories for robust, multi-mode execution
  users: {
    async findByEmail(email) {
      if (!isUsingFallback && pool) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0] || null;
      }
      const store = getLocalStore();
      return store.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    },
    async findById(id) {
      if (!isUsingFallback && pool) {
        const [rows] = await pool.query('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?', [id]);
        return rows[0] || null;
      }
      const store = getLocalStore();
      const user = store.users.find(u => u.id === Number(id));
      if (!user) return null;
      const { password_hash, ...rest } = user;
      return rest;
    },
    async create({ name, email, password_hash, phone }) {
      if (!isUsingFallback && pool) {
        const [res] = await pool.query(
          'INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)',
          [name, email, password_hash, phone || null]
        );
        return { id: res.insertId, name, email, phone, role: 'user' };
      }
      const store = getLocalStore();
      const id = (store.users.length > 0 ? Math.max(...store.users.map(u => u.id)) : 0) + 1;
      const newUser = {
        id,
        name,
        email,
        password_hash,
        phone: phone || null,
        role: 'user',
        created_at: new Date().toISOString()
      };
      store.users.push(newUser);
      saveLocalStore(store);
      const { password_hash: _, ...safeUser } = newUser;
      return safeUser;
    }
  },

  projects: {
    async create(projectData) {
      const {
        user_id,
        project_name,
        plot_size_sqft,
        plot_length,
        plot_width,
        facing_direction,
        budget_max,
        floors,
        bedrooms,
        bathrooms,
        kitchen_type,
        living_room_type,
        parking_slots,
        architectural_style,
        lifestyle_preferences,
        material_preference,
        smart_features_preference,
        vastu_importance,
        energy_efficiency_level
      } = projectData;

      if (!isUsingFallback && pool) {
        const [projRes] = await pool.query(
          `INSERT INTO projects (user_id, project_name, plot_size_sqft, plot_length, plot_width, facing_direction, budget_max, floors, bedrooms, bathrooms, kitchen_type, living_room_type, parking_slots, architectural_style)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            user_id || null,
            project_name || 'My Smart Home Design',
            plot_size_sqft,
            plot_length,
            plot_width,
            facing_direction || 'East',
            budget_max,
            floors || 1,
            bedrooms || 3,
            bathrooms || 2,
            kitchen_type || 'Modular',
            living_room_type || 'Open-Concept',
            parking_slots || 1,
            architectural_style || 'Modern Contemporary'
          ]
        );
        const projectId = projRes.insertId;

        await pool.query(
          `INSERT INTO user_preferences (project_id, lifestyle_preferences, material_preference, smart_features_preference, vastu_importance, energy_efficiency_level)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            projectId,
            JSON.stringify(lifestyle_preferences || {}),
            material_preference || 'Balanced',
            JSON.stringify(smart_features_preference || []),
            vastu_importance || 'moderate',
            energy_efficiency_level || 'high'
          ]
        );

        return { id: projectId, ...projectData };
      }

      const store = getLocalStore();
      const id = (store.projects.length > 0 ? Math.max(...store.projects.map(p => p.id)) : 0) + 1;
      const newProject = {
        id,
        ...projectData,
        created_at: new Date().toISOString()
      };
      store.projects.push(newProject);
      saveLocalStore(store);
      return newProject;
    },

    async findByUserId(userId) {
      if (!isUsingFallback && pool) {
        const [rows] = await pool.query('SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        return rows;
      }
      const store = getLocalStore();
      return store.projects.filter(p => Number(p.user_id) === Number(userId));
    },

    async findById(id) {
      if (!isUsingFallback && pool) {
        const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
        return rows[0] || null;
      }
      const store = getLocalStore();
      return store.projects.find(p => p.id === Number(id)) || null;
    },

    async delete(id) {
      if (!isUsingFallback && pool) {
        await pool.query('DELETE FROM projects WHERE id = ?', [id]);
        return true;
      }
      const store = getLocalStore();
      store.projects = store.projects.filter(p => p.id !== Number(id));
      saveLocalStore(store);
      return true;
    }
  },

  materials: {
    async getAll() {
      if (!isUsingFallback && pool) {
        const [rows] = await pool.query('SELECT * FROM materials ORDER BY category, quality_grade');
        return rows;
      }
      const store = getLocalStore();
      return store.materials || defaultMaterials;
    }
  },

  smartFeatures: {
    async getAll() {
      if (!isUsingFallback && pool) {
        const [rows] = await pool.query('SELECT * FROM smart_features ORDER BY category');
        return rows;
      }
      const store = getLocalStore();
      return store.smart_features || defaultSmartFeatures;
    }
  },

  savedDesigns: {
    async save({ user_id, design, notes }) {
      if (!isUsingFallback && pool) {
        const [res] = await pool.query(
          `INSERT INTO saved_designs (user_id, design_id, notes, is_favorite)
           VALUES (?, ?, ?, 1)`,
          [user_id, design.id || 1, notes || '']
        );
        return { id: res.insertId, user_id, design, notes, saved_at: new Date().toISOString() };
      }
      const store = getLocalStore();
      if (!store.saved_designs) store.saved_designs = [];
      const id = (store.saved_designs.length > 0 ? Math.max(...store.saved_designs.map(s => s.id)) : 0) + 1;
      const newSaved = {
        id,
        user_id: Number(user_id),
        design,
        notes: notes || '',
        is_favorite: true,
        saved_at: new Date().toISOString()
      };
      store.saved_designs.push(newSaved);
      saveLocalStore(store);
      return newSaved;
    },

    async findByUserId(userId) {
      if (!isUsingFallback && pool) {
        // Query saved designs
        const [rows] = await pool.query(
          `SELECT sd.*, hd.design_title, hd.tier_type, hd.estimated_total_cost, hd.total_built_up_area
           FROM saved_designs sd
           LEFT JOIN house_designs hd ON sd.design_id = hd.id
           WHERE sd.user_id = ?
           ORDER BY sd.saved_at DESC`,
          [userId]
        );
        return rows;
      }
      const store = getLocalStore();
      return (store.saved_designs || []).filter(s => Number(s.user_id) === Number(userId));
    },

    async delete(id, userId) {
      if (!isUsingFallback && pool) {
        await pool.query('DELETE FROM saved_designs WHERE id = ? AND user_id = ?', [id, userId]);
        return true;
      }
      const store = getLocalStore();
      if (!store.saved_designs) return true;
      store.saved_designs = store.saved_designs.filter(s => !(s.id === Number(id) && Number(s.user_id) === Number(userId)));
      saveLocalStore(store);
      return true;
    }
  },

  contact: {
    async create({ name, email, phone, message }) {
      if (!isUsingFallback && pool) {
        const [res] = await pool.query(
          'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
          [name, email, phone || null, message]
        );
        return { id: res.insertId, name, email, phone, message, created_at: new Date().toISOString() };
      }
      const store = getLocalStore();
      if (!store.contact_messages) store.contact_messages = [];
      const id = (store.contact_messages.length > 0 ? Math.max(...store.contact_messages.map(m => m.id)) : 0) + 1;
      const msg = {
        id,
        name,
        email,
        phone: phone || null,
        message,
        status: 'new',
        created_at: new Date().toISOString()
      };
      store.contact_messages.push(msg);
      saveLocalStore(store);
      return msg;
    }
  }
};

module.exports = {
  db,
  initDatabase
};
