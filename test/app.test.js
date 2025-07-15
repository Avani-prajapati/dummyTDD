import request from 'supertest';
import app from '../app.js';

describe('App Route Check', () => {
  it('should return 404 on unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
  });
});
