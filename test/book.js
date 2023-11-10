const Book = require('../app/models/book');

const chai = require('chai');
const chaiHttp = require ('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp); // use allows for using middleware

describe('Books', () => {
  describe('/GET book', () => {
    it('should GET all the books', (done) => {
      chai
        .request(server)
        .get('/book')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  })
});