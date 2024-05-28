import express from 'express';
import Venue from '../models/Venue.js';

const router = express.Router();

// Get all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single venue
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

// Update a venue
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

// Delete a venue
router.delete('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    await venue.remove();
    res.json({ message: 'Venue deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
