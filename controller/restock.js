// controller/restock.js
import Sweet from '../models/Sweet.js';

export const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    console.log('🛠️ restockSweet controller hit:', id); // ✅ TEMP for debug

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Quantity is required for restocking' });
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
