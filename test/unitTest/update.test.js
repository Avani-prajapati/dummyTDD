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
    name: 'Ladoo',
    category: 'Nut-Based',
    price: 30,
    quantity: 10,
  });

  const saved = await sweet.save();
  sweetId = saved._id;
});

describe('Update Sweet', () => {
  it('should return error if any field is missing', async () => {
  const res = await request(app)
    .put(`/api/sweets/update/${sweetId}`)
    .send({ name: 'New Name' }); // missing price, quantity, etc.

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe('All fields are required');
});
  
  it('should update sweet details', async () => {
    const res = await request(app)
      .put(`/api/sweets/update/${sweetId}`)
      .send({
        name: 'Motichoor Ladoo',
        category: 'Nut-Based',
        price: 35,
        quantity: 25,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Motichoor Ladoo');
    expect(res.body.price).toBe(35);
    expect(res.body.quantity).toBe(25);
  });

  it('should return error for invalid ID', async () => {
    const res = await request(app)
      .put('/api/sweets/update/invalid-id')
      .send({ name: 'Test' });

    expect(res.statusCode).toBe(500); // Mongoose will throw cast error
  });
});
