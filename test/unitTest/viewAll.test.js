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
    { name: 'Barfi', category: 'Milk-Based', price: 40, quantity: 10 },
    { name: 'Soan Papdi', category: 'Flaky', price: 20, quantity: 25 },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Sweet.deleteMany({});
});

describe('View All Sweets', () => {
  it('should return all available sweets', async () => {
    const res = await request(app).get('/api/sweets/view');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(0);

    if (res.body.length) {
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('category');
      expect(res.body[0]).toHaveProperty('price');
      expect(res.body[0]).toHaveProperty('quantity');
    }
  });
});
