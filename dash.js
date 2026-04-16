function startDash(){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
canvas.style.display="block";

running=true;
loopType="dash";

cube={x:150,y:300,vy:0};
spikes=[{x:600},{x:900}];

requestAnimationFrame(gameLoop);
}

let cube, spikes;

function dashGame(){

ctx.fillStyle="#001122";
ctx.fillRect(0,0,canvas.width,canvas.height);

cube.vy+=0.5;
cube.y+=cube.vy;

if(keys[" "] && cube.y>=300){
cube.vy=-8;
}

if(cube.y>300){
cube.y=300;
cube.vy=0;
}

spikes.forEach(s=>{
s.x-=4;

if(s.x<-20) s.x=canvas.width+200;

if(cube.x<s.x+20 && cube.x+20>s.x && cube.y+20>300){
stopGame();
show("menu");
}

ctx.fillStyle="red";
ctx.fillRect(s.x,300,20,20);
});

ctx.fillStyle="cyan";
ctx.fillRect(cube.x,cube.y,20,20);
}
