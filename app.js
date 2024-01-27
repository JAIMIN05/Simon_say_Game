//Step
//1. Keypress -> gamestart
//2. btnflash + level 1
//3. btnpress[using eventlistener] -> check user <-> gamesequence(same - levelup and different - gameover)

let gameseq = [];
let userseq = [];
let maxscore = 0;

let btns = ["yellow","red","purple","green"];

let start = false;
let level = 0;

let h2 = document.querySelector("h2");

//step-1
document.addEventListener("keypress",function(){
    if(start == false){
        console.log("key");
        start = true;  
        
        levelup();
    }
})
//step-2 
function levelup(){
    userseq = []; 
    level++;
    h2.innerText = `Level ${level}`;
    // Level.push(level);

    //random button choose
    let randidx = Math.floor(Math.random() * 3);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    // console.log(randidx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);
}

function gameflash(btn){ // white color
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn){ //green color
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

//user press btn asseum we reach middle -> next btn press and check
// if we reach last btn then curr level idx == last idx then level up and game generate new color   

function Checkbtn(idx) {
    //check last level btn same or different
    
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length)//we check for last btn not check middle btn
        {
            setTimeout(levelup,1000);
        } 
    }else{
        h2.innerHTML = `Game over! Your score was <b>${level}<b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        
        reset();
    }
}

//user btn press
function btnpress(){
    let btn = this;
    userflash(btn);

    let usercolr = btn.getAttribute("id");
    userseq.push(usercolr);
    console.log(userseq);

    Checkbtn(userseq.length-1);
}

let allbtn = document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click",btnpress);
}

function reset() {
    // findmax();
    if(maxscore < level){
        maxscore = level;
        console.log(maxscore);
    }
    let h3 = document.querySelector("h3");
    h3.innerText = `Your Maximum score = ${maxscore}`;
    start = false;
    level = 0;
    gameseq = [];
    userseq = [];
}
