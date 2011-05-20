// export it!
var viewport = module.exports = function viewport(width, height) {
    // path!
    var path            = require('path');

    // local variables
    var objectEnhance   = require('./objectEnhance'),
        Canvas          = require('canvas'),
        canvas          = new Canvas(width, height),
        screen          = require('./screen')(canvas),
        actor           = require('./actor')(screen),
        screens         = (function() {
            var _currentScreen = null;

            function current(scr) {
                if (scr && screen.isPrototypeOf(scr)) {
                    _currentScreen = scr;
                }
                else if (!scr) {
                    return _currentScreen;
                }
            }

            return {
                current: current
            };
        })();

    // keyboard handler
    function keyboard(keyName) {
        this.screens.current().keyboard(keyName);
    }

    // viewport renderer
    function render() {
        var current = this.screens.current();

        // draw it only if it's dirty
        if (current.dirty) {
            this.screens.current().render();
        }
    }

    // the viewport!
    var viewport = {
        canvas          : canvas,
        screens         : screens,
        render          : render,
        keyboard        : keyboard
    };

    // our screens
    screens.welcome = require('../objects/welcomeScreen')(screen, viewport);
    screens.game    = require('../objects/gameScreen')(screen, viewport);

    // our actors
    screens.game.actors.spaceship = require('../objects/spaceshipActor')(actor, {
        path    : path.normalize(__dirname + '/../graphics/spaceship.png'),
        location: {
            x: (screens.game.size.width - 94) / 2,
            y: (screens.game.size.height - 120)
        },
        size    : {
            width   : 94,
            height  : 100 
        }
    });

    for (var i = 0; i < 8; i++) {
        // add the enemies!
        screens.game.actors['enemy' + i] = require('../objects/enemyActor')(actor, {
            path    : path.normalize(__dirname + '/../graphics/enemy.png'),
            location: {
                x: (i * 94) + 20,
                y: 10
            },
            size    : {
                width   : 94,
                height  : 100 
            }
        });
    }

    // set the welcome screen as our first
    viewport.screens.current(viewport.screens.welcome);

    // clear the screen
    viewport.screens.current().clear();
    
    // render the current screen to the viewport
    viewport.render();

    // return the viewport
    return viewport
};
