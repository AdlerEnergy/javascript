// Define rgb function if necessary
function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

// Adjust WIDTH and HEIGHT to ensure they fit the screen properly
let WIDTH = 1200;
let HEIGHT = 600;

// Adjust canvas size based on the screen size
let cvs = document.getElementById("canvas");
cvs.width = WIDTH;
cvs.height = HEIGHT;

let score = 0;
let lives = 20;
let spawnInterval = 0.0025; 
let getFasterEvery_Circles = 0;
let ctx = cvs.getContext("2d");

function animate()
{
    if(lives > 0)
    {
        //clear context
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        //spawnNewCircles
        if(Math.random() < spawnInterval)
        {
            createNewCircle();
            getFasterEvery_Circles++;
            if(getFasterEvery_Circles > 5)
            {
                getFasterEvery_Circles = 0;
                spawnInterval += 0.0005;
            }
        }

        //update positions
        for(let i = 0; i <bullets.length; i += 1)
        {
            bullets[i].update(i);
        }
        for(let i = 0; i <circles.length; i += 1)
        {
            circles[i].update(i, bullets);
        }

        //check for colissions
        checkCollisions(circles, bullets);
        
        //
        myBase.draw(ctx);
        for(let i = 0; i < bullets.length; i += 1)
        {
            bullets[i].draw(ctx);
        }
        for(let i = 0; i < circles.length; i += 1)
        {
            circles[i].draw(ctx);
        }
        
        drawScore();
        requestAnimationFrame(animate);
        drawHealthBar()
    }
    else{
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }
}



class base
{
    constructor(xpos, ypos, radius, color)
    {
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.width = 5;

        //turret angle, length and color
        this.angle = 90;
        this.turretLength = 50;
        this.turretColor = "black";
        this.turretEndX = 0;
        this.turretEndY = 0;
    }

    draw(ctx)
    {
        ctx.fillStyle = this.color;

        //draw the base(half circle)

        ctx.beginPath();
        ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI, true);
        ctx.fill();
        ctx.closePath();

        //calculate and save turret end position
        this.turretEndX = this.xpos+this.turretLength*Math.cos(this.angle*Math.PI/180);
        this.turretEndY = this.ypos-this.turretLength*Math.sin(this.angle*Math.PI/180);

        // draw the turret from center of circle to a point
        ctx.strokeStyle = this.turretColor;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.xpos, this.ypos);
        ctx.lineTo(this.turretEndX, this.turretEndY);
        ctx.stroke();
        ctx.closePath();
    }

    rotateTurretLeft()
    {
        if(this.angle < 180)
        {
            this.angle += 5;
        }
    }

    rotateTurretRight()
    {
        if(this.angle > 0)
        {
            this.angle -= 5;
        }
    }

    returnEndX()
    {
        return this.turretEndX;
    }
    returnEndY()
    {
        return this.turretEndY;
    }
    returnTurretAngle()
    {
        return this.angle;
    }
}

class bullet{
    constructor(xpos, ypos, radius, color, dx, dy)
    {
        this.x = xpos;
        this.y = ypos;
        this.rad = radius;
        this.color = color;
        this.dy = dy;
        this.dx = dx;
        this.hitCounter = 0;
    }

    draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI, false)
        ctx.fill();
        ctx.closePath();
    }

    update(i)
    {
        this.x += this.dx;
        this.y += this.dy;
        if(this.x <= (0 + this.rad) || this.x >= (WIDTH - this.rad))
        {

        }
        if(this.x > WIDTH + this.rad || this.x < 0 - this.rad || this.y < 0)
        {
            spliceBullet(i);
        }
    }
    getX()
    {
        return this.x;
    }
    getY()
    {
        return this.y;
    }
    getRad()
    {
        return this.rad;
    }
}

//initialize variables
let myBase = new base(WIDTH/2, HEIGHT-10, 40, "red");
const bullets = [];
const circles = [];

//event listeners

cvs.setAttribute("tabindex", 0)
cvs.focus();
cvs.addEventListener("keydown", handle_keydown);

