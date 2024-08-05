import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event.js';

const router = express.Router();

// Middleware to validate ID
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
};

// Get all events with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build the filter object
    const filter = {};
    if (req.query.name) filter.name = new RegExp(req.query.name, 'i'); // case-insensitive regex
    if (req.query.location) filter.location = new RegExp(req.query.location, 'i'); // case-insensitive regex
    if (req.query.date) filter.date = new Date(req.query.date); // exact match on date

    const events = await Event.find(filter).skip(skip).limit(limit);
    const totalEvents = await Event.countDocuments(filter);
    const totalPages = Math.ceil(totalEvents / limit);

    res.json({
      events,
      totalEvents,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single event with ID validation
router.get('/:id', validateId, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const event = new Event({
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
    description: req.body.description,
    attendees: req.body.attendees
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an event with ID validation
router.put('/:id', validateId, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.name = req.body.name || event.name;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;
    event.description = req.body.description || event.description;
    event.attendees = req.body.attendees || event.attendees;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event with ID validation
router.delete('/:id', validateId, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
