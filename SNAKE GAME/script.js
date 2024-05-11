const c4="rgb(150,150,150)";
const c5="rgb(50,50,50)";
const c6="rgb(200,200,200)";
const canvas=document.querySelector('canvas');
const scene1=document.getElementById('scene1');
const scene2=document.getElementById('scene2');
const message=document.getElementsByClassName('message')[0];
const ctx=canvas.getContext('2d');
canvas.addEventListener('touchmove',(e)=>{e.preventDefault()})
//TOTAL SIZE = 2000x2000px | QUANTITY = 25sp & 0-24 | SPOT SIZE = 80px
const rand=(min,max)=>Math.floor(Math.random()*max)+min;
class Snake{
  constructor(i,j){
    this.body=[[i*80,j*80]];
    this.eat=false;
    this.direct="";
  }
  draw(){
    for(let i=0;i<this.body.length;i++){
      if(i!=0&&this.body[i][0]==this.body[0][0]&&this.body[0][1]==this.body[i][1]){
        gameover(true);
      }
      ctx.fillStyle=i==0?c4:c5;
      ctx.fillRect(this.body[i][0],this.body[i][1],80,80);
    }
  }
  update(){
    let [x,y]=this.body[0];
    x=this.direct=="R"?x+80:x;
    x=this.direct=="L"?x-80:x;
    y=this.direct=="U"?y-80:y;
    y=this.direct=="D"?y+80:y;
    this.body.unshift([x,y]);
    if(!this.eat){
      this.body.pop();
    }
    this.eat=false;
    this.detect();
  }
  detect(){
    let [x,y]=this.body[0];
    if(x>2000||x<0||y>2000||y<0){
      gameover(true);
    }
    else if(this.body.length>=125){
      gameover(false);
    }
  }
}
class Food{
  constructor(){
    this.pos=[rand(0,24)*80,rand(0,24)*80];
  }
  draw(){
    ctx.fillStyle=c6;
    ctx.fillRect(this.pos[0],this.pos[1],80,80);
  }
  update(){
    if(this.pos[0]==snake.body[0][0]&&this.pos[1]==snake.body[0][1]){
      snake.eat=true;
      this.pos=[rand(0,24)*80,rand(0,24)*80];
    }
  }
}
let snake=null;
let food=null;
function Rst(){
  scene1.style.display="flex";
  scene2.style.display="none";
  snake=new Snake(12,12);
  food=new Food();
}
const Rigth=()=>{snake.direct=snake.body.length<=2?"R":snake.direct!="L"?"R":snake.direct;}
const Left=()=>{snake.direct=snake.body.length<=2?"L":snake.direct!="R"?"L":snake.direct;}
const Top=()=>{snake.direct=snake.body.length<=2?"U":snake.direct!="D"?"U":snake.direct;}
const Down=()=>{snake.direct=snake.body.length<=2?"D":snake.direct!="U"?"D":snake.direct;}
function draw(){
  requestAnimationFrame(draw);
  ctx.clearRect(0,0,2000,2000);
  snake.draw();
  food.draw();
}
function update(){
  snake.update();
  food.update();
}
Rst();
draw();
setInterval(update,300);
function gameover(DIE){
  scene1.style.display="none";
  scene2.style.display="flex";
  message.innerText=DIE?"YOU LOSE!":"YOU WIN!";
}
