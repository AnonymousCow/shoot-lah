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
                    this.dirty = spaceship.fire();
                    break;
            }
        }
    });
};
