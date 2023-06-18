const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BALLZ = [];

let LEFT, UP, RIGHT, DOWN;
let friction = 0.1;
class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vel_x = 0;
        this.vel_y = 0;
        this.acc_x = 0;
        this.acc_y = 0;
        this.acceleration = 1;
        this.player = false;
        BALLZ.push(this);
    }
    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.r,0,2*Math.PI);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = 'red';
        ctx.fill();
    }
    display() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.acc_x * 100, this.y + this.acc_y * 100);
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.vel_x * 10, this.y + this.vel_y * 10);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }
}

function keyControl(b) {
    window.addEventListener('keydown', (e) => {
        //console.log(e.key);
        if (e.keyCode === 37) {
            LEFT = true;
        } else if (e.keyCode === 38) {
            UP = true;
        } else if (e.keyCode === 39) {
            RIGHT = true;
        } else if (e.keyCode === 40) {
            DOWN = true;
        }
    })
    window.addEventListener('keyup', (e) => {
        //console.log(e.key);
        if (e.keyCode === 37) {
            LEFT = false;
        } else if (e.keyCode === 38) {
            UP = false;
        } else if (e.keyCode === 39) {
            RIGHT = false;
        } else if (e.keyCode === 40) {
            DOWN = false;
        }
    })
    if (LEFT) b.acc_x = -b.acceleration;
    if (UP) b.acc_y = -b.acceleration;
    if (RIGHT) b.acc_x = b.acceleration;
    if (DOWN) b.acc_y = b.acceleration;
    if (!UP && !DOWN){
        b.acc_y = 0;
    }
    if (!RIGHT && !LEFT) {
        b.acc_x = 0;
    }
    b.vel_x += b.acc_x;
    b.vel_y += b.acc_y;
    b.vel_x *= 1-friction;
    b.vel_y *= 1 - friction;
    b.x += b.vel_x;
    b.y += b.vel_y;
}


function mainLoop() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    BALLZ.forEach(b => {
        b.drawBall();
        if (b.player === true) {
            keyControl(b);
        }
        b.display();
    })
    requestAnimationFrame(mainLoop);
};
let Ball1 = new Ball(200,200,30);
let Ball2 = new Ball(300,300, 20);
Ball1.player = true;
Ball2.player = true;
mainLoop();

