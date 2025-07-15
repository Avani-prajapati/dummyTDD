import mongoose from 'mongoose';
import Sweet from '../models/Sweet.js';

export const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;

    // ✅ Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // ✅ Check for missing fields
    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      id,
      { name, category, price, quantity },
      { new: true, runValidators: true }
    );

    // ✅ If no sweet found with given ID
    if (!updatedSweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.status(200).json(updatedSweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
