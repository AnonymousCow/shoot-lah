module.exports  = (function() {
    var size = {
        width   : 640,
        height  : 480 
    };

    var location = {
        x: 320,
        y: 320
    };

    var moveAmt = 10;

    var Canvas  = require('canvas'),
        canvas  = new Canvas(size.width, size.height),
        context = canvas.getContext('2d');

    function getX(angle) {
        return -Math.sin(angle + Math.PI);
    }

    function getY(angle) {
        return Math.cos(angle + Math.PI);
    }

    function moveLeft() {
        if (location.x >= moveAmt) {
            location.x -= moveAmt;
        }
    }

    function moveRight() {
        if (location.x <= (size.width - moveAmt)) {
            location.x += moveAmt;
        }
    }

    function update() {
        var now = new Date();
        var i, x, y;
        var hr, min, sec;

        context.fillRect(0, 0, size.width, size.height);

        context.save();
        context.translate(location.x, location.y);
        context.beginPath();
        context.lineWidth = 14;
        context.strokeStyle = '#325FA2';
        context.fillStyle = '#eeeeee';
        context.arc(0, 0, 142, 0, Math.PI * 2, true);
        context.stroke();
        context.fill();

        context.strokeStyle = '#000000';

        // Hour marks
        context.lineWidth = 8;

        for (i = 0; i < 12; i++) {
            x = getX(Math.PI / 6 * i);
            y = getY(Math.PI / 6 * i);

            context.beginPath();

            context.moveTo(x * 100, y * 100);
            context.lineTo(x * 125, y * 125);

            context.stroke();
        }

        // Minute marks
        context.lineWidth = 5;

        for (i = 0; i < 60; i++) {
            if (i % 5 != 0) {
                x = getX(Math.PI / 30 * i);
                y = getY(Math.PI / 30 * i);

                context.beginPath();

                context.moveTo(x * 117, y * 117);
                context.lineTo(x * 125, y * 125);

                context.stroke();
            }
        }

        sec = now.getSeconds();
        min = now.getMinutes();
        hr  = now.getHours();
        hr  = hr >= 12 ? hr - 12 : hr;

        context.fillStyle = "black";

        // write Hours
        x = getX(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
        y = getY(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
        context.lineWidth = 14;
        context.beginPath();
        context.moveTo(x * -20, y * -20);
        context.lineTo(x * 80, y * 80);
        context.stroke();

        // write Minutes
        x = getX((Math.PI / 30) * min + (Math.PI / 1800) * sec);
        y = getY((Math.PI / 30) * min + (Math.PI / 1800) * sec);

        context.lineWidth = 10;
        context.beginPath();
        context.moveTo(x * -28, y * -28);
        context.lineTo(x * 112, y * 112);
        context.stroke();

        // Write seconds
        x = getX(sec * Math.PI / 30);
        y = getY(sec * Math.PI / 30);
        context.strokeStyle = "#D40000";
        context.fillStyle = "#D40000";
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(x * -30, y * -30);
        context.lineTo(x * 83, y * 83);
        context.stroke();
        context.beginPath();
        context.arc(0, 0, 10, 0, Math.PI * 2, true);
        context.fill();
        context.beginPath();
        context.arc(x * 95, y * 95, 10, 0, Math.PI * 2, true);
        context.stroke();
        context.fillStyle = "#555";
        context.arc(0, 0, 3, 0, Math.PI * 2, true);
        context.fill();

        context.restore();
    }

    return {
        canvas      : canvas,
        update      : update,
        moveLeft    : moveLeft,
        moveRight   : moveRight
    };
})();
