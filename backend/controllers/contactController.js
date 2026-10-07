const { db } = require('../config/db');

const contactController = {
  async submitContact(req, res) {
    try {
      const { name, email, phone, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
      }

      const record = await db.contact.create({
        name,
        email,
        phone,
        message
      });

      return res.status(201).json({
        success: true,
        message: 'Your inquiry has been received. Our smart architectural consulting team will connect with you shortly.',
        data: record
      });
    } catch (err) {
      console.error('Contact submit error:', err);
      return res.status(500).json({ success: false, message: 'Failed to submit message.' });
    }
  }
};

module.exports = contactController;
