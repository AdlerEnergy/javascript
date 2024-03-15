// Adjust WIDTH and HEIGHT to ensure they fit the screen properly
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

// Adjust canvas size based on the screen size
let cvs = document.getElementById("canvas");
cvs.width = WIDTH;
cvs.height = HEIGHT;

let score = 0;

let ctx = cvs.getContext("2d");

cvs.addEventListener("keydown", handleKeydown);
cvs.addEventListener("keyup", handleKeyUp);

//ensure the canvas can recieve the keyboard 
cvs.setAttribute('tabindex', 0)
cvs.focus();

function handleKeydown(event)
{
    console.log(event);

    if(event.key == "ArrowRight")
    {
        circle1.setDX(2);
    }
    if(event.key == "ArrowLeft")
    {
        circle1.setDX(-2);
    }
    if(event.key == "ArrowDown")
    {
        circle1.setDY(2);
    }
    if(event.key == "ArrowUp")
    {
        circle1.setDY(-2);
    }
}

function handleKeyUp(event)
{
    if(event.key == "ArrowRight" || event.key == "ArrowLeft")
    {
        circle1.setDX(0);
    }
    if(event.key == "ArrowUp" || event.key == "ArrowDown")
    {
        circle1.setDY(0);
    }
}


class Circle{
    constructor(xpos, ypos, radius, color, dx, dy, num)
    {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.width = 5;
        this.num = 0;
    }

    draw(ctx)
    {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(this.num, this.xpos, this.ypos);
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

        }
        //hit top or bottom wall
        if(this.ypos <= (0 + this.radius) || this.ypos >= (HEIGHT - this.radius))
        {
            this.dy = this.dy * -1;
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

    setDX(dx1)
    {
        this.dx = dx1;
    }
    setDY(dy1)
    {
        this.dy = dy1;
    }
    
}

//return the distance between two points
function getDis(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2))
}

let circle1 = new Circle(150, 150, 20, "black", 0, 0)


function getDis(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2))
}

function checkCollisions(arrayCircles) {
    for (let i = 0; i < arrayCircles.length; i+= 1) {
            const cir1 = circle1;
            const cir2 = arrayCircles[i];

            // Calculate distance between centers of two circles
            let distance = getDis(cir1.getX(), cir1.getY(), cir2.getX(), cir2.getY());

            // Check if circles are colliding
            if (distance <= cir1.getRad() + cir2.getRad()) {
                // Circles are colliding, change their color
                arrayCircles.splice(i, 1);
                score++;
            }
        
    }
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000"; // Set color to black
    ctx.textAlign = "right"; // Align text to the right
    ctx.fillText("Score: " + score, canvas.width - 45, 30); // Draw score in the top right corner
}


//game loop
function animate()
{
    //clear context
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    //update postitions
    circle1.update();
    for (let i = 0; i < arrayCircles.length; i += 1) {
        arrayCircles[i].update(ctx);
    }
    checkCollisions(arrayCircles);

    //check for collisions

    if(arrayCircles.length == 0){
        remakeCircles(5);
    }

    //draw objects
    circle1.draw(ctx);
    for (let i = 0; i < arrayCircles.length; i += 1) {
        arrayCircles[i].draw(ctx);
    }
    drawScore();

    requestAnimationFrame(animate);
}

const arrayCircles = [];

function remakeCircles(cantidad)
{
let n = cantidad;
for (let i = 0; i < n; i += 1) {
    let randSize = Math.random() * 80 + 20;

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let rand_x = Math.random() * (WIDTH - 2 * randSize) + randSize;
    let rand_y = Math.random() * (HEIGHT - 2 * randSize) + randSize;

    let dxx = Math.random() * 10;
    let dyy = Math.random() * 10;

    let circle = new Circle(rand_x, rand_y, randSize, "red", dxx, dyy, i+1);
    arrayCircles.push(circle);
}
}

animate();