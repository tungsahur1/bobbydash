function startDash(){
showScreen(null);
game.style.display="block";

let x=200;
let y=game.height-150;
let vel=0;

let spikes=[400,550,700,900];

loop=setInterval(()=>{
ctx.clearRect(0,0,game.width,game.height);

// background (GD style)
ctx.fillStyle="#0a0a1a";
ctx.fillRect(0,0,game.width,game.height);

// ground
ctx.fillStyle="#222";
ctx.fillRect(0,game.height-100,game.width,100);

// spikes
ctx.fillStyle="#ff0044";
spikes.forEach(s=>{
ctx.beginPath();
ctx.moveTo(s,game.height-100);
ctx.lineTo(s+20,game.height-150);
ctx.lineTo(s+40,game.height-100);
ctx.fill();

// FIXED collision
if(x+40 > s && x < s+40 && y+40 > game.height-120){
showScreen("menu");
}
});

// cube
ctx.fillStyle="#00ffff";
ctx.fillRect(x,y,40,40);

// jump
if(keys[" "] && y>=game.height-150){
vel=-18;
}

vel+=1;
y+=vel;

if(y>game.height-150){
y=game.height-150;
vel=0;
}

x+=7;

},30);
}

window.startDash = startDash;
