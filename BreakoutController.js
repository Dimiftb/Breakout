var model = new BreakoutModel();
var view = new BreakoutView();

function BreakoutController() {
    var gamma = null;
    var limit = null;

    this.init = function () {
        view.init();
        init_bricks();
        model.set_limit(limit);
        model.set_bricks_array(view.get_all_bricks());
        model.set_screenWidth(view.get_screenWidth());
        model.set_screenHeight(view.get_screenHeight());
        model.set_ballR(view.get_ball().getAttribute("r"));
        model.set_paddleWidth(view.get_paddle().getAttribute("width"));
        model.set_paddleHeight(view.get_paddle().getAttribute("height"));

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function (event) {
                gamma = event.gamma;
                view.get_paddle().setAttribute("x", model.move_paddle(view.get_paddle().getAttribute("x"), Math.round(gamma)));
            }, false);
        }
       var interval = setInterval(function () {
            model.set_paddleX(view.get_paddle().getAttribute("x"));
            model.set_paddleY(view.get_paddle().getAttribute("y"));
            document.getElementById("lives").innerHTML = "lives " + model.get_lives().toString() +  " |" +" score " + model.get_score().toString() ;
          //  document.getElementById("m").innerHTML = view.get_paddle().getAttribute("width");
            model.move_ball(view.get_ball().getAttribute("cx"), view.get_ball().getAttribute("cy"));
            view.get_ball().setAttribute("cx", model.get_ncx());
            view.get_ball().setAttribute("cy", model.get_ncy());
           if(model.get_lives() === 0) {
               console.log(model.get_lives());

               clearInterval(interval);
               window.alert("Game over");
               window.location.reload()
           }
           if(model.get_score() === limit) {
               clearInterval(interval);
               window.alert("Congratulations! You've won the game");
               window.location.reload();
           }
        }, 0.7);

    };

    function init_bricks() {
        var space = 5;
        var x = 5;
        var width =  25;
        var number_bricks = Math.floor(view.get_screenWidth()/(width + space));
       // var brick_height = view.get_screenHeight()/2.5;
        for (var i = 0; i < number_bricks; i++) {
            var brick0 = document.createElementNS("http://www.w3.org/2000/svg","rect");
            brick0.setAttribute("id", "brick" + i.toString());
            brick0.setAttribute("x", x.toString());
            brick0.setAttribute("y", "0");
            brick0.setAttribute("width", width.toString());
            brick0.setAttribute("height", (width/2).toString());
            brick0.setAttribute("fill","red");
            brick0.setAttribute("stroke-width", "1");
            brick0.setAttribute("stroke", "black");

            var brick1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
            brick1.setAttribute("id", "brick" + (number_bricks +i).toString());
            brick1.setAttribute("x", x.toString());
            brick1.setAttribute("y",  (width/2 + space).toString());
            brick1.setAttribute("width", width.toString());
            brick1.setAttribute("height", (width/2).toString());
            brick1.setAttribute("fill","red");
            brick1.setAttribute("stroke-width", "1");
            brick1.setAttribute("stroke", "black");

            var brick2 = document.createElementNS("http://www.w3.org/2000/svg","rect");
            brick2.setAttribute("id", "brick" + ((number_bricks*2) +i ).toString());
            brick2.setAttribute("x", x.toString());
            brick2.setAttribute("y", (2 * (width/2 + space)).toString());
            brick2.setAttribute("width", width.toString());
            brick2.setAttribute("height", (width/2).toString());
            brick2.setAttribute("fill","red");
            brick2.setAttribute("stroke-width", "1");
            brick2.setAttribute("stroke", "black");

            var brick3 = document.createElementNS("http://www.w3.org/2000/svg","rect");
            brick3.setAttribute("id", "brick" + ((number_bricks*3) +i ).toString());
            brick3.setAttribute("x", x.toString());
            brick3.setAttribute("y", (3 * (width/2 + space)).toString());
            brick3.setAttribute("width", width.toString());
            brick3.setAttribute("height", (width/2).toString());
            brick3.setAttribute("fill","red");
            brick3.setAttribute("stroke-width", "1");
            brick3.setAttribute("stroke", "black");

            view.get_bricks_row1().appendChild(brick0);
            view.get_bricks_row2().appendChild(brick1);
            view.get_bricks_row3().appendChild(brick2);
            view.get_bricks_row4().appendChild(brick3);
            x += width + space;
        }
        limit = number_bricks * 4;
    }

}

var controller = new BreakoutController();
window.addEventListener("load", function () {
    controller.init();
});