import Sweet from '../models/Sweet.js';

export const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid purchase quantity' });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
