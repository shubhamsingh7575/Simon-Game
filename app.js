//keyPress~ gamestart
//btnflash  + level 1
//btn press check user=game

let gameSeq=[];
let userSeq=[];

let btns =["yellow","red","purple","green"];

let started = false;
let level  = 0;
let h2 = document.querySelector("h2");

let maxi = 0;

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    // console.log(randIdx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    gameFlash(randbtn); 
}


function checkAns(idx){
    //  console.log("curr level: ",level);
    // let idx = level -1;
    if(userSeq[idx] === gameSeq[idx]){ 
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
            
        }
    }
    else{
        maxi = Math.max(maxi, level)
        h2.innerHTML= `Game Over! Your Score Was <b>${level}</b> <br> Press any key to start.<br>Highest Score ${maxi}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";  
        },150);
        
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn = this;
    
    userflash(btn); 

    usercolor =  btn.getAttribute("id");
    // console.log(usercolor);
    userSeq.push(usercolor);
    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");

for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq =[];
    userSeq =[];
    level=0;
}
