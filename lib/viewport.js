// options
var common  = require('./common');

// export it!
module.exports = (function() {
    // local variables
    var Canvas          = require('canvas'),
        canvas          = new Canvas(640, 480),
        Screen          = require('../objects/screen')(canvas),
        screens         = {};

    // keyboard handler
    function keyboard(keyName) {
        this.currentScreen.keyboard(keyName);
    }

    function render() {
        this.currentScreen.render();
    }

    var viewport = {
        canvas          : canvas,
        screens         : screens,
        currentScreen   : null,
        render          : render,
        keyboard        : keyboard
    };

    screens['welcome']  = require('../objects/welcomeScreen')(viewport);
    screens['game']     = require('../objects/gameScreen')(viewport);

    viewport.currentScreen = viewport.screens.welcome;

    // initialize the screen
    viewport.currentScreen.clear();
    
    // render the current screen to the viewport
    viewport.render();

    // return the viewport
    return viewport
})();
