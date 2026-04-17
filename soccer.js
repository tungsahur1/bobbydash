let player, teammates, enemies, ball;
let power=0, curve=false;

function startSoccer(size, goals){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
canvas.style.display="block";

running=true;
mode="soccer";

player={x:200,y:300,team:"blue"};

teammates=[];
for(let i=0;i<size-1;i++){
teammates.push({x:200,y:200+i*80,team:"blue"});
}

enemies=[];
for(let i=0;i<size;i++){
enemies.push({x:900,y:200+i*80,team:"red"});
}

ball={x:1000,y:500,vx:0,vy:0,owner:null};

requestAnimationFrame(loop);
}

function soccerGame(){

ctx.fillStyle="#0a7a0a";
ctx.fillRect(0,0,canvas.width,canvas.height);

/* GOALS */
ctx.fillStyle="white";
ctx.fillRect(canvas.width-30,200,30,200);
ctx.fillRect(0,200,30,200);

/* CROWD */
ctx.fillStyle="#222";
ctx.fillRect(0,0,canvas.width,80);
ctx.fillRect(0,canvas.height-80,canvas.width,80);

/* PLAYER MOVE */
let sp=5;
if(keys["w"]) player.y-=sp;
if(keys["s"]) player.y+=sp;
if(keys["a"]) player.x-=sp;
if(keys["d"]) player.x+=sp;

/* BALL PICKUP */
if(Math.hypot(player.x-ball.x,player.y-ball.y)<25){
ball.owner=player;
}

/* CONTROL SWITCH */
canvas.onclick=e=>{
let t=teammates.find(p=>Math.hypot(p.x-mouse.x,p.y-mouse.y)<30);
if(t){
let old=player;
player=t;
teammates.push(old);
teammates=teammates.filter(p=>p!==t);
}
};

/* POWER BAR */
if(keys["e"]){
power+=0.2;
if(power>10) power=10;
}

/* CURVE */
curve=keys[" "];

/* RELEASE SHOT */
if(!keys["e"] && power>0){
let dx=mouse.x-player.x;
let dy=mouse.y-player.y;
let d=Math.hypot(dx,dy)||1;

ball.owner=null;
ball.vx=dx/d*power;
ball.vy=dy/d*power;

if(curve){
ball.vx+=dy*0.1;
ball.vy-=dx*0.1;
}

power=0;
}

/* BALL MOVE */
if(!ball.owner){
ball.x+=ball.vx;
ball.y+=ball.vy;
ball.vx*=0.98;
ball.vy*=0.98;
}

/* TEAM AI */
teammates.forEach(t=>{
let dx=ball.x-t.x;
let dy=ball.y-t.y;
let d=Math.hypot(dx,dy)||1;

t.x+=dx/d*1.5;
t.y+=dy/d*1.5;
});

/* ENEMY AI SPLIT */
enemies.forEach((e,i)=>{
let target = i%2===0 ? ball : player;
let dx=target.x-e.x;
let dy=target.y-e.y;
let d=Math.hypot(dx,dy)||1;

e.x+=dx/d*2;
e.y+=dy/d*2;

/* steal */
if(Math.hypot(e.x-ball.x,e.y-ball.y)<40){
ball.owner=e;
}
});

/* DRAW */
draw(player,"blue");
teammates.forEach(t=>draw(t,"green"));
enemies.forEach(e=>draw(e,"orange"));

ctx.fillStyle="black";
ctx.beginPath();
ctx.arc(ball.x,ball.y,8,0,6.28);
ctx.fill();

/* AIM LINE */
ctx.strokeStyle=power>0?"red":"white";
ctx.beginPath();
ctx.moveTo(player.x,player.y);
ctx.lineTo(mouse.x,mouse.y);
ctx.stroke();
}

function draw(p,color){
ctx.fillStyle="#ffd39b";
ctx.fillRect(p.x+6,p.y-8,10,10);
ctx.fillStyle=color;
ctx.fillRect(p.x,p.y,20,20);
}
