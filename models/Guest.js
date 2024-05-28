import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
});

const Guest = mongoose.model('Guest', guestSchema);
export default Guest;
