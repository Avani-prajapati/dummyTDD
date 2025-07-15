import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import Sweet from '../../models/Sweet.js';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Sweet.insertMany([
    { name: 'Peda', category: 'Milk-Based', price: 15, quantity: 10 },
    { name: 'Chocolate Bar', category: 'Chocolate', price: 25, quantity: 20 },
    { name: 'Jalebi', category: 'Fried', price: 10, quantity: 30 },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Sweet.deleteMany({});
});

describe('Search Sweets', () => {
  it('should search sweets by name', async () => {
    const res = await request(app).get('/api/sweets/search?name=Peda');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe('Peda');
  });

  it('should search sweets by category', async () => {
    const res = await request(app).get('/api/sweets/search?category=Chocolate');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].category).toBe('Chocolate');
  });

  it('should search sweets by price range', async () => {
    const res = await request(app).get('/api/sweets/search?minPrice=10&maxPrice=20');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(sweet => {
      expect(sweet.price).toBeGreaterThanOrEqual(10);
      expect(sweet.price).toBeLessThanOrEqual(20);
    });
  });
});
