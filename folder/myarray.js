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

class circleOutline {
    constructor(x, y, radius, width, color, text) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = width;
        this.color = color;
        this.text = text;
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x, this.y);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    }
}

// Drawing the initial circle
let cir1 = new circleOutline(WIDTH / 2, HEIGHT / 2, 50, 5, "orange", "Hello!");
cir1.draw(ctx);

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

    let circle = new circleOutline(rand_x, rand_y, randSize, 5, rgb(r, g, b), i);
    arrayCircles.push(circle);
}

// Drawing random circles
for (let i = 0; i < arrayCircles.length; i += 1) {
    arrayCircles[i].draw(ctx);
}
