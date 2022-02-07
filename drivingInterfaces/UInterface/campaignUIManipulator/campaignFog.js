const SmokeMachine = require("./drivingInterfaces/UInterface/campaignUIManipulator/smokeMachine");



const color = [255, 255, 255];;
const particles = {
  left: 0.05,
  right: 0.05 };


const sideSmoke = (canvas, side) => {
  const ctx = canvas.getContext('2d');
  const machine = SmokeMachine(ctx, color);
  machine.start();
  machine.setPreDrawCallback(() => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const posY = innerWidth < 992 ? h : h - h * 0.14;
    machine.addSmoke(w / 2, posY, particles[side]);
    canvas.width = w;
    canvas.height = h;
  });
  return machine;
};

const middleSmoke = canvas => {
  const ctx = canvas.getContext('2d');
  const machine = SmokeMachine(ctx, color);
  machine.start();
  setTimeout(() => {
    machine.setPreDrawCallback(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      machine.addSmoke(w / 2, h * 2 / 3, 0.05);
      canvas.width = w;
      canvas.height = h;
    });
  }, 2500);
  return machine;
};

const repro = document.getElementById('repro');
const canvasMiddle = document.getElementById('canvasMiddle');
const canvasLeft = document.getElementById('canvasLeft');
const canvasRight = document.getElementById('canvasRight');
sideSmoke(canvasLeft, 'left');
sideSmoke(canvasRight, 'right');
const middleSmokeMachine = middleSmoke(canvasMiddle);


/*SNOWWWWWWWWWWWWWW*/






var particles2= document.getElementById("particles2");

function main(){
    var np = document.documentElement.clientWidth / 29;
    particles2.innerHTML = "";
    for (var i = 0; i < np; i++) {
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        var rndw = Math.floor(Math.random() * w ) + 1;
        var rndh = Math.floor(Math.random() * h ) + 1;
        var widthpt = Math.floor(Math.random() * 8) + 3;
        var opty = Math.floor(Math.random() * 5) + 2;
        var anima = Math.floor(Math.random() * 12) + 8;

        var div = document.createElement("div");
        div.classList.add("particle2");
        div.style.marginLeft = rndw+"px";
        div.style.marginTop = rndh+"px";
        div.style.width = widthpt+"px";
        div.style.height = widthpt+"px";
        div.style.background = "white";
        div.style.opacity = opty;
        div.style.animation = "move "+anima+"s ease-in infinite ";
        particles2.appendChild(div);
    }
}
window.addEventListener("resize", main);
window.addEventListener("load", main);
