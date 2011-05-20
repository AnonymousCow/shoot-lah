// export it!
module.exports = (function() {
    // local variables
    var objectEnhance   = require('./objectEnhance'),
        Canvas          = require('canvas'),
        canvas          = new Canvas(800, 600),
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
        path    : require('path').normalize(__dirname + '/../graphics/spaceship-sprite.png'),
        location: {
            x: 0,
            y: 0
        },
        size    : {
            width   : 50,
            height  : 50
        }
    });

    screens.game.actors.spaceship2 = require('../objects/spaceshipActor')(actor, {
        path    : require('path').normalize(__dirname + '/../graphics/spaceship.png'),
        location: { x: 100, y: 100 },
        size    : {
            width   : 50,
            height  : 50
        }
    });

    // set the welcome screen as our first
    viewport.screens.current(viewport.screens.welcome);

    // clear the screen
    viewport.screens.current().clear();
    
    // render the current screen to the viewport
    viewport.render();

    // return the viewport
    return viewport
})();
