# QPP Health Check Endpoint
![Build](https://github.com/CMSgov/qpp-shared-healthcheck-node/workflows/Build%20-%20PR/badge.svg) [![npm version](https://badge.fury.io/js/qpp-shared-healthcheck-node.svg)](https://badge.fury.io/js/qpp-shared-healthcheck-node)

This is the common QPP health check endpoint that is used by QPP services to make basic determinations if the service is up or down.

## Dependencies
* This route requires the [Express](https://expressjs.com/) framework.
* Node versions tested: 10.x, 12.x

## Adding to your project
`npm install qpp-shared-healthcheck-node`

## Testing locally
You may need to add node.js to your local environment in order to install the dependencies.  
After running `npm install` on a freshly cloned project, run `npm test` to kick off the test suite.  
If any errors are found after running the tests on a newly cloned repo, please open an issue on the github repo page immediately and include the version of Node that is used during runtime.

## Using
Once the package has been installed, you can load the route into wherever routes are handled in your application.

Basic usage could be as follows:

```javascript
const express = require('express');
const app = express();
const router = express.Router();

const sharedHealthcheck = require('qpp-shared-healthcheck-node');
const healthcheck = sharedHealthcheck.create();

app.use(healthcheck);
app.listen(3000);
```

You can enable an RSS check to return 503s when memory usage crosses a configured threshold:

```javascript
const healthcheck = sharedHealthcheck.create({
  // Limit process to 1.4GB
  maxRssBytes: 1400000000
});

app.use(healthcheck);
```

You can return a custom 200 message by passing an object with the `okMessage` property:

```javascript
const healthcheck = sharedHealthcheck.create({
  okMessage: {
    versions: {
      customModule: 'v1.0.0'
    },
    status: 'ok'
  }
});

app.use(healthcheck);
```

Response body:
```
{"versions":{"customModule":"v1.0.0"},"status":"ok"}
```

Once the application is running, you can hit the endpoint at `/health`.  In this case with our simple application above, we would start the application and navigate to `localhost:3000/health` and expect to see some results.


## Want to Contribute?

Want to file a bug or contribute some code? Read up on our guidelines for [contributing].

[contributing]: /.github/CONTRIBUTING.md

## Public Domain
This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived
through the CC0 1.0 Universal public domain dedication.		

All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to
comply with this waiver of copyright interest.		

See the [formal LICENSE file](/LICENSE).

test
