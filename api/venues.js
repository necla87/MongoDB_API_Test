import express from 'express';
import Venue from '../models/Venue.js';

const router = express.Router();

// Get all venues with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build the filter object
    const filter = {};
    if (req.query.name) filter.name = new RegExp(req.query.name, 'i'); // case-insensitive regex
    if (req.query.location) filter.location = new RegExp(req.query.location, 'i'); // case-insensitive regex

    // Fetch data with pagination and filtering
    const venues = await Venue.find(filter).skip(skip).limit(limit);
    const totalVenues = await Venue.countDocuments(filter);
    const totalPages = Math.ceil(totalVenues / limit);

    res.json({
      venues,
      totalVenues,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get a single venue by ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new venue
router.post('/', async (req, res) => {
  const venue = new Venue({
    name: req.body.name,
    location: req.body.location,
    capacity: req.body.capacity,
    availability: req.body.availability
  });
  try {
    const newVenue = await venue.save();
    res.status(201).json(newVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a venue by ID
router.put('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    venue.name = req.body.name;
    venue.location = req.body.location;
    venue.capacity = req.body.capacity;
    venue.availability = req.body.availability;

    const updatedVenue = await venue.save();
    res.json(updatedVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a venue by ID
router.delete('/:id', async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    res.json({ message: 'Venue deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
