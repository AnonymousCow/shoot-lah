// app.js

// modules
var express     = require('express'),
    now         = require('now'),
    app         = express.createServer(),
    viewport    = require('./lib/viewport');

// globals
var options     = {
    host    : '192.168.0.105',
    port    : 8080,
    runEvery: 50
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
        var everyone        = now.initialize(app),
            loneController  = null;

        // so we know what address and port we're bound to
        console.log('Listening on http://%s:%d', options.host, options.port);

        // so we know how often the graphics are drawn
        console.log('Graphics rendered every %d milliseconds', options.runEvery);

        // global message distribution
        everyone.now.distributeMessage = function(msg) {
            everyone.now.receiveMessage(this.now.name, msg);
        };

        // keyboard handler
        everyone.now.keyboard = function(msg) {
            if (loneController && this.user.clientId != loneController) {
                // we have a controller and this client isn't it
                console.log('Spectator input ignored');

                return;
            }

            switch(msg) {
                case 'space':
                    if (!loneController) {
                        // client pressed the space key when no one else was the controller
                        loneController = this.user.clientId;

                        // let others know this client is now the controller
                        everyone.now.receiveMessage('System', this.now.name + ' is now the Lone Controller!');
                    }
                case 'up'   :
                case 'down' :
                case 'left' :
                case 'right':
                    viewport.keyboard(msg);

                    break;
            }
        };

        // when clients connect
        everyone.connected(function() {
            var message = this.now.name + ' has joined the Game Grid';

            if (loneController && loneController != this.user.clientId) {
                // we already have a Lone Controller, clients join in as spectators
                message += ' as a spectator';
            }

            everyone.now.receiveMessage('System', message);
        });

        // when clients disconnect
        everyone.disconnected(function() {
            everyone.now.receiveMessage('System', this.now.name + ' has left the Game Grid');

            if (loneController && this.user.clientId == loneController) {
                // this client was the Lone Controller, announce their departure!
                everyone.now.receiveMessage('System', this.now.name + ' is no longer the Lone Controller!');
            }
        });

        // draw images at every specified interval
        setInterval(function() {
            if (everyone.count) {
                // we have at least one client, do the rendering
                viewport.render();

                // send the image to everyone!
                everyone.now.receiveImage(viewport.canvas.toDataURL());
            }
        }, options.runEvery);
    });
}
