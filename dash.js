let cube, spikes, progress=0;

function startDash(){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
canvas.style.display="block";

running=true;
mode="dash";

cube={x:150,y:300,vy:0};
spikes=[{x:600},{x:900}];
progress=0;

requestAnimationFrame(loop);
}

function dashGame(){

/* BACKGROUND CHANGE */
let p = progress/100;
if(p<0.35) ctx.fillStyle="red";
else if(p<0.7) ctx.fillStyle="purple";
else ctx.fillStyle="blue";

ctx.fillRect(0,0,canvas.width,canvas.height);

/* PROGRESS */
progress+=0.1;

/* GRAVITY */
cube.vy+=0.5;
cube.y+=cube.vy;

/* JUMP */
if((keys[" "]||keys["w"]||keys["arrowup"]) && cube.y>=300){
cube.vy=-8;
}

/* FLOOR */
if(cube.y>300){
cube.y=300;
cube.vy=0;
}

/* SPIKES */
spikes.forEach(s=>{
s.x-=4;
if(s.x<-20) s.x=canvas.width+200;

if(cube.x<s.x+20 && cube.x+20>s.x && cube.y+20>300){
stopGame();
show("menu");
}

ctx.fillStyle="black";
ctx.fillRect(s.x,300,20,20);
});

/* DRAW */
ctx.fillStyle="cyan";
ctx.fillRect(cube.x,cube.y,20,20);

/* BAR */
ctx.fillStyle="white";
ctx.fillRect(0,10,progress*5,10);
}
