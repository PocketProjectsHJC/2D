const board=document.getElementById('grid');
const gameover=document.getElementById('gameover');
const txt=document.getElementById('message');
const cells=document.getElementsByClassName('cell');
var turn=true;
const movesList=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,6,8]];
function restart(){
  board.style.display="grid";
  gameover.style.display="none";
  for(var cell of cells){
    cell.classList.remove('x');
    cell.classList.remove('o');
    cell.removeEventListener('touchstart',click);
    cell.addEventListener('touchstart',click,{once:true})
  }
  turn=true;
}
function click(e){
  Click(e.target);
}
function Click(target){
  target.classList.add(turn?'x':'o');
  const wins=movesList.some((moves)=>{
    return moves.every((index)=>{
      return cells[index].classList.contains(turn?'x':'o');
    })
  });
  const tie=[...cells].every((elements)=>elements.classList.contains('x')||elements.classList.contains('o'));
  if(wins||tie){
    changeScreen(wins);
  }
  turn=!turn;
}
function changeScreen(Wins){
  board.style.display="none";
  gameover.style.display="flex";
  if(Wins){
    txt.innerText=(turn?'X':'O')+" WINS!";
  }else{
    txt.innerText="GAME TIE!"
  }
}
restart();