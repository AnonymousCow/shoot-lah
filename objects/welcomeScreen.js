// welcome screen
var welcomeScreen = module.exports = function welcome(screen, viewport) {
    return screen.spawn({
        draw    : function() {
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

            this.text({
                text    : 'Shoot LAH!',
                location: {
                    x: this.size.width / 2,
                    y: this.size.height / 2
                },
                font    : '30px Calibri',
                color   : '#ffffff',
                align   : 'center'
            });

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
                this.clear();

                viewport.screens.current(viewport.screens.game);
                viewport.render();
            }
        }
    });
};
