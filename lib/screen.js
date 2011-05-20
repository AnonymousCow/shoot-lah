// screen.js
var screen = module.exports = function screen(canvas) {
    var context = canvas.getContext('2d');

    return Object.spawn({
        size        : {
            width   : canvas.width,
            height  : canvas.height
        },
        draw        : function() {
            // what to draw 
        },
        dirty       : true, // whether we need to have it drawn
        render      : function() {
            context.save();

            // render the current screen
            this.draw();
            this.dirty = false;

            context.restore();
        },
        clear       : function(fillStyle) {
            // clear the viewport 
            if (fillStyle) {
                context.fillStyle = fillStyle;
            }

            context.fillRect(0, 0, this.size.width, this.size.height);
        },
        text        : function(options) {
            // write some text
            var location        = options.location;

            context.font        = options.font;
            context.fillStyle   = options.color;
            context.textAlign   = options.align;

            context.fillText(options.text, location.x, location.y);
        },
        image       : function(actor, options) {
            // draw an image
            var location    = options.location  || { x: 0, y: 0 };
            var size        = options.size      || { width: 0, height: 0 };
            var img         = (actor.image) ? actor.image : new (require('canvas')).Image();

            // draw the specified image using the context
            function drawImage(img) {
                    context.drawImage(img, location.x, location.y, size.width, size.height);
            }

            if (!actor.image) {
                img.onload  = function() {
                    // draw it upon loading
                    drawImage(img);
                };

                // set a source so it'll try to load the image file
                img.src     = options.path;

                // set a reference
                actor.image = img;
            }
            else {
                // loaded previously, so just go ahead and draw
                drawImage(actor.image);
            }

            return img;
        },
        keyboard    : function(keyName) {
            // keyboard handler
        }
    });
};
