import express from 'express';
import Marketing from '../models/Marketing.js';

const router = express.Router();

// Get all marketing campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Marketing.find().populate('event');
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single marketing campaign
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
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  try {
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a marketing campaign
router.put('/:id', async (req, res) => {
  try {
    const campaign = await Marketing.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    campaign.campaignName = req.body.campaignName;
    campaign.event = req.body.event;
    campaign.channels = req.body.channels;
    campaign.budget = req.body.budget;
    campaign.startDate = req.body.startDate;
    campaign.endDate = req.body.endDate;

    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a marketing campaign
router.delete('/:id', async (req, res) => {
  try {
    const campaign = await Marketing.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    await campaign.remove();
    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
