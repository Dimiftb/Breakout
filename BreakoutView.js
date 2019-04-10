function BreakoutView() {
    var paddle1 = document.getElementById("paddle1");
    // var paddle2 = document.getElementById("paddle2");
    var svg = document.getElementById("mainSvg");
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var ball = document.getElementById("ball");
    var row1 = document.getElementById("row1");
    var row2 = document.getElementById("row2");
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");

    this.init = function () {
        paddle1.setAttribute("x", (screenWidth / 2).toString());
        paddle1.setAttribute("width", (screenWidth / 3).toString());
        paddle1.setAttribute("y", (screenHeight - paddle1.getAttribute("height")).toString());
    };


    this.get_paddle = function () {
        return paddle1;
    };

    this.get_ball = function () {
        return ball;
    };

    this.get_screenWidth = function () {
        return screenWidth;
    };
    this.get_screenHeight = function () {
        return screenHeight;
    };

    this.get_bricks_row1 = function () {
        return row1;
    };

    this.get_bricks_row2 = function () {
        return row2;
    };

    this.get_bricks_row3 = function () {
        return row3;
    };

    this.get_bricks_row4 = function () {
        return row4;
    };
    this.get_svg = function () {
        return svg;
    };

    this.get_all_bricks = function () {
        var bricks = [];
        var x, y;

        for (var count = 0; count < 300; count++) {
            if (document.getElementById("brick" + count.toString())) {
                x = document.getElementById("brick" + count.toString()).getAttribute("x");
                y = document.getElementById("brick" + count.toString()).getAttribute("y");
                bricks["brick" + count.toString()] = [parseInt(x), parseInt(y)];
            }
        }
        return bricks;
    };
}