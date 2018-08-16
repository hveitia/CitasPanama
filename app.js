var express        = require("express"),
    cors           = require('cors'),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    config         = require('./config');



// Middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


// API routes
var routesIndex = require('./routes/index');



app.use('/api', routesIndex);



// Start server
app.listen(config.port, function() {
  console.log("Node server running on http://localhost:" + config.port);
});
