import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import Sweet from '../../models/Sweet.js';

let sweetId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Sweet.deleteMany({});

  const sweet = new Sweet({
    name: 'Besan Ladoo',
    category: 'Nut-Based',
    price: 30,
    quantity: 10,
  });

  const saved = await sweet.save();
  sweetId = saved._id;

  console.log('✅ sweetId created in test:', sweetId); // optional debug
});

describe('Restock Sweet', () => {
  it('should increase quantity of a sweet', async () => {
    const res = await request(app)
      .post(`/api/sweets/restock/${sweetId}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(15);
  });

  it('should return error if quantity is not provided', async () => {
    const res = await request(app)
      .post(`/api/sweets/restock/${sweetId}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Quantity is required for restocking');
  });
});
