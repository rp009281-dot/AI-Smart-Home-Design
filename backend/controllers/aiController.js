const { generateAiHouseDesigns } = require('../services/aiDesignEngine');
const { calculateCost } = require('../services/costEstimationService');

const aiController = {
  async generateDesign(req, res) {
    try {
      const input = req.body;
      if (!input.plot_size_sqft && (!input.plot_length || !input.plot_width)) {
        return res.status(400).json({
          success: false,
          message: 'Plot dimensions (size or length & width) are required.'
        });
      }

      // Generate 3 personalized options: Budget, Balanced, Premium
      const designs = generateAiHouseDesigns(input);

      return res.json({
        success: true,
        message: 'AI designs generated successfully.',
        query: input,
        designs: {
          recommended: designs.find(d => d.tier_type === 'balanced') || designs[1],
          budget: designs.find(d => d.tier_type === 'budget') || designs[0],
          premium: designs.find(d => d.tier_type === 'premium') || designs[2],
          all: designs
        }
      });
    } catch (err) {
      console.error('AI design generation error:', err);
      return res.status(500).json({ success: false, message: 'AI generation engine encountered an error.' });
    }
  },

  async estimateCost(req, res) {
    try {
      const {
        builtUpAreaSqft,
        floors = 1,
        qualityTier = 'Balanced',
        architecturalStyle = 'Modern Contemporary',
        smartFeatures = [],
        customAddons = 0
      } = req.body;

      if (!builtUpAreaSqft || Number(builtUpAreaSqft) <= 0) {
        return res.status(400).json({ success: false, message: 'Valid built-up area is required.' });
      }

      const costEstimate = calculateCost({
        builtUpAreaSqft: Number(builtUpAreaSqft),
        floors: Number(floors),
        qualityTier,
        architecturalStyle,
        smartFeatures,
        customAddons: Number(customAddons)
      });

      return res.json({
        success: true,
        costEstimate
      });
    } catch (err) {
      console.error('Cost estimation error:', err);
      return res.status(500).json({ success: false, message: 'Failed to calculate cost estimation.' });
    }
  }
};

module.exports = aiController;
