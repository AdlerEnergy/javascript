//setup canvas for drawing

let cvs = document.getElementById("canvas");
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

cvs.width = WIDTH;
cvs.height = HEIGHT;

let ctx = cvs.getContext("2d");

class line{
    constructor(x1, y1, x2, y2, width, color)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.width = width;
        this.color = color;
    }

    // draw method
    draw(ctx)
    {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.closePath();
    }
}

class circleOutline
{
    constructor(x, y, radius, width, color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = width;
        this.color = color;
    }

    draw(ctx)
    {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 1*Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    }
}

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

class Triangle
{
    constructor(x1, y1, x2, y2, x3, y3, width, color)
    {
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;
        this.width = width;
        this.color = color;
    }

    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.lineTo(this.x1, this.y1);
        ctx.stroke();
        ctx.closePath();
    }
}

let line1 = new line(0, 0, WIDTH, HEIGHT, 5, "blue");
let line2 = new line(65, 10, 45, 500, 8, "blue")

let cir1 = new circleOutline(500, 700, 65, 5, "red");
let cir2 = new Circle(450, 450, 35, "white");
let cir3 = new Circle(100, 500, 35, "violet");
let cir4 = new Circle(1500, 160, 100, "grey");

let tri1 = new Triangle(234, 100, 200, 345, 483, 124, 5, "red");
let tri2 = new Triangle(800, 100, 950, 200, 650, 200, 5, "white");

let sqr1 = new Rectangle(1178, 500, 45, 100, "green");
let sqr2 = new Rectangle(978, 700, 400, 200, "black");

line1.draw(ctx);
line2.draw(ctx);
cir1.draw(ctx);
cir2.draw(ctx);
cir3.draw(ctx);
cir4.draw(ctx);
tri1.draw(ctx);
tri2.draw(ctx);
sqr1.draw(ctx);
sqr2.draw(ctx);