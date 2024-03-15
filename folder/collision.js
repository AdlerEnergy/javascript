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

        }
        //hit top or bottom wall
        if(this.ypos <= (0 + this.radius) || this.ypos >= (HEIGHT - this.radius))
        {
            this.dy = this.dy * -1;
            this.hitCounter += 1
        }
    }
    getX()
    {
        return this.xpos;
    }
    getY()
    {
        return this.ypos;
    }
    getRad()
    {
        return this.radius;
    }
    set_color(col)
    {
        this.color = col;
    }
    
}


function getDis(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2))
}

function checkCollisions(arrayCircles) {
    for (let i = 0; i < arrayCircles.length; i+= 1) {
        for (let j = i + 1; j < arrayCircles.length; j+= 1) {
            const cir1 = arrayCircles[i];
            const cir2 = arrayCircles[j];

            // Calculate distance between centers of two circles
            let distance = getDis(cir1.getX(), cir1.getY(), cir2.getX(), cir2.getY());

            // Check if circles are colliding
            if (distance <= cir1.getRad() + cir2.getRad()) {
                // Circles are colliding, change their color
                cir1.set_color("red");
                cir2.set_color("red");
            }
        }
    }
}

//game loop
function animate(){
    //clear context
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    //update all our positions
    for (let i = 0; i < arrayCircles.length; i += 1) {
        arrayCircles[i].update(ctx);
        arrayCircles[i].set_color("black");
    }

   checkCollisions(arrayCircles);

    //draw objects
    for (let i = 0; i < arrayCircles.length; i += 1) {
        arrayCircles[i].draw(ctx);
    }

    //schedule the next animation frame
    requestAnimationFrame(animate);
}

const arrayCircles = [];
let n = 5;
for (let i = 0; i < n; i += 1) {
    let randSize = Math.random() * 80 + 20;

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let rand_x = Math.random() * (WIDTH - 2 * randSize) + randSize;
    let rand_y = Math.random() * (HEIGHT - 2 * randSize) + randSize;

    let dxx = Math.random() * 10;
    let dyy = Math.random() * 10;

    let circle = new Circle(rand_x, rand_y, randSize, "black", dxx, dyy);
    arrayCircles.push(circle);
}

// Drawing random circles
for (let i = 0; i < arrayCircles.length; i += 1) {
    arrayCircles[i].draw(ctx);
}


//Start the animation loop
requestAnimationFrame(animate);
