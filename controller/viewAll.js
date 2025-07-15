import Sweet from '../models/Sweet.js';

export const viewAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
