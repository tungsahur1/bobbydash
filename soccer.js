let selectedPlayer = 0;

function startSoccer(){
showScreen(null);
game.style.display = "block";

// ===== TEAMS =====
let players = [
{x:150,y:200,vx:0,vy:0},
{x:150,y:350,vx:0,vy:0},
{x:150,y:500,vx:0,vy:0}
];

let enemies = [
{x:game.width-150,y:200},
{x:game.width-150,y:350},
{x:game.width-150,y:500}
];

let ball = {x:game.width/2,y:game.height/2,owner:null};

// ===== CLICK PASS =====
game.onclick = (e)=>{
let rect = game.getBoundingClientRect();
let mx = e.clientX - rect.left;
let my = e.clientY - rect.top;

// find teammate clicked
players.forEach((p,i)=>{
if(Math.abs(mx-p.x)<30 && Math.abs(my-p.y)<30){
selectedPlayer = i;
if(ball.owner !== null){
ball.owner = i;
}
}
});
};

// ===== LOOP =====
loop = setInterval(()=>{
ctx.clearRect(0,0,game.width,game.height);

// FIELD
ctx.fillStyle="green";
ctx.fillRect(0,0,game.width,game.height);

// GOALS
ctx.fillStyle="white";
ctx.fillRect(0,game.height/2-120,20,240);
ctx.fillRect(game.width-20,game.height/2-120,20,240);

// ===== PLAYERS =====
players.forEach((p,i)=>{

// movement input
if(i===selectedPlayer){
let speed=5;

if(keys["ArrowUp"]) p.y-=speed;
if(keys["ArrowDown"]) p.y+=speed;
if(keys["ArrowLeft"]) p.x-=speed;
if(keys["ArrowRight"]) p.x+=speed;
}

// animation color shift
ctx.fillStyle = (i===selectedPlayer) ? "#00ffff" : "#009999";
ctx.fillRect(p.x,p.y,30,30);

// ball pickup
if(Math.hypot(p.x-ball.x,p.y-ball.y)<25){
ball.owner = i;
}
});

// ===== ENEMIES =====
enemies.forEach(e=>{
let dx = ball.x - e.x;
let dy = ball.y - e.y;

// chase
e.x += dx * 0.03;
e.y += dy * 0.03;

// separation (FIX merge bug)
enemies.forEach(o=>{
if(o!==e){
let d=Math.hypot(e.x-o.x,e.y-o.y);
if(d<35){
e.x += (e.x-o.x)*0.1;
e.y += (e.y-o.y)*0.1;
}
}
});

// steal
if(Math.hypot(e.x-ball.x,e.y-ball.y)<25){
ball.owner = null;
}

ctx.fillStyle="red";
ctx.fillRect(e.x,e.y,30,30);
});

// ===== BALL LOGIC =====
if(ball.owner !== null){
let p = players[ball.owner];
ball.x = p.x;
ball.y = p.y;
}

// draw ball
ctx.fillStyle="white";
ctx.beginPath();
ctx.arc(ball.x,ball.y,10,0,6.28);
ctx.fill();

// ===== GOALS =====
if(ball.x > game.width-20){
data.coins += 100;
save();
showScreen("menu");
}

if(ball.x < 20){
showScreen("menu");
}

},30);
}
