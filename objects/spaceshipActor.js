// spaceship actor
var spaceshipActor = module.exports = function spaceship(actor, options) {
    return actor.spawn({
        location: options.location,
        size    : options.size,
        path    : options.path,
        draw    : function() {
            this.screen.image(this, {
                path    : this.path,
                location: this.location,
                size    : this.size
            });
        },
        move    : function(direction, amount) {
            var hasMoved = false;

            switch (direction) {
                case 'up':
                    if (this.location.y >= amount) {
                        this.location.y -= amount;

                        hasMoved = true;
                    }

                    break;

                case 'down':
                    if (this.location.y <= (this.screen.size.height - this.size.height - amount)) {
                        this.location.y += amount;

                        hasMoved = true;
                    }

                    break;

                case 'left':
                    if (this.location.x >= amount) {
                        this.location.x -= amount;

                        hasMoved = true;
                    }

                    break;

                case 'right':
                    if (this.location.x <= (this.screen.size.width - this.size.width - amount)) {
                        this.location.x += amount;

                        hasMoved = true;
                    }

                    break;
            }

            return hasMoved;
        },
        fire    : function() {
            /*
            this.screen.text({
                text    : 'Shoot, I can\'t shoot!',
                location: {
                    x: this.screen.size.width / 2,
                    y: this.screen.size.height / 2
                },
                font    : '30px Calibri',
                color   : '#ffffff',
                align   : 'center'
            });
            */

            return true;
        }
    });
};
