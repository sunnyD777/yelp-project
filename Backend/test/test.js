const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require('chai');
const app = require('../server');
const agent = require('chai').request.agent(app);

describe('Yelp App', () => {
  it('GET /restaurant/customerInfo - Verifying Customer Info sent', (done) => {
    agent.get('/restaurant/customerInfo/6')
      .then((res) => {
        expect(res.body).to.have.all.keys(
          'about',
          'birthday',
          'city',
          'country',
          'email',
          'img',
          'name',
          'nickname',
          'phone_num',
          'state'
        );

        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('POST /customer/orders - Verifying Customer Orders were delivered', (done) => {
    agent.post('/customer/orders')
      .send({ id: 6 })
      .then((res) => {
        expect(res.body).to.be.not.null;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('POST /restaurant/orders - Verifying that Restaurant received Customer Orders', (done) => {
    agent.post('/restaurant/orders')
      .send({ id: 4 })
      .then((res) => {
        expect(res.body).to.be.not.null;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('GET /restaurant/orders - Verifying that Restaurant Info was sent', (done) => {
    agent.get('/customer/restaurantInfo/4')
      .then((res) => {
        expect(res.body).to.be.not.null;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('GET /restaurant/orders - Verifying that Customer can see Restaurant Events', (done) => {
    agent.get('/restaurant/orders')
      .then((res) => {
        expect(res.body).to.be.not.null;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
