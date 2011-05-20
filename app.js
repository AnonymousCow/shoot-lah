// app.js

// modules
var express     = require('express'),
    now         = require('now'),
    app         = express.createServer(),
    viewport    = require('./lib/viewport');
    //viewport  = require('./lib/clock');

// globals
var options     = {
    host    : '10.0.1.132',
    port    : 8080,
    fps     : 25
};

// configuration
app.configure(function() {
    // register ejs to the html extension
    app.register('.html', require('ejs'));

    // set view parameters
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('view options', {
        open    : '{{',
        close   : '}}'
    });

    // give priority to the routing middleware
    app.use(app.router);

    // static file server
    app.use(express.static(__dirname + '/public'));
});

// routing
app.get('/', function(request, response, next) {
    response.render('index', {
        title   : 'Home'
    });
});

// allow module export
module.exports  = app;

// don't run if included as a module!
if (!module.parent) {
    app.listen(options.port, options.host, function() {
        var runEvery    = 1000 / options.fps;
        var everyone    = now.initialize(app);

        console.log('Listening on http://%s:%d', options.host, options.port);
        console.log('FPS: %d', runEvery);

        // global message distribution
        everyone.now.distributeMessage = function(msg) {
            everyone.now.receiveMessage(this.now.name, msg);
        };

        // keyboard action
        everyone.now.keyboard = function(msg) {
            switch(msg) {
                case 'left':
                case 'right':
                case 'space':
                    viewport.keyboard(msg);
                    break;
            }
        };

        everyone.connected(function() {
            everyone.now.receiveMessage('System', this.now.name + ' has joined the simulation chamber!');
        });

        everyone.disconnected(function() {
            everyone.now.receiveMessage('System', this.now.name + ' has left the simulation chamber!');
        });

        setInterval(function() {
            if (everyone.count) {
                viewport.render();

                everyone.now.receiveImage(viewport.canvas.toDataURL());
            }
        }, runEvery);
    });
}
