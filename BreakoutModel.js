function BreakoutModel() {
    var screenWidth, screenHeight;
    var ballR;
    var ncx, ncy;
    var dx = 1;
    var dy = -1;
    var brickWidth = 25;
    var number_bricks;
    var paddleX, paddleY, paddleWidth, paddleHeight;
    var bricks = [];
    var check, reset;
    var score = 0;
    var lives = 3;

    this.move_paddle = function (x, gamma) {


        if (gamma < 0 && parseInt(x) > 0) {
            x = parseInt(x) + parseInt(gamma / 3);
            return x;
        }
        else if (gamma > 0 && parseInt(x) <= parseInt(screenWidth - paddleWidth)) {
            x = parseInt(x) + parseInt(gamma / 3);
            return x;
        }
        else {
            return x;
        }
    };

    function collision_detection(cx, cy) {
        paddleX = parseInt(paddleX);
        paddleY = parseInt(paddleY);
        paddleWidth = parseInt(paddleWidth);
        paddleHeight = parseInt(paddleHeight);
        ballR = parseInt(ballR);
        brickWidth = parseInt(brickWidth.toString());

        //check for collision with top wall
        if (cy + dy < 0 + ballR) {
            dy = -dy;
        }
        //check for collision with left & right walls
        if (cx + dx > screenWidth - ballR || cx + dx < 0 + ballR) {
            dx = -dx;
        }

        //check for collision with paddle surface
        //top surface
        var x = paddleY - ballR;
        if (cy + dy >= x && (cx + dx <= paddleX + paddleWidth && cx + dx >= paddleX)) {
            dy = -dy;
        }
        //side surfaces
        if (cx + dx >= paddleX - ballR && cx + dx - ballR < paddleX + paddleWidth
            && (cy + ballR >= paddleY)) {
            dx = -dx;
        }
        //paddle edges
        if ((cx + dx >= paddleX - ballR && cx + dx <= paddleX + paddleWidth + ballR)
            && (cy + dy >= paddleY - ballR)) {
            dx = -dx;
            dy = -dy;
        }

        //check collision with bricks

        //bottom & top surface

        for (var i = 0; i < number_bricks; i++) {
            if (bricks["brick" + i.toString()] !== null) {
                // top and bottom surfaces
                if (cy + dy >= bricks["brick" + i.toString()][1] - ballR && cy + dy <= bricks["brick" + i.toString()][1] + brickWidth / 2 + ballR
                    && (cx + dx >= bricks["brick" + i.toString()][0] && cx + dx <= bricks["brick" + i.toString()][0] + brickWidth)) {
                    dy = -dy;
                    check = 1;


                }
                //side surfaces
                if ((cx + dx >= bricks["brick" + i.toString()][0] - ballR && cx + dx <= bricks["brick" + i.toString()][0] + brickWidth + ballR)
                    && (cy + dy >= bricks["brick" + i.toString()][1] && cy + dy <= bricks["brick" + i.toString()][1] + brickWidth / 2)) {
                    dx = -dx;
                    check = 1;
                }
                //edges
                if ((cx + dx > bricks["brick" + i.toString()][0] - ballR && cx + dx <= bricks["brick" + i.toString()][0] + brickWidth + ballR)
                    && (cy + dy >= bricks["brick" + i.toString()][1] - ballR && cy + dy - ballR <= bricks["brick" + i.toString()][1] + brickWidth/2)) {
                    dx = -dx;
                    dy = -dy;
                    check = 1;
                }

                if (check === 1) {
                    document.getElementById("brick" + i.toString()).remove();
                    bricks["brick" + i.toString()] = null;
                    check = 0;
                    score++;
                }
            }
        }


        //check for game over condition
        if (cy + dy > screenHeight - ballR) {
            reset = true;
            lives--;
        }

    }
    this.move_ball = function (cx, cy) {
        cx = parseInt(cx);
        cy = parseInt(cy);
        console.log(cy);
        collision_detection(cx, cy);
        ncy = cy + dy;
        ncx = cx + dx;
        if(reset) {
            ncx = 210;
            ncy = 300;
            dx = 1;
            dy = -dx;
            reset = false;
        }
    };


    this.set_screenWidth = function (width) {
        screenWidth = width;
    };

    this.set_screenHeight = function (height) {
        screenHeight = height;
    };

    this.set_paddleWidth = function (width) {
        paddleWidth = width;
    };

    this.get_ncx = function () {
        return ncx;
    };

    this.get_ncy = function () {
        return ncy;
    };

    this.set_ballR = function (radius) {
        ballR = radius;
    };
    this.get_lives = function () {
        return lives;
    };
    this.get_score = function () {
        return score;
    };
    this.set_paddleX = function (x) {
        paddleX = x;
    };

    this.set_paddleY = function (y) {
        paddleY = y;
    };

    this.set_paddleHeight = function (height) {
        paddleHeight = height;
    };

    this.set_bricks_array = function (array) {
        bricks = array;
    };
    this.set_limit = function (limit) {
        number_bricks = limit
    };
}