var welcomeScreen = module.exports = function(viewport) {
    var screen  = require('./screen')(viewport.canvas);

    return screen.spawn({
        show    : function() {
            this.image({
                path    : require('path').normalize(__dirname + '/../public/images/spaceship-sprite.png')
            });
        },
        keyboard: function(keyName) {
            switch(keyName) {
                case 'left':
                case 'right':
                case 'space':
                    break;
            }
        }
    });
};
