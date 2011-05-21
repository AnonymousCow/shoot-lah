// welcome screen
var welcomeScreen = module.exports = function welcome(screen, viewport) {
    return screen.spawn({
        draw    : function() {
            // the event!
            this.text({
                text    : 'NodeHack 21052011',
                location: {
                    x: this.size.width / 2,
                    y: 80
                },
                font    : '45px Monaco',
                color   : '#ffffff',
                align   : 'center'
            });

            // the game's title
            this.text({
                text    : 'SHOOT LAH!',
                location: {
                    x: this.size.width / 2,
                    y: this.size.height / 2
                },
                font    : '45px Calibri',
                color   : '#00ff00',
                align   : 'center'
            });

            // spacebar to continue!
            this.text({
                text    : 'Press SPACEBAR to continue ...',
                location: {
                    x: this.size.width / 2,
                    y: this.size.height - 50
                },
                font    : '15px Calibri',
                color   : '#ffffff',
                align   : 'center'
            });
        },
        keyboard: function(keyName) {
            if ('space' == keyName) {
                // clear the current screen
                this.clear();

                // set the game screen to the current screen
                viewport.screens.current(viewport.screens.game);

                // render the screen to the viewport
                viewport.render();
            }
        }
    });
};
