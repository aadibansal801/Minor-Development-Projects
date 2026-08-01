let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let high = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function(){
    if(started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomNum = Math.floor(Math.random() * 4);
    let randomColor = btns[randomNum];
    let randombtn = document.querySelector(`.${randomColor}`);
    //random btn
    gameSeq.push(randomColor);
    gameflash(randombtn);
}

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx){
    // console.log("curr level: " + level);
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        if(level - 1 > high){
            high = level - 1;
        }   
        h2.innerHTML = `Game Over, Score: ${level - 1} | High Score: ${high} <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor  = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}