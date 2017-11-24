# QPP Health Check Endpoint
This is the common QPP health check endpoint that is used by QPP services to make basic determinations if the service is up or down.

## Dependencies
* This route requires the [Express](https://expressjs.com/) framework.
* Node versions tested: 6.9.1, 8.8.1

## Adding to your project
`npm install qpp-shared-healthcheck-node`

## Testing locally
You may need to add yarn to your local environment in order to install the dependencies.  To do so, run `npm install yarn -g` in your terminal.

After running `yarn install` on a freshly cloned project, run `npm test` to kick off the test suite.  If any errors are found after running the tests on a newly cloned repo, please open an issue on the github rep page immediately and include the version of Node that is used during runtime.

## Using
Once the package has been installed, you can load the route into wherever routes are handled in your application.

Basic usage could be as follows:

```javascript
var express = require('express')
var app = express()
var router = express.Router()
var endPoint = require('qpp-shared-health-check-node'); 

app.use(endPoint); 
app.listen(3000);
```

Once the application is running, you can hit the endpoint at `/health`.  In this case with our simple application above, we would start the application and navigate to `localhost:3000/health` and expect to see some results.
