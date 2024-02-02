//setup the canvas for drawing
let WIDTH = 800;
let HEIGHT = 600;

//get access to the canvas element
let canvas = document.getElementById("canvas");

canvas.width = WIDTH;
canvas.height = HEIGHT;
//canvas.style.background = "black";

// ctx is what we will call when we want to draw the canvas
let ctx = canvas.getContext("2d");

class Rectangle
{
    constructor(xpos, ypos, width, height, color)
    {
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height)
    }
}

class Asteroid {
    constructor(x, y, size, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.x + this.size * 0.3, this.y - this.size * 0.5);
        context.lineTo(this.x + this.size * 0.7, this.y - this.size * 0.7);
        context.lineTo(this.x + this.size * 0.5, this.y - this.size * 0.3);
        context.lineTo(this.x + this.size * 0.8, this.y);
        context.lineTo(this.x + this.size, this.y + this.size * 0.4);
        context.lineTo(this.x + this.size * 0.6, this.y + this.size * 0.8);
        context.lineTo(this.x, this.y + this.size * 0.5);
        context.lineTo(this.x - this.size * 0.5, this.y + this.size * 0.2);
        context.lineTo(this.x - this.size * 0.6, this.y);
        context.lineTo(this.x - this.size * 0.3, this.y - this.size * 0.5);
        context.closePath();

        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 2;
        context.stroke();
    }
}

class Circle
{
    constructor(xpos, ypos, radius, color)
    {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.xpos, this.ypos, this.radius, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
}

//create a rectangle with the given info
rect1 = new Rectangle(50, 50, 100, 100, "white");
rect2 = new Rectangle(200, 200, 50, 10, "red");
ast1 = new Asteroid(600, 100, 50, 20, 5);

circle1 = new Circle(WIDTH/2, HEIGHT/2, 50, "green");

rect1.draw(ctx);
rect2.draw(ctx);
ast1.draw(ctx);
circle1.draw(ctx);