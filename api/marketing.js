import express from 'express';
import Marketing from '../models/Marketing.js';

const router = express.Router();

// Get all marketing campaigns with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build the filter object
    const filter = {};
    if (req.query.campaignName) filter.campaignName = new RegExp(req.query.campaignName, 'i'); // case-insensitive regex
    if (req.query.event) filter.event = req.query.event; // exact match on event ID

    // Fetch data with pagination and filtering
    const campaigns = await Marketing.find(filter).populate('event').skip(skip).limit(limit);
    const totalCampaigns = await Marketing.countDocuments(filter);
    const totalPages = Math.ceil(totalCampaigns / limit);

    res.json({
      campaigns,
      totalCampaigns,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single marketing campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Marketing.findById(req.params.id).populate('event');
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new marketing campaign
router.post('/', async (req, res) => {
  const campaign = new Marketing({
    campaignName: req.body.campaignName,
    event: req.body.event,
    channels: req.body.channels,
    budget: req.body.budget,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate)
  });
  try {
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a marketing campaign by ID
router.put('/:id', async (req, res) => {
  try {
    const campaign = await Marketing.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    campaign.campaignName = req.body.campaignName;
    campaign.event = req.body.event;
    campaign.channels = req.body.channels;
    campaign.budget = req.body.budget;
    campaign.startDate = new Date(req.body.startDate);
    campaign.endDate = new Date(req.body.endDate);

    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a marketing campaign by ID
router.delete('/:id', async (req, res) => {
  try {
    const campaign = await Marketing.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
