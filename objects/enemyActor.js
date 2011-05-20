// enemy actor
var enemyActor = module.exports = function enemy(actor, options) {
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
    });
};
