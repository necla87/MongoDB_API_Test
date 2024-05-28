import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  availability: { type: [Date], required: true }
});

const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