function handle_keydown(event)
{
    if(event.key == "ArrowRight")
    {
        myBase.rotateTurretRight();
    }
    if(event.key == "ArrowLeft")
    {
        myBase.rotateTurretLeft();
    }
    if(event.key == " ")
    {
        let endX = myBase.returnEndX();
        let endY = myBase.returnEndY();
        let angle = myBase.returnTurretAngle();
        let dx = 8*Math.cos(angle*Math.PI/180);
        let dy = -8*Math.sin(angle*Math.PI/180);
        
        let bullet1 = new bullet(endX, endY, 3, "blue", dx, dy);
        bullets.push(bullet1);
    }
}

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
        ctx.fillStyle = this.color;
        ctx.fillText(this.hitCounter, this.xpos, this.ypos);
        ctx.beginPath();
        ctx.arc(this.xpos, this.ypos, this.radius, 0, 2*Math.PI, false);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    update(i, bullets)
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
        if(this.ypos >= (HEIGHT))
        {
            spliceCircle(i);
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
    getDY()
    {
        return this.dy;
    }
    
}

function getDis(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2))
}

function checkCollisions(arrayCircles, arrayBullets) {
        for (let i = 0; i < arrayCircles.length; i+= 1) {
            for(let j = 0; j < arrayBullets.length; j += 1)
                {
                    if(arrayCircles[i] != null)                    
                    {
                        let distance = getDis(arrayCircles[i].getX(), arrayCircles[i].getY(), arrayBullets[j].getX(), arrayBullets[j].getY());
                        
                        // Check if circles are colliding
                        if (distance <= arrayCircles[i].getRad() + arrayBullets[j].getRad()) {
                            if(arrayCircles[i].getRad() > 20)
                            {
                                createNewBabyCircle(arrayCircles[i]);
                            }
                            arrayCircles.splice(i, 1);
                            arrayBullets.splice(j, 1);
                            score++;
                        }
                    }
                }
        }
    
}

function createNewCircle()
{
    let xpos = Math.random() * WIDTH;
    let ypos = -10; 
    let radius = 25; 
    let color = "green"; 
    let dy = Math.random() * 2; 
    

    let newCircle = new Circle(xpos, ypos, radius, color, 0, dy);
    circles.push(newCircle);
    
}

function createNewBabyCircle(deadCircle)
{
    let xpos = deadCircle.getX();
    let ypos = deadCircle.getY(); 
    let radius = 10; 
    let color = "green"; 
    let dy = deadCircle.getDY(); 
    let dx = Math.random() * 2; 
    

    let newCircle = new Circle(xpos, ypos, radius, color, dx, dy);
    circles.push(newCircle);
    dx = dx * -1;
    let newCircle2 = new Circle(xpos, ypos, radius, color, dx, dy);
    circles.push(newCircle2);
    
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000"; // Set color to black
    ctx.textAlign = "right"; // Align text to the right
    ctx.fillText("Score: " + score, canvas.width - 45, 30); // Draw score in the top right corner
}

function spliceBullet(i)
{
    bullets.splice(i, 1);
}
function spliceCircle(i)
{
    circles.splice(i, 1);
    lives--;
}


function isInteger(number) {
    return number % 1 === 0;
}
function drawHealthBar() {
    // Health bar parameters
    var barWidth = 200;
    var barHeight = 20;
    var xPos = (canvas.width - barWidth) / 2;
    var yPos = 15;
    
    // Draw background of health bar (black)
    ctx.fillStyle = "black";
    ctx.fillRect(xPos, yPos, barWidth, barHeight);
    
    // Calculate width of health bar based on health percentage
    var healthWidth = (lives / 20) * barWidth;
    
    // Draw health bar (red)
    ctx.fillStyle = "red";
    ctx.fillRect(xPos, yPos, healthWidth, barHeight);
    
    // Draw border around health bar (white)
    ctx.strokeStyle = "grey";
    ctx.strokeRect(xPos, yPos, barWidth, barHeight);
}

createNewCircle();

animate();