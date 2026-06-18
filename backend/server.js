import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ameerhamzatwd_db_user:Samsung@cluster.h0rzotz.mongodb.net/'

app.use(cors());
app.use(express.json());

const entrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lent: { type: Number, required: true, min: 0, default: 0 },
    returned: { type: Number, required: true, min: 0, default: 0 },
    limit: { type: Number, required: true, min: 0, default: 0 },
    dueDate: { type: String, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const Entry = mongoose.model('Entry', entrySchema);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/entries', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch entries', error: error.message });
  }
});

app.post('/api/entries', async (req, res) => {
  try {
    const newEntry = await Entry.create(req.body);
    console.log('New entry created:', newEntry);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create entry', error: error.message });
  }
});

app.put('/api/entries/:id', async (req, res) => {
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update entry', error: error.message });
  }
});

app.delete('/api/entries/:id', async (req, res) => {
  try {
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete entry', error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
