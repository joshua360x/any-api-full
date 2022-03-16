const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Phone = require('../lib/models/Phone');

describe('any-api routes', () => {
  beforeAll(() => {
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


  it('get all of our phones', async () => {
    // const expected = await Phone.getAllPhones();
    const expected = [{
      name: 'blubberPhone',
      id: expect.any(String),
      color: 'space-blue',
      yearReleased: 2008,
      inventor: 'guy WIth MasK',
    }];
    const res = await request(app).get('/api/v1/phones');

    expect(res.body).toEqual(expected);
  });


  it('get a phone by its ID', async () => {
    const expected = await Phone.getByASpecificID(1);
    const res = await request(app).get(`/api/v1/phones/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });

});
