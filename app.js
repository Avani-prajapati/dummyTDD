import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sweetRoutes from './router/sweetRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/sweets', sweetRoutes);

// Only connect to MongoDB & listen if NOT in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB connected');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(err => console.error('MongoDB connection error:', err));
}

export default app;
