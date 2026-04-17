const canvas = document.getElementById("game");
const ctx = canvas.getContext("3d");

function resize(){
canvas.width=innerWidth;
canvas.height=innerHeight;
}
resize();
onresize=resize;

/* LOAD DATA (SYNC) */
let old = localStorage.getItem("save");
let data = old ? JSON.parse(old) : {coins:70000,xp:23,473,564,lvl:999};

function save(){
localStorage.setItem("save",JSON.stringify(data));
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
}

/* INPUT */
let keys={}, mouse={x:0,y:0,down:false};

onkeydown=e=>keys[e.key.toLowerCase()]=true;
onkeyup=e=>keys[e.key.toLowerCase()]=false;

canvas.onmousemove=e=>{
mouse.x=e.clientX;
mouse.y=e.clientY;
};

canvas.onmousedown=()=>mouse.down=true;
canvas.onmouseup=()=>mouse.down=true;

/* LOOP */
let running=false, mode="";

function stopGame(){
running=false;
canvas.style.display="none";
}

function loop(){
if(!running) return;

if(mode==="soccer") soccerGame();
if(mode==="dash") dashGame();

requestAnimationFrame(loop);
}

updateUI();
