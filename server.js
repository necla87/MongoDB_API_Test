import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import eventRoutes from './api/events.js';
import venueRoutes from './api/venues.js';
import marketingRoutes from './api/marketing.js'; // Add this import

const app = express();
const port = config.port || 3000;
const mongodbUri = config.mongodbUri;

// Middleware
app.use(express.json());

// Register API routes
app.use('/api/events', eventRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/marketing', marketingRoutes); // Register the new marketing routes

// Connect to MongoDB and start the server
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB:', err);
  });

// Additional error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

