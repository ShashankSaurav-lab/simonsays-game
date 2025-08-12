let machine = [];
let user = [];
let start = false;
let gameover = false;
let level = 0;
let score = -10;
let order =0;
let idblink = 0;


//-----------------------------------
//part 1 
//------------------------------------
document.querySelector(".prevent").style.display = "block"; //prevent user to click any panels
 idblink = setInterval(() => {    //Setting the blink msg at start
   let msg = document.querySelector(".msg");
    msg.style.display = (msg.style.display == "block")?"none":"block";
}, 570);

document.addEventListener("keydown",handlestart) //detects any key to start the game
document.addEventListener("click",handlestart) //detects any click to start the game

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
function handlestart(){
     
   if (start == false || gameover == true){
      start = true;
      if(gameover == true){ gameover = false;}

       document.querySelector("#bg-music").play(); //plays background music
        clearInterval(idblink) //stops the blinking text
        document.querySelector(".msg").style.display = "none"; //clear the blinking text if left
        
        level = 0;
        score = 0;
        user = [];
        order = 0;
        machine = [];

        document.querySelector("#level-screen").textContent = `${++level}`; //upgrading the level
        score = score + 10;
        document.querySelector(".score").innerHTML = `Score: ${score}`; //updating the score

       machineturn(); //Machine will blink the colors
   }
}


function machineturn(){
     machine.push(randomColor()); //gets generated color
     let index=0;
     //showing all the colors by machine
     const itrid = setInterval(() => {  //**** 
                 display(document.querySelector(`.${machine[index]}`).getAttribute("id")); //sends the id name as a color
                 index++;
          if (index >= machine.length) {
              clearInterval(itrid);
              document.querySelector(".prevent").style.display = "none"; //clear the prevent screen
            }
        }, 800);
}

function check(a){
   console.log(user,machine);  
   if(machine[a-1]!=user[a-1]){
      handlegameover();
   }else if(machine.length == user.length){
      restart();
   }
}

function restart(){
   document.querySelector(".prevent").style.display = "block"; //add the prevent screen 
   document.querySelector("#win").play(); //plays win sound effect
   document.querySelector("#level-screen").textContent = `${++level}`; //upgrading the level
   score = score + 10;
    document.querySelector(".score").innerHTML = `Score: ${score}`; //updating the score
    
     user = [];
     order =0;
   machineturn();
}

function handlegameover(){
   document.querySelector(".prevent").style.display = "block"; //add the prevent screen 
document.querySelector("#lose").play(); //play lose sound effect
document.querySelector(".prevent").style.display = "block"; //prevent users to click any panels

document.querySelector(".score").innerHTML = ` Score: 0`;
document.querySelector("#level-screen").textContent = "0"; 
 addScoreToLeaderboard(score, level);

let id = setInterval(() => {    //Setting the blink msg after game over
   let msg2 = document.querySelector(".msg2");
    msg2.style.display = (msg2.style.display == "block")?"none":"block";
}, 160);
setTimeout(()=>{ //disappers the game over msg 
   clearInterval(id);
   document.querySelector(".msg2").style.display = "none";
},2000);

setTimeout(() => { //starts after game over msg disappers
   idblink = setInterval(() => {    //Setting the blink msg for restart
    let msg = document.querySelector(".msg");
    msg.style.display = (msg.style.display == "block")?"none":"block";
      }, 570);
    gameover = true;
 }, 2000);
}

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

//leaderboard
let leaderboard = JSON.parse(localStorage.getItem('simonsays_leaderboard')) ||[];

// Function to add a new score to leaderboard and keep top 5 scores
function addScoreToLeaderboard(score, level) {
  leaderboard.push({score, level});
  leaderboard.sort((a, b) => {
  if (a.score < b.score) return 1;   // b before a
  if (a.score > b.score) return -1;  // a before b
  return 0; // equal
}); // sort by score
  if (leaderboard.length > 5) leaderboard.pop(); // keep top 5
  localStorage.setItem('simonsays_leaderboard', JSON.stringify(leaderboard));//update thr local storage
  updateLeaderboard();
}

function updateLeaderboard() {
  let list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  leaderboard.forEach((entry) => {
    let li = document.createElement('li');
    li.textContent = `Score: ${entry.score} at Level: ${entry.level}`;
    list.appendChild(li);
  });
}

  updateLeaderboard();