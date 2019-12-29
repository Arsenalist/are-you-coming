//Install express server
const enforce = require('express-sslify');
const express = require('express');
const path = require('path');

const app = express();
app.use(enforce.HTTPS());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/are-you-coming'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/are-you-coming/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
