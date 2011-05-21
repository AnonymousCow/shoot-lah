// game screen
var gameScreen = module.exports = function game(screen, viewport) {
    return screen.spawn({
        draw    : function() {
            this.clear();

            for (var actor in this.actors) {
                this.actors[actor].draw();
            }
        },
        keyboard: function(keyName) {
            var spaceship = this.actors['spaceship'];
            var moveAmount = 25;

            switch(keyName) {
                case 'up':
                case 'down':
                case 'left':
                case 'right':
                    this.dirty = spaceship.move(keyName, moveAmount);
                    break;

                case 'space':
                    this.text({
                        text    : 'SHOOT! I can\'t shoot lah!',
                        location: {
                            x: this.size.width / 2,
                            y: this.size.height / 2
                        },
                        font    : '45px Calibri',
                        color   : '#ff0000',
                        align   : 'center'
                    });

                    //this.dirty = spaceship.fire();
                    break;
            }
        }
    });
};
