import Sweet from '../models/Sweet.js';

export const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findByIdAndDelete(id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.status(200).json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
