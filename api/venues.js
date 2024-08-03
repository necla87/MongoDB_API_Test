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

router.get('/:id', async (req, res) => {
  console.log('Requesting venue with ID:', req.params.id);  // Add logging
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
  } catch (err) {
    console.error('GET Error:', err);  // Log detailed error
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

    // Update venue fields
    venue.name = req.body.name || venue.name;
    venue.location = req.body.location || venue.location;
    venue.capacity = req.body.capacity || venue.capacity;
    venue.availability = req.body.availability || venue.availability;

    const updatedVenue = await venue.save();
    res.json(updatedVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a venue
router.delete('/:id', async (req, res) => {
  try {
    const result = await Venue.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    res.json({ message: 'Venue deleted' });
  } catch (err) {
    console.error('Delete Error:', err);  // Log detailed error
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
