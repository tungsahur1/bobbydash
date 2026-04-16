let player, teammates, enemies, ball;
let power=0, goals=0, goalLimit=3;

function startSoccer(teamSize, goalMax){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
canvas.style.display="block";

running=true;
loopType="soccer";

goalLimit=goalMax;
goals=0;

/* PLAYER */
player={x:200,y:300};

/* TEAM */
teammates=[];
for(let i=0;i<teamSize-1;i++){
teammates.push({x:200,y:200+i*80});
}

/* ENEMIES */
enemies=[];
for(let i=0;i<teamSize;i++){
enemies.push({x:900,y:200+i*80});
}

/* BALL */
ball={x:500,y:300,vx:0,vy:0,owner:null};

requestAnimationFrame(gameLoop);
}

/* DRAW PLAYER WITH BODY */
function drawPlayer(p,color){
ctx.fillStyle="#ffd39b";
ctx.fillRect(p.x+6,p.y-8,10,10);

ctx.fillStyle=color;
ctx.fillRect(p.x,p.y,20,20);

ctx.fillStyle="white";
ctx.fillRect(p.x+3,p.y+20,5,10);
ctx.fillRect(p.x+12,p.y+20,5,10);
}

function soccerGame(){

ctx.fillStyle="#0a7a0a";
ctx.fillRect(0,0,canvas.width,canvas.height);

/* MOVEMENT */
let speed=5*data.speed;
if(keys["w"]) player.y-=speed;
if(keys["s"]) player.y+=speed;
if(keys["a"]) player.x-=speed;
if(keys["d"]) player.x+=speed;

/* BALL PICKUP */
if(Math.hypot(player.x-ball.x,player.y-ball.y)<30){
ball.owner=player;
}

if(ball.owner===player){
ball.x=player.x;
ball.y=player.y;
}

/* AUTO PASS (F) */
if(keys["f"]){
let nearest=teammates[0];
ball.owner=null;
ball.vx=(nearest.x-ball.x)/8;
ball.vy=(nearest.y-ball.y)/8;
}

/* POWER SHOT (E) */
if(keys["e"]){
power+=0.3;
}else if(power>0){
let dx=mouse.x-player.x;
let dy=mouse.y-player.y;
let d=Math.hypot(dx,dy)||1;

ball.owner=null;
ball.vx=dx/d*power;
ball.vy=dy/d*power;
power=0;
}

/* BALL MOVE */
if(!ball.owner){
ball.x+=ball.vx;
ball.y+=ball.vy;
ball.vx*=0.97;
ball.vy*=0.97;
}

/* ENEMY AI */
enemies.forEach(e=>{
let dx=ball.x-e.x;
let dy=ball.y-e.y;
let d=Math.hypot(dx,dy)||1;

e.x+=dx/d*2;
e.y+=dy/d*2;

if(Math.hypot(e.x-ball.x,e.y-ball.y)<20){
ball.owner=e;
}
});

/* GOAL */
if(ball.x>canvas.width-30){
goals++;
data.coins+=20;
data.xp+=10;

if(goals>=goalLimit){
data.lvl++;
save();
stopGame();
show("menu");
return;
}

ball={x:500,y:300,vx:0,vy:0,owner:null};
}

/* DRAW */
drawPlayer(player,"blue");
teammates.forEach(t=>drawPlayer(t,"cyan"));
enemies.forEach(e=>drawPlayer(e,"red"));

ctx.fillStyle="white";
ctx.beginPath();
ctx.arc(ball.x,ball.y,8,0,6.28);
ctx.fill();

/* AIM LINE */
ctx.strokeStyle = power>0 ? "red":"white";
ctx.beginPath();
ctx.moveTo(player.x,player.y);
ctx.lineTo(mouse.x,mouse.y);
ctx.stroke();
}
