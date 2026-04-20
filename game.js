const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load Graphics Assets
const playerImg = new Image();
playerImg.src = 'assets/player.png'; // Ningalude character image
const mapImg = new Image();
mapImg.src = 'assets/map_texture.jpg'; // Grass athallekil Ground texture

let player = { x: 2000, y: 2000, size: 50, speed: 5, angle: 0 };
let camera = { x: 0, y: 0 };
let bullets = [];
let enemies = [];

// Movement Controls
let keys = {};
window.onkeydown = (e) => keys[e.key] = true;
window.onkeyup = (e) => keys[e.key] = false;

// Shoot
window.onmousedown = (e) => {
    let dx = e.clientX - canvas.width/2;
    let dy = e.clientY - canvas.height/2;
    let angle = Math.atan2(dy, dx);
    bullets.push({ x: player.x, y: player.y, angle: angle, speed: 15 });
};

function update() {
    if (keys['w'] || keys['ArrowUp']) player.y -= player.speed;
    if (keys['s'] || keys['ArrowDown']) player.y += player.speed;
    if (keys['a'] || keys['ArrowLeft']) player.x -= player.speed;
    if (keys['d'] || keys['ArrowRight']) player.x += player.speed;

    // Camera follow player
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;

    bullets.forEach((b, i) => {
        b.x += Math.cos(b.angle) * b.speed;
        b.y += Math.sin(b.angle) * b.speed;
        if (Math.abs(b.x - player.x) > 1000) bullets.splice(i, 1);
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // Draw Map (4000x4000 Map size)
    ctx.fillStyle = "#3a5a40"; // Battle Royale Green
    ctx.fillRect(0, 0, 4000, 4000); 

    // Draw Bullets
    bullets.forEach(b => {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(b.x, b.y, 5, 0, Math.PI*2);
        ctx.fill();
    });

    // Draw Player
    ctx.fillStyle = "blue"; 
    ctx.fillRect(player.x - 25, player.y - 25, 50, 50); // Assets illenkil box ayi kanikkum

    ctx.restore();
    requestAnimationFrame(draw);
}

setInterval(update, 1000/60);
draw();
