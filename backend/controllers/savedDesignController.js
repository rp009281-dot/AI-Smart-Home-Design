const { db } = require('../config/db');

const savedDesignController = {
  async saveDesign(req, res) {
    try {
      const userId = req.user.id;
      const { design, notes } = req.body;
      if (!design) {
        return res.status(400).json({ success: false, message: 'Design payload is required.' });
      }

      const saved = await db.savedDesigns.save({
        user_id: userId,
        design,
        notes
      });

      return res.status(201).json({
        success: true,
        message: 'Design saved successfully to your dashboard.',
        saved
      });
    } catch (err) {
      console.error('Save design error:', err);
      return res.status(500).json({ success: false, message: 'Failed to save design.' });
    }
  },

  async getUserSavedDesigns(req, res) {
    try {
      const userId = req.user.id;
      const savedList = await db.savedDesigns.findByUserId(userId);
      return res.json({ success: true, count: savedList.length, savedDesigns: savedList });
    } catch (err) {
      console.error('Get saved designs error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch saved designs.' });
    }
  },

  async deleteSavedDesign(req, res) {
    try {
      const userId = req.user.id;
      const designId = req.params.id;
      await db.savedDesigns.delete(designId, userId);
      return res.json({ success: true, message: 'Saved design removed.' });
    } catch (err) {
      console.error('Delete saved design error:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete saved design.' });
    }
  }
};

module.exports = savedDesignController;
