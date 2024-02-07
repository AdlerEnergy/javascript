//setup canvas for drawing
let cvs = document.getElementById("canvas");
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

cvs.width = WIDTH;
cvs.height = HEIGHT;

let ctx = cvs.getContext("2d");

class circleOutline
{
    constructor(x, y, radius, width, color, text)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = width;
        this.color = color;
        this.text = text;
    }

    draw(ctx)
    {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x, this.y);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    }
}


let cir1 = new circleOutline(WIDTH/2, HEIGHT/2, 50, 5, "orange", "Hello!")

cir1.draw(ctx);

const arrayCircles = [];
let n = 5;
for (let i=0; i<n; i+=1)
{
    let rand_x = Math.random()*WIDTH;
    let rand_y = Math.random()*HEIGHT;
    
    let circle = new circleOutline(rand_x, rand_y, 50, 5, "black", i);
    arrayCircles.push(circle);
}

for(let i=0; i<arrayCircles.length; i+=1)
{
    arrayCircles[i].draw(ctx);
}