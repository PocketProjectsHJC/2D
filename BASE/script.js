const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
var touch=false;
var touchPos=[0,0];
canvas.addEventListener('touchstart',(e)=>{
  touch=true;
  touchPos=[e.touches[0].clientX,e.touches[0].clientY];
});
canvas.addEventListener('touchmove',(e)=>{
  e.preventDefault();
  touchPos=[e.touches[0].clientX,e.touches[0].clientY];
});
canvas.addEventListener('touchend',(e)=>{touch=false;});
function draw(){
  
}
function update(){
  
  event();
}
function event(){

}
function init(){
  setInterval(draw,10);
  setInterval(update,5);
}
init();