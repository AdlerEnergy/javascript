// Define rgb function if necessary
function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

// Adjust WIDTH and HEIGHT to ensure they fit the screen properly
let WIDTH = 1200;
let HEIGHT = 700;

// Adjust canvas size based on the screen size
let cvs = document.getElementById("canvas");
cvs.width = WIDTH;
cvs.height = HEIGHT;

let score = 0;

let ctx = cvs.getContext("2d");

class rotateCircle{
    constructor(radius, color, orgX, orgY, dist, angle)
    {
        this.radius = radius;
        this.color = color;
        this.orgX = orgX;
        this.orgY = orgY;
        this.dist = dist;
        this.angle = angle;
        this.width = 3;
    }

    draw(ctx)
    {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        //draw the origin

        ctx.beginPath();
        ctx.arc(this.orgX, this.orgY, 2, 0, 2*Math.PI, false)
        ctx.stroke();
        ctx.closePath();

        //calculate the relative x and y distances for the real circle
        let tempX = this.dist * (Math.cos(this.angle*Math.PI/180));
        let tempY = this.dist * (Math.sin(this.angle*Math.PI/180));

        //draw the real circle
        ctx.beginPath();
        ctx.arc(this.orgX + tempX, this.orgY + tempY, this.radius, 0, 2*Math.PI, false);
        ctx.stroke();
        ctx.closePath();

    }

    update()
    {
        this.angle += 1;
    }
}

let circle1 = new rotateCircle(20, "black", WIDTH/2, HEIGHT/2, 200, 0);
let circle2 = new rotateCircle(20, "red", WIDTH/2, HEIGHT/2, 200, 180);

const arrayCircles = [];
let n = 8;
for (let i = 0; i < n; i += 1) {

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let circle = new rotateCircle(20, rgb(r, g, b), WIDTH/2, HEIGHT/2, 200, i * 45);
    arrayCircles.push(circle);
}

//game loop
function animate()
{
    //clear canvas
    //ctx.clearRect(0, 0, WIDTH, HEIGHT);

    //update positions
    circle1.update();
    circle2.update();
    //check for collisions

    //draw objects

    // Drawing random circles
    for (let i = 0; i < arrayCircles.length; i += 1) {
        arrayCircles[i].update();
        arrayCircles[i].draw(ctx);
    }


    requestAnimationFrame(animate);
}

animate();