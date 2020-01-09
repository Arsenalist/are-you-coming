//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/are-you-coming'));
app.use(require('prerender-node').set('prerenderToken', 'M1H2BjNVj65lAIwKk8Pp'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/are-you-coming/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
