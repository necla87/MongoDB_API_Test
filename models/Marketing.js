import mongoose from 'mongoose';

const marketingSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  channels: { type: [String], required: true },
  budget: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const Marketing = mongoose.model('Marketing', marketingSchema);
export default Marketing;
