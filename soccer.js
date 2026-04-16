function startSoccer(){
showScreen(null);
game.style.display = "block";

let player = {x:200,y:200};
let enemy = {x:game.width-200,y:200};
let ball = {x:game.width/2,y:game.height/2};

loop = setInterval(()=>{
ctx.clearRect(0,0,game.width,game.height);

// field
ctx.fillStyle = "green";
ctx.fillRect(0,0,game.width,game.height);

// ball
ctx.fillStyle="white";
ctx.beginPath();
ctx.arc(ball.x,ball.y,10,0,6.28);
ctx.fill();

// player
ctx.fillStyle="cyan";
ctx.fillRect(player.x,player.y,30,30);

// enemy
ctx.fillStyle="red";
ctx.fillRect(enemy.x,enemy.y,30,30);

// movement
if(keys["ArrowUp"]) player.y -= 5;
if(keys["ArrowDown"]) player.y += 5;
if(keys["ArrowLeft"]) player.x -= 5;
if(keys["ArrowRight"]) player.x += 5;

// ball follow
if(Math.abs(player.x-ball.x)<30){
ball.x = player.x;
ball.y = player.y;
}

// enemy AI
let dx = ball.x - enemy.x;
let dy = ball.y - enemy.y;
enemy.x += dx * 0.03;
enemy.y += dy * 0.03;

// goal
if(ball.x > game.width-20){
data.coins += 50;
save();
showScreen("menu");
}

if(ball.x < 20){
showScreen("menu");
}

},30);
}
