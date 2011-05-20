// actor.js
var actor = module.exports = function actor(screen) {
    return Object.spawn({
        screen  : screen,
        image   : null,
        location: {
            x: 0,
            y: 0
        },
        size    : {
            width   : 0,
            height  : 0
        },
        draw    : function() {
            // what to draw
        }
    });
};
