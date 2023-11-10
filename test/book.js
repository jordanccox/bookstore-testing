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

      Book.addBook(book);
      
      // act
      chai
        .request(server)
        .get('/book/2')
        // assert
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id').equal(2);
          res.body.should.have.property('title').equal('The Fellowship of the Ring');
          res.body.should.have.property('author').equal('J.R.R. Tolkien');
          res.body.should.have.property('year').equal(1954);
          res.body.should.have.property('pages').equal(423);
          done();
        });
    });
  });
  describe('/PUT book/:id', () => {
    it('should UPDATE a book given the id', (done) => {
      // arrange
      const book = {
        id: 2,
        title: 'The Fellowship of the Ring Second Edition',
        author: 'J.R.R. Tolkien',
        year: 1967,
        pages: 423
      };

      // act
      chai
        .request(server)
        .put('/book/2')
        .send(book)
        // assert
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('id').equal(2);
          res.body.should.have.property('title').equal('The Fellowship of the Ring Second Edition');
          res.body.should.have.property('author').equal('J.R.R. Tolkien');
          res.body.should.have.property('year').equal(1967);
          res.body.should.have.property('pages').equal(423);
          done();
        });
    });
  });
  describe('/DELETE book/:id', () => {
    it('should DELETE a book given the id', () => {
      chai
        .request(server)
        .delete('/book/2')
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });
});