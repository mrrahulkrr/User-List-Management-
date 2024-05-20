import chai from 'chai';
import server from '../index.js';
import fs from 'fs';
import path from 'path';
import List from '../models/listModel';
import User from '../models/userModel';

const { expect, should } = chai;

let chaiHttp;
(async () => {
  chaiHttp = (await import('chai-http')).default;
  chai.use(chaiHttp);

  describe('List Routes', () => {
    let listId;
    let userId;

    before((done) => {
      List.deleteMany({}, (err) => {
        User.deleteMany({}, (err) => {
          done();
        });
      });
    });

    after((done) => {
      List.deleteMany({}, (err) => {
        User.deleteMany({}, (err) => {
          done();
        });
      });
    });

    describe('POST /api/lists', () => {
      it('should create a new list', (done) => {
        const list = {
          title: 'Test List',
          customProperties: [{ title: 'city', fallback: 'Unknown' }]
        };

        chai.request(server)
          .post('/api/lists')
          .send(list)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Test List');
            listId = res.body._id;
            done();
          });
      });
    });

    describe('POST /api/lists/:listId/users', () => {
      it('should add users to the list from CSV', (done) => {
        chai.request(server)
          .post(`/api/lists/${listId}/users`)
          .attach('file', fs.readFileSync(path.join(__dirname, 'test.csv')), 'test.csv')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('successCount').eql(2);
            userId = res.body.users[0]._id;
            done();
          });
      });
    });

    describe('POST /api/lists/:listId/send-email', () => {
      it('should send an email to all users in the list', (done) => {
        const email = {
          subject: 'Welcome!',
          body: 'Hey [name]!\n\nThank you for signing up with your email [email]. We have received your city as [city].\n\nTeam MathonGo.'
        };

        chai.request(server)
          .post(`/api/lists/${listId}/send-email`)
          .send(email)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('count').eql(2);
            done();
          });
      });
    });

    describe('POST /api/lists/:listId/unsubscribe/:userId', () => {
      it('should unsubscribe the user from the list', (done) => {
        chai.request(server)
          .post(`/api/lists/${listId}/unsubscribe/${userId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User unsubscribed');
            done();
          });
      });
    });
  });
})();
