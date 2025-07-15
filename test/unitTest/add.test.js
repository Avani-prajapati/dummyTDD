import request from 'supertest';
import app from '../../app.js';
import mongoose from 'mongoose';
import Sweet from "../../models/Sweet.js";


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Sweet.deleteMany({});
});

describe('Add Sweet', () => {
  it('should add a new sweet', async () => {
    const res = await request(app)
      .post('/api/sweets/add')
      .send({
        name: 'Rasgulla',
        category: 'Milk-Based',
        price: 20,
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Rasgulla');
  });
});
