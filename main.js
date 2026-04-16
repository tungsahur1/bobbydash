const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
canvas.width = innerWidth;
canvas.height = innerHeight;
}
resize();
onresize = resize;

/* DATA */
let data = JSON.parse(localStorage.getItem("save")) || {
coins:0,
xp:0,
lvl:1,
speed:1,
diff:1
};

function save(){
localStorage.setItem("save", JSON.stringify(data));
updateUI();
}

function updateUI(){
document.getElementById("topbar").innerText =
`Coins: ${data.coins} | XP: ${data.xp} | LVL: ${data.lvl}`;
}

/* SCREENS */
function show(id){
stopGame();
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
canvas.style.display="none";
}

/* INPUT */
let keys={}, mouse={x:0,y:0};
onkeydown=e=>keys[e.key.toLowerCase()]=true;
onkeyup=e=>keys[e.key.toLowerCase()]=false;
canvas.onmousemove=e=>{
mouse.x=e.clientX;
mouse.y=e.clientY;
};

/* LOOP */
let running=false, loopType="";

function stopGame(){
running=false;
canvas.style.display="none";
}

function gameLoop(){
if(!running) return;

if(loopType==="soccer") soccerGame();
if(loopType==="dash") dashGame();

requestAnimationFrame(gameLoop);
}

updateUI();
