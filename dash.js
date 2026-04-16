function startDash(){
showScreen(null);
game.style.display="block";

let x=200;
let y=game.height-150;
let vel=0;

let spikes=[400,500,600,750,900];

loop=setInterval(()=>{
ctx.clearRect(0,0,game.width,game.height);

// background
ctx.fillStyle="#001122";
ctx.fillRect(0,0,game.width,game.height);

// ground
ctx.fillStyle="#222";
ctx.fillRect(0,game.height-100,game.width,100);

// spikes
ctx.fillStyle="#ff0044";
spikes.forEach(s=>{
ctx.beginPath();
ctx.moveTo(s,game.height-100);
ctx.lineTo(s+20,game.height-140);
ctx.lineTo(s+40,game.height-100);
ctx.fill();

// collision
if(x+40>s && x<s+40 && y+40>game.height-120){
showScreen("menu");
}
});

// cube
ctx.fillStyle="#00ffff";
ctx.fillRect(x,y,40,40);

// FAST JUMP (FIXED)
if(keys[" "] && y>=game.height-150){
vel = -12;
}

vel += 0.8;
y += vel;

if(y>game.height-150){
y=game.height-150;
vel=0;
}

x += 9;

},30);
}

window.startDash = startDash;
