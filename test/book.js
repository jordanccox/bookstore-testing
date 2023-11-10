const Book = require('../app/models/book');

const chai = require('chai');
const chaiHttp = require ('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp); // use allows for using middleware

// beforeEach(() => { // runs before each test
//   Book.removeAll();
// });

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
  });
  describe('/POST book', () => {
    it('should POST a book', (done) => {
      // arrange
      const book = {
        title: 'The Bible',
        author: 'God',
        year: -2000,
        pages: 1200
      };

      // act
      chai
        .request(server)
        .post('/book')
        .send(book)

      // assert
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('pages');
          res.body.should.have.property('year');
          done();
        });
    });
    it('should not POST a book without pages field', (done) => {
      // arrange
      const book = {
        title: 'The Bible',
        author: 'God',
        year: -2000,
      };

      // act
      chai
        .request(server)
        .post('/book')
        .send(book)

      // assert
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('/GET book/:id', () => {
    it('should GET a book by a given id', (done) => {
      // arrange
      const book = {
        title: 'The Fellowship of the Ring',
        author: 'J.R.R. Tolkien',
        year: 1954,
        pages: 423
      };

      chai 
        .request(server)
        .post('/book')
        .send(book);
      
      // act
      chai
        .request(server)
        .get('/book/1')
        // assert
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id').equal(1);
          done();
        });
    });
  });
});