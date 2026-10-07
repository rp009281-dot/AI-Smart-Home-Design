const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/generate-design', aiController.generateDesign);
router.post('/estimate-cost', aiController.estimateCost);

module.exports = router;
