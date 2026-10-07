const express = require('express');
const router = express.Router();
const savedDesignController = require('../controllers/savedDesignController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, savedDesignController.saveDesign);
router.get('/', authMiddleware, savedDesignController.getUserSavedDesigns);
router.delete('/:id', authMiddleware, savedDesignController.deleteSavedDesign);

module.exports = router;
