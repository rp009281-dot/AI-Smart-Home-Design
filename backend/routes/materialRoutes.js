const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

router.get('/materials', materialController.getMaterials);
router.get('/smart-features', materialController.getSmartFeatures);

module.exports = router;
