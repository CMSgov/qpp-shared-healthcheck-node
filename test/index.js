const request = require('supertest');
const express = require('express');
const app = express();
const healthCheck = require('../index');

var router = undefined;

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
      router = healthCheck.create();
      app.use(function (req, res, next) {
        router(req, res, next)
      });
    });

    it('responds with 200', (done) => {
      request(app)
        .get('/health')
        .expect(200, done);
    });
  });

  context('when health check point enables rss check', () => {
    beforeEach(() =>{
      router = healthCheck.create({ maxRssBytes: 1400000000 });
      app.use(function (req, res, next) {
        router(req, res, next)
      });
    });

    it('responds with 200', (done) => {
      request(app)
        .get('/health')
        .expect(200, done);
    });
  });

  context('when health check point sustains high memory usage', () => {
    beforeEach(() =>{
      router = healthCheck.create({ maxRssBytes: 1 });
      app.use(function (req, res, next) {
        router(req, res, next)
      });
    });

    it('responds with 503', (done) => {
      request(app)
        .get('/health')
        .expect(503, done);
    });
  });
});

