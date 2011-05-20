// options
var common  = require('./common'),
    Screen  = require('./screen');

var options = {
    width   : 640,
    height  : 480
};

// export it!
module.exports = (function(options) {
    // local variables
    var Canvas          = require('canvas'),
        Image           = Canvas.Image,
        canvas          = new Canvas(options.width, options.height),
        context         = canvas.getContext('2d'),
        screens         = {
            welcome : Screen.spawn({
                show    : function(can, con) {
                    text(con, {
                        text    : 'Shoot LAH!',
                        coords  : [ can.width / 2, can.height / 2 ],
                        font    : '30px Calibri',
                        color   : '#ffffff',
                        align   : 'center'
                    });

                    text(con, {
                        text    : 'Press SPACEBAR to continue ...',
                        coords  : [ can.width / 2, can.height - 50 ],
                        font    : '15px Calibri',
                        color   : '#ffffff',
                        align   : 'center'
                    });
                },
                keyboard: function(keyName) {
                    if ('space' == keyName) {
                        clear();

                        currentScreen = screens.game;
                        render();
                    }
                }
            }),
            game    : Screen.spawn({
                properties  : {},
                show    : function(can, con) {
                    this.properties['spaceship'] = image(con, {
                        path    : require('path').normalize(__dirname + '/../public/images/spaceship-sprite.png')
                    });
                },
                keyboard: function(keyName) {
                    switch(keyName) {
                        case 'left':
                        case 'right':
                        case 'space':
                            break;
                    }
                }
            })
        },
        currentScreen   = screens.welcome;

    // clear the viewport 
    function clear(fillStyle) {
        if (fillStyle) {
            context.fillStyle = fillStyle;
        }

        context.fillRect(0, 0, options.width, options.height);
    }

    // write some text
    function text(context, options) {
        var coords          = options.coords;

        context.font        = options.font;
        context.fillStyle   = options.color;
        context.textAlign   = options.align;

        context.fillText(options.text, coords[0], coords[1]);
    }

    // draw an image
    function image(context, options) {
        var img     = new Image();

        img.onload  = function() {
            context.drawImage(img, 0, 0);
        };

        img.src     = options.path;

        return img;
    }

    function render() {
        context.save();

        // render the current screen
        currentScreen.show(canvas, context);

        context.restore();
    }

    // keyboard handler
    function keyboard(keyName) {
        currentScreen.keyboard(keyName);
    }

    // initialize the screen
    clear();
    
    // render the current screen to the viewport
    render();

    // return accessible screen object
    return {
        canvas      : canvas,
        screens     : screens,
        keyboard    : keyboard,
        render      : render
    };
})(options);
