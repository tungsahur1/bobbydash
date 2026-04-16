let selected = 0;

function drawPlayer(p, color){
ctx.fillStyle = "#ffd39b"; // head
ctx.fillRect(p.x+8, p.y-8, 14, 14);

ctx.fillStyle = color; // shirt
ctx.fillRect(p.x, p.y, 30, 20);

ctx.fillStyle = "white"; // legs
ctx.fillRect(p.x+3, p.y+20, 8, 12);
ctx.fillRect(p.x+18, p.y+20, 8, 12);
}

function startSoccer(){
showScreen(null);
game.style.display="block";

let players = [
{x:150,y:200},
{x:150,y:350},
{x:150,y:500}
];

let enemies = [
{x:game.width-150,y:200},
{x:game.width-150,y:350},
{x:game.width-150,y:500}
];

let ball = {x:game.width/2,y:game.height/2,owner:null};

// PASS SYSTEM
game.onclick = (e)=>{
let rect = game.getBoundingClientRect();
let mx = e.clientX - rect.left;
let my = e.clientY - rect.top;

players.forEach((p,i)=>{
if(Math.hypot(mx-p.x,my-p.y)<40){
selected = i;
if(ball.owner !== null){
ball.owner = i;
}
}
});
};

loop = setInterval(()=>{
ctx.clearRect(0,0,game.width,game.height);

// FIELD
ctx.fillStyle="#0a7a0a";
ctx.fillRect(0,0,game.width,game.height);

// GOALS
ctx.fillStyle="white";
ctx.fillRect(0,game.height/2-120,20,240);
ctx.fillRect(game.width-20,game.height/2-120,20,240);

// PLAYER CONTROL
let p = players[selected];
let speed = 6;

if(keys["ArrowUp"]) p.y-=speed;
if(keys["ArrowDown"]) p.y+=speed;
if(keys["ArrowLeft"]) p.x-=speed;
if(keys["ArrowRight"]) p.x+=speed;

// KEEP IN BOUNDS
p.x = Math.max(0, Math.min(game.width-30, p.x));
p.y = Math.max(0, Math.min(game.height-30, p.y));

// PICKUP BALL (FIXED)
if(Math.hypot(p.x-ball.x,p.y-ball.y)<30){
ball.owner = selected;
}

// ENEMY AI
enemies.forEach(e=>{
let dx = ball.x - e.x;
let dy = ball.y - e.y;

e.x += dx * 0.04;
e.y += dy * 0.04;

// steal
if(Math.hypot(e.x-ball.x,e.y-ball.y)<25){
ball.owner = null;
}

// separation FIX
enemies.forEach(o=>{
if(o!==e){
let d=Math.hypot(e.x-o.x,e.y-o.y);
if(d<40){
e.x += (e.x-o.x)*0.1;
e.y += (e.y-o.y)*0.1;
}
}
});
});

// BALL FOLLOW
if(ball.owner !== null){
let owner = players[ball.owner];
ball.x = owner.x + 15;
ball.y = owner.y + 10;
}

// DRAW BALL
ctx.fillStyle="white";
ctx.beginPath();
ctx.arc(ball.x,ball.y,8,0,6.28);
ctx.fill();

// DRAW PLAYERS
players.forEach((pl,i)=>{
drawPlayer(pl, i===selected ? "#00ffff" : "#008888");
});

// DRAW ENEMIES
enemies.forEach(e=>{
drawPlayer(e,"red");
});

// GOALS
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
