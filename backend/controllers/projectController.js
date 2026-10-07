const { db } = require('../config/db');

const projectController = {
  async createProject(req, res) {
    try {
      const userId = req.user ? req.user.id : null;
      const projectData = {
        ...req.body,
        user_id: userId
      };

      const project = await db.projects.create(projectData);
      return res.status(201).json({ success: true, project });
    } catch (err) {
      console.error('Create project error:', err);
      return res.status(500).json({ success: false, message: 'Failed to create project.' });
    }
  },

  async getUserProjects(req, res) {
    try {
      const userId = req.user.id;
      const projects = await db.projects.findByUserId(userId);
      return res.json({ success: true, projects });
    } catch (err) {
      console.error('Get user projects error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch projects.' });
    }
  },

  async getProjectById(req, res) {
    try {
      const project = await db.projects.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }
      return res.json({ success: true, project });
    } catch (err) {
      console.error('Get project error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch project.' });
    }
  },

  async deleteProject(req, res) {
    try {
      await db.projects.delete(req.params.id);
      return res.json({ success: true, message: 'Project deleted successfully.' });
    } catch (err) {
      console.error('Delete project error:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete project.' });
    }
  }
};

module.exports = projectController;
