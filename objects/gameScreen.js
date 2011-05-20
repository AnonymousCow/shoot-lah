// game screen
var gameScreen = module.exports = function game(screen, viewport) {
    return screen.spawn({
        actors  : { },
        draw    : function() {
            this.clear();

            for (var actor in this.actors) {
                this.actors[actor].draw();
            }
        },
        keyboard: function(keyName) {
            var spaceship = this.actors['spaceship2'];
            var moveAmount = 10;

            switch(keyName) {
                case 'up':
                    if (spaceship.location.y >= moveAmount) {
                        spaceship.location.y -= moveAmount;
                        
                        this.dirty = true;
                    }
                    break;

                case 'down':
                    if (spaceship.location.y <= (this.size.height - spaceship.size.height - moveAmount)) {
                        spaceship.location.y += moveAmount;

                        this.dirty = true;
                    }
                    break;

                case 'left':
                    if (spaceship.location.x >= moveAmount) {
                        spaceship.location.x -= moveAmount;

                        this.dirty = true;
                    }
                    break;

                case 'right':
                    if (spaceship.location.x <= (this.size.width - spaceship.size.width - moveAmount)) {
                        spaceship.location.x += moveAmount;

                        this.dirty = true;
                    }
                    break;

                case 'space':
                    break;
            }
        }
    });
};
