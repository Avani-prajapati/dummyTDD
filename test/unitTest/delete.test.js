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
  await Sweet.deleteMany({}); // reset DB before each test

  const sweet = new Sweet({
    name: 'Gulab Jamun',
    category: 'Milk-Based',
    price: 25,
    quantity: 15,
  });

  const saved = await sweet.save();
  sweetId = saved._id;

  console.log('✅ Sweet created with ID:', sweetId); // for debugging
});

describe('Delete Sweet', () => {
  it('should delete a sweet by ID', async () => {
    const res = await request(app).delete(`/api/sweets/delete/${sweetId}`);
    console.log('Response:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Sweet deleted successfully');
  });

  it('should return error for non-existent sweet', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/sweets/delete/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Sweet not found');
  });
});
