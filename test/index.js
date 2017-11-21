const request = require('supertest');
const express = require('express');
const app = express();
const healthCheck = require('../index');

describe('QPP health check endpoint', () => {
  context('when health check point is not added to the app middleware', () => {
    it('responds with 404', (done) => {
      request(app)
        .get('/health')
        .expect(404, done);
    });
  });

  context('when health check point is added to the app middleware', () => {
    before(() =>{
      app.use(healthCheck);
    });

    it('responds with 200', (done) => {
      request(app)
        .get('/health')
        .expect(200, done);
    });
  });
});

