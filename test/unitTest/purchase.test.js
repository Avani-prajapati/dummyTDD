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

  const sweet = new Sweet({
    name: 'Kalakand',
    category: 'Milk-Based',
    price: 45,
    quantity: 5,
  });

  const saved = await sweet.save();
  sweetId = saved._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Sweet.deleteMany({});
});

describe('Purchase Sweet', () => {
  it('should purchase a sweet and reduce quantity', async () => {
    const res = await request(app)
      .post(`/api/sweets/purchase/${sweetId}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(3);
  });

  it('should return error if not enough stock', async () => {
    const sweet = new Sweet({
      name: 'Imarti',
      category: 'Fried',
      price: 15,
      quantity: 1,
    });
    const saved = await sweet.save();

    const res = await request(app)
      .post(`/api/sweets/purchase/${saved._id}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Not enough stock available');
  });
});
