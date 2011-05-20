// screen.js
var Screen = module.exports = function screen(canvas) {
    var context = canvas.getContext('2d');

    return Object.spawn({
        props   : null,
        show    : function() {
            // what to show
        },
        render  : function() {
            context.save();

            // render the current screen
            this.show();

            context.restore();
        },
        clear   : function(fillStyle) {
            // clear the viewport 
            if (fillStyle) {
                context.fillStyle = fillStyle;
            }

            context.fillRect(0, 0, canvas.width, canvas.height);
        },
        text    : function(options) {
            // write some text
            var coords          = options.coords;

            context.font        = options.font;
            context.fillStyle   = options.color;
            context.textAlign   = options.align;

            context.fillText(options.text, coords[0], coords[1]);
        },
        image   : function(options) {
            // draw an image
            var Image   = require('canvas').Image;
            var img     = new Image();

            img.onload  = function() {
                context.drawImage(img, 0, 0);
            };

            img.src     = options.path;

            return img;
        },
        keyboard: function(keyName) {
            // keyboard handler
        }
    });
};
