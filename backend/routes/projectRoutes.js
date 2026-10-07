const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authMiddleware, optionalAuthMiddleware } = require('../middleware/authMiddleware');

router.post('/', optionalAuthMiddleware, projectController.createProject);
router.get('/', authMiddleware, projectController.getUserProjects);
router.get('/:id', optionalAuthMiddleware, projectController.getProjectById);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
