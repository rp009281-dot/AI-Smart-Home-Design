const { db } = require('../config/db');

const materialController = {
  async getMaterials(req, res) {
    try {
      const materials = await db.materials.getAll();
      return res.json({ success: true, count: materials.length, materials });
    } catch (err) {
      console.error('Get materials error:', err);
      return res.status(500).json({ success: false, message: 'Failed to retrieve materials catalog.' });
    }
  },

  async getSmartFeatures(req, res) {
    try {
      const features = await db.smartFeatures.getAll();
      return res.json({ success: true, count: features.length, smartFeatures: features });
    } catch (err) {
      console.error('Get smart features error:', err);
      return res.status(500).json({ success: false, message: 'Failed to retrieve smart features catalog.' });
    }
  }
};

module.exports = materialController;
