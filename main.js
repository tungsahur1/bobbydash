const game = document.getElementById("game");
const ctx = game.getContext("2d");

function resize(){
game.width = innerWidth;
game.height = innerHeight;
}
resize();
onresize = resize;

// ===== DATA =====
let data = JSON.parse(localStorage.getItem("retroSave")) || {
coins:0
};

function save(){
localStorage.setItem("retroSave", JSON.stringify(data));
updateUI();
}

function updateUI(){
document.getElementById("coins").innerText = data.coins;
}

// ===== SCREEN SYSTEM =====
function showScreen(id){
stopGame();

document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
game.style.display = "none";

if(id) document.getElementById(id).classList.remove("hidden");
}

// ===== LOOP CONTROL =====
let loop = null;
let keys = {};

onkeydown = e => keys[e.key] = true;
onkeyup = e => keys[e.key] = false;

function stopGame(){
if(loop) clearInterval(loop);
loop = null;
}

// INIT
updateUI();
