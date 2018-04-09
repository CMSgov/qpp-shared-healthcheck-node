const express = require('express');

const sharedHealthCheck = {
  /**
   * Create and return a new express router with the provided configuration.
   *
   * Valid options:
   *   {int}  maxRssBytes - the byte cutoff for high rss.
   */
  create: function(options = {}) {
    const router = express.Router();
    const maxRssBytes = options.maxRssBytes;

    router.get('/health', function(req, res, next) {
      const rss = process.memoryUsage().rss;
      if (maxRssBytes && rss > maxRssBytes) {
        // Indicate that the service is unavailable if rss is above a given threshold;
        // this allows us to protect against uncontrolled failures due to small memory
        // leaks in the application.
        const msg = 'High rss: ' + rss +
              ' is above the configured threshold of ' + maxRssBytes;

        if (req.logger) {
          req.logger.error(msg);
        } else {
          console.error(msg);
        }

        res.status(503).send('High rss: ' + rss + '\n');
      } else {
        res.status(200).send('OK!\n');
      }
    });

    return router;
  }
}

module.exports = sharedHealthCheck;
