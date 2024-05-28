import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  attendees: { type: Number, default: 0 }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
