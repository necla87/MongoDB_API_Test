import express from 'express';
import Guest from '../models/Guest.js';

const router = express.Router();

// Get all guests for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const guests = await Guest.find({ event: req.params.eventId });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a guest to an event
router.post('/', async (req, res) => {
  const guest = new Guest({
    name: req.body.name,
    email: req.body.email,
    event: req.body.event
  });
  try {
    const newGuest = await guest.save();
    res.status(201).json(newGuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a guest
router.delete('/:id', async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    await guest.remove();
    res.json({ message: 'Guest deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
