const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a phone', async () => {
    const expected = {
      name: 'blubberPhone',
      color: 'space-blue',
      yearReleased: 2008,
      inventor: 'guy WIth MasK',
    };
    const res =
      await request(app).post('/api/v1/phones').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
