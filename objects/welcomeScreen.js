var welcomeScreen = module.exports = function(viewport) {
    var canvas  = viewport.canvas;
    var screen  = require('./screen')(canvas);

    return screen.spawn({
        show    : function() {
            this.text({
                text    : 'Shoot LAH!',
                coords  : [ canvas.width / 2, canvas.height / 2 ],
                font    : '30px Calibri',
                color   : '#ffffff',
                align   : 'center'
            });

            this.text({
                text    : 'Press SPACEBAR to continue ...',
                coords  : [ canvas.width / 2, canvas.height - 50 ],
                font    : '15px Calibri',
                color   : '#ffffff',
                align   : 'center'
            });
        },
        keyboard: function(keyName) {
            if ('space' == keyName) {
                this.clear();

                viewport.currentScreen = viewport.screens.game;
                viewport.render();
            }
        }
    });
};
