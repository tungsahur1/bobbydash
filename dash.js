window.startDash = startDash;
function startDash(){
showScreen(null);
game.style.display = "block";

let x = 200;
let y = game.height-150;
let vel = 0;

let spikes = [400,600,800];

loop = setInterval(()=>{
ctx.clearRect(0,0,game.width,game.height);

// bg
ctx.fillStyle="#111";
ctx.fillRect(0,0,game.width,game.height);

// ground
ctx.fillStyle="#333";
ctx.fillRect(0,game.height-100,game.width,100);

// spikes
ctx.fillStyle="red";
spikes.forEach(s=>{
ctx.beginPath();
ctx.moveTo(s,game.height-100);
ctx.lineTo(s+20,game.height-140);
ctx.lineTo(s+40,game.height-100);
ctx.fill();

if(x+40>s && x<s+40 && y+40>game.height-120){
showScreen("menu");
}
});

// cube
ctx.fillStyle="cyan";
ctx.fillRect(x,y,40,40);

// jump
if(keys[" "] && y>=game.height-150){
vel = -15;
}

vel += 1;
y += vel;

if(y > game.height-150){
y = game.height-150;
vel = 0;
}

x += 6;

},30);
}
