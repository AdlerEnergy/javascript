// Define rgb function if necessary
function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

// Adjust WIDTH and HEIGHT to ensure they fit the screen properly
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

// Adjust canvas size based on the screen size
let cvs = document.getElementById("canvas");
cvs.width = WIDTH;
cvs.height = HEIGHT;

let ctx = cvs.getContext("2d");

class Circle{
    constructor(xpos, ypos, radius, color, dx, dy)
    {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.width = 5;
        this.hitCounter = 0;
    }

    draw(ctx)
    {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(this.hitCounter, this.xpos, this.ypos);
        ctx.beginPath();
        ctx.arc(this.xpos, this.ypos, this.radius, 0, 2*Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    }

    update()
    {
        this.xpos += this.dx;
        this.ypos += this.dy;
        //hit left or right wall
        if(this.xpos <= (0 + this.radius) || this.xpos >= (WIDTH - this.radius))
        {
            this.dx = this.dx * -1;
            this.hitCounter += 1;
            if(this.radius > 5)
            {
                this.radius -= 2;
            }

        }
        //hit top or bottom wall
        if(this.ypos <= (0 + this.radius) || this.ypos >= (HEIGHT - this.radius))
        {
            this.dy = this.dy * -1;
            this.hitCounter += 1
            if(this.radius > 5)
            {
                this.radius -= 2;
            }
        }
    }
}

let cir1 = new Circle(WIDTH/2, HEIGHT/2, 50, "blue", -3, 2)

//game loop
function animate(){
    //clear context
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    //update all our positions
    cir1.update();
    for (let i = 0; i < arrayCircles.length; i += 1) {
        arrayCircles[i].update(ctx);
    }

    //draw objects
    cir1.draw(ctx);
    for (let i = 0; i < arrayCircles.length; i += 1) {
        arrayCircles[i].draw(ctx);
    }


    //schedule the next animation frame
    requestAnimationFrame(animate);
}

// Generating random circles
const arrayCircles = [];
let n = 10;
for (let i = 0; i < n; i += 1) {
    let randSize = Math.random() * 80 + 20;

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let rand_x = Math.random() * (WIDTH - 2 * randSize) + randSize;
    let rand_y = Math.random() * (HEIGHT - 2 * randSize) + randSize;

    let dxx = Math.random() * 10;
    let dyy = Math.random() * 10;

    let circle = new Circle(rand_x, rand_y, randSize, rgb(r, g, b), dxx, dyy);
    arrayCircles.push(circle);
}

// Drawing random circles
for (let i = 0; i < arrayCircles.length; i += 1) {
    arrayCircles[i].draw(ctx);
}


//Start the animation loop
requestAnimationFrame(animate);

