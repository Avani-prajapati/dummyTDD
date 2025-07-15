import Sweet from "../models/Sweet.js";

export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const sweet = new Sweet({ name, category, price, quantity });
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
