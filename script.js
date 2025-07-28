let machine = [];
let user = [];
let started = false;
let level = 0;
let score = -10;
let order =0;
let idgameover =0;
let key = 0;


//-----------------------------------
//part 1 
//------------------------------------
document.querySelector(".prevent").style.display = "block"; //prevent user to click any panels


let idblink = setInterval(() => {    //Setting the blink msg at start
   let msg = document.querySelector(".msg");
    msg.style.display = (msg.style.display == "block")?"none":"block";
}, 570);

document.addEventListener("keydown",function(){ //detects any key to start the game
  if (key == 0){
   key =1;
   order = 0;
  user = [];
    if(started == false){ //make sure it started
        clearInterval(idblink);
        document.querySelector(".msg").style.display = "none";
        started =true;
        document.querySelector(".prevent").style.display = "none";
     } else if (idgameover != 0){ //make sure everything is clear after gameover
         clearInterval(idgameover);
        document.querySelector(".msg").style.display = "none";
        idgameover =0;
        document.querySelector(".prevent").style.display = "none";
     }

   document.querySelector(".level").children[0].textContent = `${++level}`; //upgrading the level
   score = score + 10;
   document.querySelector(".score").innerHTML = `Score: ${score}`; //updating the score

   machineturn(); //Machine will blink the colors
  }
})

let allBtns = document.querySelectorAll(".panel"); //detects the panel color after clicking
for (const btn of allBtns) {
   btn.addEventListener("click",function(){
      display(this.getAttribute("id"))
      user.push(this.getAttribute("id"));
      order++;
      check(order);
   })
}

//-----------------------------------------
//part 2 (All the functions ,which runs after getting called)
//-----------------------------------------

function machineturn(){
     machine.push(randomColor()); //gets generated color
     let index=0;
     //showing all the colors by machine
     const itrid = setInterval(() => {  //**** 
                 display(document.querySelector(`.${machine[index]}`).getAttribute("id")); //sends the id name as a color
                 index++;
          if (index >= machine.length) {
              clearInterval(itrid);
            }
        }, 800);
}

function check(a){
   console.log(user,machine);  
   if(machine[a-1]!=user[a-1]){
      gameover();
   }else if(machine.length == user.length){
      restart();
   }
}

function restart(){
   document.querySelector(".level").children[0].textContent = `${++level}`; //upgrading the level
   score = score + 10;
    document.querySelector(".score").innerHTML = `Score: ${score}`; //updating the score
    
    user = [];
     order =0;
   machineturn();
}

function gameover(){
document.querySelector(".prevent").style.display = "block"; //prevent users to click any panels

level = 0; //updating the level
document.querySelector(".level").children[0].textContent = `${level}`;
score = 0; //updating the score
document.querySelector(".score").innerHTML = ` Score: 0`;


user = [];
machine = [];
order = 0;

let id = setInterval(() => {    //Setting the blink msg after game over
   let msg2 = document.querySelector(".msg2");
    msg2.style.display = (msg2.style.display == "block")?"none":"block";
}, 160);

setTimeout(()=>{ //disappers the game over msg 
   clearInterval(id);
   document.querySelector(".msg2").style.display = "none";
},2000);

 setTimeout(() => { //starts after game over msg disappers
   idgameover = setInterval(() => {    //Setting the blink msg for restart
    let msg = document.querySelector(".msg");
    msg.style.display = (msg.style.display == "block")?"none":"block";
      }, 570);
      key = 0;
 }, 2000);}

function randomColor(){ //return a random color
 let num = Math.floor((Math.random() * 4)+1);
 if (num==1){
    return "green";
 } else if (num==2){
    return "yellow";
 } else if (num==3){
    return "blue";
 } else if (num==4){
    return "red";
 }
}

function display(color){ //display the blinking color
    if (color=="green"){
         document.querySelector(".green").style.boxShadow = `inset 0 0 50px rgba(255, 255, 224, 0.7),
    inset 0 0 80px rgba(255, 255, 200, 0.5),
    inset 0 0 120px rgba(255, 255, 150, 0.4), 0 0 45px rgba(0, 255, 0, 0.6),
    -8px 0 30px rgba(173, 255, 47, 0.5), 8px 0 30px rgba(144, 238, 144, 0.5),
    0 0 70px rgba(173, 255, 47, 0.4)`

     setTimeout(function(){
        document.querySelector(".green").style.boxShadow = "none"
     },350)

 } else if (color=="yellow"){
      document.querySelector(".yellow").style.boxShadow = `  inset 0 0 50px rgba(255, 255, 180, 0.7),
    inset 0 0 80px rgba(255, 255, 100, 0.5),
    inset 0 0 120px rgba(255, 215, 0, 0.4), 0 0 45px rgba(255, 255, 0, 0.6),
    -8px 0 30px rgba(255, 223, 0, 0.5), 8px 0 30px rgba(255, 239, 84, 0.5),
    0 0 70px rgba(255, 255, 130, 0.4)`

     setTimeout(function(){
        document.querySelector(".yellow").style.boxShadow = "none"
     },350)
 } else if (color=="blue"){
    document.querySelector(".blue").style.boxShadow = `inset 0 0 100px rgba(0, 191, 255, 0.95),
    inset 0 0 150px rgba(0, 150, 255, 0.75),
    inset 0 0 180px rgba(30, 144, 255, 0.6), 0 0 70px rgba(0, 0, 255, 0.65),
    -14px -14px 60px rgba(135, 206, 250, 0.5),
    14px 14px 60px rgba(25, 25, 112, 0.5)`

     setTimeout(function(){
       document.querySelector(".blue").style.boxShadow = "none"
     },350)
 } else if (color =="red"){
      document.querySelector(".red").style.boxShadow = `inset 0 0 50px rgba(255, 192, 203, 0.7),
    inset 0 0 80px rgba(255, 160, 122, 0.5),
    inset 0 0 120px rgba(255, 99, 71, 0.4), 0 0 45px rgba(255, 0, 0, 0.6),
    -8px 0 30px rgba(220, 20, 60, 0.5), 8px 0 30px rgba(255, 69, 0, 0.5),
    0 0 70px rgba(255, 0, 0, 0.4)`

     setTimeout(function(){
         document.querySelector(".red").style.boxShadow = "none"
     },350)
 }
}