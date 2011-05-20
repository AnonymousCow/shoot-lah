// our document is ready
$(document).ready(function() {
    var viewport    = $('#viewport')[0],
        context     = viewport.getContext('2d'),
        pending     = false,
        runEvery    = 40;

    now.name            = prompt('What is your name?', 'Generic Person') || 'Generic Person';

    now.receiveMessage  = function receiveMessage(name, message) {
        $('<div />').text(name + ': ' + message).appendTo('#messages');
    };

    now.receiveImage    = function(data) {
        var image = new Image();

        image.onload = function(e) {
            context.drawImage(e.target, 0, 0);
        };

        image.src = data;
    };

    $('#chat-button').click(function(event) {
        now.distributeMessage($('#chat-text').val());

        $('#chat-text').val('');
    });

    now.ready(function() {
        $(document).keylisten(function(e) {
            if (pending) {
                console.log('stop spamming bitch!');

                return;
            }

            var keyName = e.keyName;

            switch(keyName) {
                case 'space':
                case 'up'   :
                case 'down' :
                case 'left' :
                case 'right':
                    pending = true;

                    setTimeout(function() {
                        now.keyboard(keyName);

                        pending = false;
                    }, runEvery);
            }
        });
    });
});
