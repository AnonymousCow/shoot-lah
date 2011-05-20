// screen.js

var Screen = module.exports = (function screen() {
    return Object.spawn({
        props   : null,
        show    : function(canvas, context) {
            // what to show
        },
        keyboard: function(keyName) {
            // keyboard handler
        }
    });
})();
