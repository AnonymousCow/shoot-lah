// modules
var express     = require('express'),
    now         = require('now'),
    app         = express.createServer(),
    clock       = require('./lib/clock');

// globals
var options     = {
    host    : 'localhost',
    port    : 8080
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
        console.log("Listening on http://" + options.host + ":" + options.port);

        var everyone    = now.initialize(app);

        everyone.now.distributeMessage  = function(msg) {
            everyone.now.receiveMessage(this.now.name, msg);
        };

        everyone.now.sendMessage        = function(msg) {
            switch(msg) {
                case 'left':
                    clock.moveLeft();
                    break;

                case 'right':
                    clock.moveRight();
                    break;
            }
        };

        everyone.connected(function() {
            everyone.now.receiveMessage('System', this.now.name + ' has joined the room!');
        });

        everyone.disconnected(function() {
            console.log("disconnected()", arguments);
        });

        setInterval(function() {
            if (everyone.count) {
                clock.update();

                everyone.now.receiveImage(clock.canvas.toDataURL());
            }
        }, 40);
    });
}
