/* ===== Fundal inimioare ===== */
const heartCanvas = document.getElementById('heartCanvas');
const hCtx = heartCanvas.getContext('2d');

function resizeCanvas(){
  const dpr = window.devicePixelRatio || 1;
  heartCanvas.width = window.innerWidth * dpr;
  heartCanvas.height = window.innerHeight * dpr;
  heartCanvas.style.width = window.innerWidth + "px";
  heartCanvas.style.height = window.innerHeight + "px";
  hCtx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
  constructor() {
    this.x = Math.random() * heartCanvas.width;
    this.y = Math.random() * -heartCanvas.height;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.3 + 0.1;
  }
  draw() {
    hCtx.fillStyle = `rgba(255, 0, 128, ${this.opacity})`;
    hCtx.beginPath();
    const x = this.x, y = this.y, s = this.size/2;
    hCtx.moveTo(x, y+s);
    hCtx.bezierCurveTo(x,y,x-s,y,x-s,y-s);
    hCtx.bezierCurveTo(x-s,y-2*s,x,y-2*s,x,y-s);
    hCtx.bezierCurveTo(x,y-2*s,x+s,y-2*s,x+s,y-s);
    hCtx.bezierCurveTo(x+s,y,x,y,x,y+s);
    hCtx.fill();
  }
  update() {
    this.y += this.speed;
    if(this.y > heartCanvas.height) this.y = -this.size;
    this.draw();
  }
}

const hearts = [];
for(let i=0;i<50;i++) hearts.push(new Heart());
function animateHearts() { 
  hCtx.clearRect(0,0,heartCanvas.width,heartCanvas.height);
  hearts.forEach(h => h.update());
  requestAnimationFrame(animateHearts);
}
animateHearts();

/* ===== Valentine Screen ===== */
const valentineScreen=document.getElementById('valentineScreen');
const yesBtn=document.getElementById('yesBtn');
const noBtn=document.getElementById('noBtn');
const passwordScreen=document.getElementById('passwordScreen');

/* ----- BUTON NO ----- */
noBtn.addEventListener('click', () => {
  // Butonul DA (yes) crește
  const currentSize = parseInt(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize + 4) + "px";
  yesBtn.style.transition = "transform 0.2s ease";
  yesBtn.style.transform = "scale(1.2)";
  setTimeout(()=>{ yesBtn.style.transform = "scale(1)"; },200);

  // Butonul NU (no) se mută aleatoriu
  noBtn.style.position = "absolute";
  noBtn.style.top = Math.random()*70+"%";
  noBtn.style.left = Math.random()*75+"%";

  const rect = noBtn.getBoundingClientRect();
  const msg = document.createElement("div");
  msg.textContent = "Upss, nu ai nimerit 😌💖";
  msg.style.position = "fixed";
  msg.style.top = (rect.top - 30 + Math.random()*10) + "px";
  msg.style.left = (rect.left + rect.width/2 + (Math.random()*20-10)) + "px";
  msg.style.fontSize = "1.4em";
  msg.style.fontWeight = "700";
  msg.style.color = "#ff3f70";
  msg.style.textShadow = "0 0 6px white";
  msg.style.opacity = 0;
  msg.style.pointerEvents = "none";
  msg.style.zIndex = 999;
  document.body.appendChild(msg);
  msg.animate([
    {opacity:0, transform:"translate(0,0)"},
    {opacity:1, transform:"translate(0,-15px)"},
    {opacity:0, transform:"translate(0,-35px)"}
  ],{duration:1200,easing:"ease-out"});
  setTimeout(()=>msg.remove(),1200);

  // Animatie inimioare explode
  for(let i=0;i<8;i++){
    const heart=document.createElement("div");
    heart.textContent="💖";
    heart.style.position="fixed";
    heart.style.left=(rect.left+rect.width/2+Math.random()*20-10)+"px";
    heart.style.top=(rect.top+rect.height/2+Math.random()*20-10)+"px";
    heart.style.fontSize=(Math.random()*20+10)+"px";
    heart.style.opacity=0.8;
    heart.style.pointerEvents="none";
    heart.style.zIndex=999;
    document.body.appendChild(heart);
    const animX=Math.random()*60-30;
    const animY=Math.random()*-100-20;
    const rot=Math.random()*360;
    heart.animate([
      {transform:`translate(0,0) rotate(0deg)`,opacity:1},
      {transform:`translate(${animX}px,${animY}px) rotate(${rot}deg)`,opacity:0}
    ],{duration:1000,easing:"ease-out"});
    setTimeout(()=>heart.remove(),1000);
  }
});

/* ----- BUTON YES ----- */
yesBtn.addEventListener('click',()=>{
  yesBtn.style.transition='transform 0.2s ease, box-shadow 0.4s ease';
  yesBtn.style.transform='scale(1.2)';
  yesBtn.style.boxShadow='0 0 30px #ff6f91,0 0 60px #ff3f70,0 0 90px #ff6f91';
  setTimeout(()=>{
    yesBtn.style.transform='scale(1)';
    yesBtn.style.boxShadow='0 6px 15px rgba(0,0,0,0.25)';
    valentineScreen.classList.add('hidden');
    passwordScreen.classList.remove('hidden');
  },600);

  const rect=yesBtn.getBoundingClientRect();
  for(let i=0;i<10;i++){
    const h=document.createElement('div');
    h.textContent='💖';
    h.style.position='fixed';
    h.style.left=(rect.left+rect.width/2+Math.random()*40-20)+'px';
    h.style.top=(rect.top+rect.height/2+Math.random()*40-20)+'px';
    h.style.fontSize=(Math.random()*25+15)+'px';
    h.style.opacity=0.9;
    h.style.zIndex=999;
    h.style.pointerEvents='none';
    document.body.appendChild(h);
    const animX=(Math.random()*120-60);
    const animY=(Math.random()*-200-50);
    h.animate([{transform:`translate(0,0) rotate(0deg)`,opacity:1},{transform:`translate(${animX}px,${animY}px) rotate(${Math.random()*360}deg)`,opacity:0}],{duration:1200,easing:'ease-out'});
    setTimeout(()=>h.remove(),1200);
  }
});

/* ----- BUTON YES ----- */
yesBtn.addEventListener('click',()=>{
  yesBtn.style.transition='transform 0.2s ease, box-shadow 0.4s ease';
  yesBtn.style.transform='scale(1.2)';
  yesBtn.style.boxShadow='0 0 30px #ff6f91,0 0 60px #ff3f70,0 0 90px #ff6f91';
  setTimeout(()=>{
    yesBtn.style.transform='scale(1)';
    yesBtn.style.boxShadow='0 6px 15px rgba(0,0,0,0.25)';
    valentineScreen.classList.add('hidden');
    passwordScreen.classList.remove('hidden');
  },600);

  const rect=yesBtn.getBoundingClientRect();
  for(let i=0;i<10;i++){
    const h=document.createElement('div');
    h.textContent='💖';
    h.style.position='fixed';
    h.style.left=(rect.left+rect.width/2+Math.random()*40-20)+'px';
    h.style.top=(rect.top+rect.height/2+Math.random()*40-20)+'px';
    h.style.fontSize=(Math.random()*25+15)+'px';
    h.style.opacity=0.9;
    h.style.zIndex=999;
    h.style.pointerEvents='none';
    document.body.appendChild(h);
    const animX=(Math.random()*120-60);
    const animY=(Math.random()*-200-50);
    h.animate([{transform:`translate(0,0) rotate(0deg)`,opacity:1},{transform:`translate(${animX}px,${animY}px) rotate(${Math.random()*360}deg)`,opacity:0}],{duration:1200,easing:'ease-out'});
    setTimeout(()=>h.remove(),1200);
  }
});

/* ===== Password Screen Premium ===== */
const passwordInput=document.getElementById('passwordInput');
const passwordBtn=document.getElementById('passwordBtn');
const passwordFeedback=document.getElementById('passwordFeedback');
const homeScreen=document.getElementById('homeScreen');
const correctPassword="sweetheart";

passwordBtn.addEventListener('click',()=>checkPassword());
passwordInput.addEventListener('keyup', (e)=>{ if(e.key==='Enter') checkPassword(); });

function checkPassword(){
  if(passwordInput.value.trim()===correctPassword){
    passwordFeedback.textContent="✔️ Parola corectă!";
    passwordFeedback.style.color="#ff3f70";
    passwordFeedback.style.textShadow="0 0 10px #fff, 0 0 20px #ff6f91,0 0 30px #ff3f70";

    // Animatie inimioare cadere
    for(let i=0;i<12;i++){
      const heart=document.createElement('div');
      heart.textContent='💖';
      heart.style.position='fixed';
      heart.style.left=(50+Math.random()*100-50)+'%';
      heart.style.top='0px';
      heart.style.fontSize=(Math.random()*25+15)+'px';
      heart.style.opacity=1;
      heart.style.pointerEvents='none';
      heart.style.zIndex=999;
      document.body.appendChild(heart);
      heart.animate([
        {transform:'translateY(0) scale(1)', opacity:1},
        {transform:'translateY(250px) scale(1.2)', opacity:0}
      ],{duration:1500 + Math.random()*500, easing:'ease-out'});
      setTimeout(()=>heart.remove(),2000);
    }

    setTimeout(()=>{
      passwordScreen.classList.add('hidden');
      homeScreen.classList.remove('hidden');
      passwordInput.value="";
      passwordFeedback.textContent="";
    },800);
  } else {
    passwordFeedback.textContent="❌ Parola greșită!";
    passwordFeedback.style.color="#fff";
    passwordFeedback.style.animation="shake 0.5s";
    setTimeout(()=>{passwordFeedback.style.animation="";},500);
    passwordInput.value="";
  }
}

/* ===== Home Buttons, Timer, Slider, Citate, Puzzle ===== */
const timeBtn=document.getElementById('timeBtn');
const loveBtn=document.getElementById('loveBtn');
const quoteBtn=document.getElementById('quoteBtn');
const puzzleBtn=document.getElementById('puzzleBtn');
const timeScreen=document.getElementById('timeScreen');
const loveScreen=document.getElementById('loveScreen');
const quoteScreen=document.getElementById('quoteScreen');
const puzzleScreen=document.getElementById('puzzleScreen');
const backBtns=document.querySelectorAll('.backBtn');

timeBtn.addEventListener('click',()=>showScreen(timeScreen));
loveBtn.addEventListener('click',()=>showScreen(loveScreen));
quoteBtn.addEventListener('click',()=>showScreen(quoteScreen));
puzzleBtn.addEventListener('click',()=>showScreen(puzzleScreen));
backBtns.forEach(btn=>btn.addEventListener('click',()=>{hideAllScreens(); homeScreen.classList.remove('hidden');}));
function showScreen(screen){hideAllScreens(); screen.classList.remove('hidden');}
function hideAllScreens(){document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));}

/* ===== Digital Counter ===== */
const timeCounter=document.getElementById('timeCounter');
function updateTime(){
  const startDate=new Date('2025-06-01T00:00:00');
  const now=new Date();
  let diff=now-startDate;
  const seconds=Math.floor(diff/1000%60);
  const minutes=Math.floor(diff/1000/60%60);
  const hours=Math.floor(diff/1000/60/60%24);
  const daysTotal=Math.floor(diff/1000/60/60/24);
  const years=Math.floor(daysTotal/365);
  const months=Math.floor((daysTotal%365)/30);
  const days=(daysTotal%365)%30;
  const pad=n=>n.toString().padStart(2,'0');
  timeCounter.innerHTML=`${pad(years)}y : ${pad(months)}m : ${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
}
setInterval(updateTime,1000);

/* ===== Slider vertical cu inimioara ===== */
const sliderContainer = document.getElementById("sliderContainer");
const heartPointer = document.getElementById("heartPointer");
const loveMessageP = document.getElementById("loveMessage");
const totalSteps = 8;
const stepMessages = [
  "Urcă bara mai sus, bubu, te iubesc! ❤️",
  "Te ador puțin 😘",
  "Doar atât? 😏",
  "Hmm… mai mult? 💕",
  "Perfect! 😍",
  "Foarte mult! 💖",
  "Wow! Te iubesc mult! 🥰",
  "Și eu te iubesc etern, Bubu ❤️"
];
const sliderStepsEl = document.getElementById("sliderSteps");
sliderStepsEl.innerHTML = "";
for(let i=0;i<totalSteps;i++){
  const step = document.createElement("div");
  sliderStepsEl.appendChild(step);
}

let currentStep = 0;
updateHeartPosition();
let isDragging = false;

heartPointer.addEventListener("mousedown",()=>{isDragging=true;});
window.addEventListener("mouseup",()=>{isDragging=false;});
window.addEventListener("mousemove",(e)=>{
  if(!isDragging) return;
  const rect = sliderContainer.getBoundingClientRect();
  let y = rect.bottom - e.clientY;
  y = Math.max(0, Math.min(rect.height, y));
  currentStep = Math.round(y / (rect.height/(totalSteps-1)));
  updateHeartPosition();
});

/* Touch support iPhone */
heartPointer.addEventListener("touchstart",()=>{isDragging=true; navigator.vibrate?.(30);});
window.addEventListener("touchend",()=>{isDragging=false;});
window.addEventListener("touchmove",(e)=>{
  if(!isDragging) return;
  const t = e.touches[0];
  const rect = sliderContainer.getBoundingClientRect();
  let y = rect.bottom - t.clientY;
  y = Math.max(0, Math.min(rect.height, y));
  currentStep = Math.round(y / (rect.height/(totalSteps-1)));
  updateHeartPosition();
},{passive:true});

function updateHeartPosition(){
  const containerHeight = sliderContainer.clientHeight;
  const stepHeight = containerHeight / (totalSteps-1);
  heartPointer.style.bottom = `${currentStep*stepHeight}px`;
  loveMessageP.textContent = stepMessages[currentStep];
  if(currentStep <= 2){ loveMessageP.style.fontSize = "1.8em"; }
  else if(currentStep <= 5){ loveMessageP.style.fontSize = "1.6em"; }
  else { loveMessageP.style.fontSize = "1.4em"; }
}

/* ===== Citate Random Premium fără repetare ===== */
const quoteMessage=document.getElementById('quoteMessage');
const quotePool = [
  "Bubu, mă faci să zâmbesc în fiecare clipă! 💖",
  "Te iubesc infinit și mai mult cu fiecare zi 😘",
  "Zâmbetul tău este locul meu preferat 🌸",
  "Fiecare moment cu tine e magie pură ✨",
  "Ești minunată, Bubu! ❤️",
  "Iubirea noastră crește în fiecare zi 💕",
  "Bubu, îmi luminezi viața 🌷",
  "Sunt fericit pentru fiecare secundă cu tine 💗"
];
let availableQuotes = [...quotePool];
quoteBtn.addEventListener('click', () => {
  if(availableQuotes.length === 0) availableQuotes = [...quotePool];
  const index = Math.floor(Math.random()*availableQuotes.length);
  const quote = availableQuotes.splice(index,1)[0];
  quoteMessage.textContent = quote;
  quoteMessage.classList.remove("premiumQuote");
  void quoteMessage.offsetWidth; // trigger reflow
  quoteMessage.classList.add("premiumQuote");
});

/* ===== Puzzle 2x2 perfect interlocking + inimioare ===== */
(function(){
  const canvas = document.getElementById('puzzleCanvas');
  const message = document.getElementById('puzzleMessage');
  const btn = document.getElementById('puzzleBtn');
  const ctx = canvas.getContext('2d');

  canvas.addEventListener('touchstart', e=>e.preventDefault(), {passive:false});
  canvas.addEventListener('touchmove', e=>e.preventDefault(), {passive:false});

  const PUZZLE_ROWS = 2;
  const PUZZLE_COLS = 2;
  let PUZZLE_SIZE = Math.min(window.innerWidth - 40, 400);
  canvas.width = PUZZLE_SIZE;
  canvas.height = PUZZLE_SIZE;

  let puzzleImage = new Image();
  let pieces = [];
  let draggingPiece = null;
  let offsetX=0, offsetY=0;

  message.textContent = "";
  message.style.opacity = 0;

  let hearts = [];

  function drawHearts(){
    hearts.forEach((h,i)=>{
      ctx.save();
      ctx.globalAlpha = h.alpha;
      ctx.fillStyle='red';
      ctx.beginPath();
      const x=h.x, y=h.y, s=h.size;
      ctx.moveTo(x,y);
      ctx.bezierCurveTo(x,y-s/2, x-s, y-s/2, x-s,y);
      ctx.bezierCurveTo(x-s, y+s/2, x, y+s/2, x,y+s);
      ctx.bezierCurveTo(x, y+s/2, x+s, y+s/2, x+s,y);
      ctx.bezierCurveTo(x+s, y-s/2, x,y-s/2,x,y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      h.y -=1.5;
      h.alpha -=0.02;
      if(h.alpha<=0) hearts.splice(i,1);
    });
  }

  function addHeart(x,y){hearts.push({x,y,size:12,alpha:1});}

  // Desenează piesa cu contur realist, top/right/bottom/left sunt definite exact
  function drawPiece(p){
    ctx.save();
    ctx.beginPath();
    const x=p.dx, y=p.dy, w=p.width, h=p.height;
    const tab=Math.min(w,h)/4;

    const top = p.topOut?tab:(p.topHole?-tab:0);
    const right = p.rightOut?tab:(p.rightHole?-tab:0);
    const bottom = p.bottomOut?tab:(p.bottomHole?-tab:0);
    const left = p.leftOut?tab:(p.leftHole?-tab:0);

    // Sus
    ctx.moveTo(x, y);
    ctx.lineTo(x + w/3, y);
    ctx.bezierCurveTo(x + w/3 + tab/4, y - top, x + 2*w/3 - tab/4, y - top, x + 2*w/3, y);
    ctx.lineTo(x+w, y);

    // Dreapta
    ctx.lineTo(x+w, y+h/3);
    ctx.bezierCurveTo(x+w+right, y+h/3 + tab/4, x+w+right, y+2*h/3 - tab/4, x+w, y+2*h/3);
    ctx.lineTo(x+w, y+h);

    // Jos
    ctx.lineTo(x + 2*w/3, y+h);
    ctx.bezierCurveTo(x + 2*w/3 - tab/4, y+h + bottom, x + w/3 + tab/4, y+h + bottom, x + w/3, y+h);
    ctx.lineTo(x, y+h);

    // Stânga
    ctx.lineTo(x, y+2*h/3);
    ctx.bezierCurveTo(x-left, y+2*h/3 - tab/4, x-left, y+h/3 + tab/4, x, y+h/3);
    ctx.lineTo(x, y);
    ctx.closePath();

    ctx.clip();
    ctx.drawImage(puzzleImage, p.sx, p.sy, w, h, x, y, w, h);
    ctx.restore();
  }

  function initPuzzle(img){
    pieces = [];
    const pieceWidth = PUZZLE_SIZE / PUZZLE_COLS;
    const pieceHeight = PUZZLE_SIZE / PUZZLE_ROWS;

    // generăm piesele împreună pentru aliniere perfectă
    for(let row=0; row<PUZZLE_ROWS; row++){
      for(let col=0; col<PUZZLE_COLS; col++){
        let topHole = row>0 ? !pieces[(row-1)*PUZZLE_COLS + col].bottomOut : false;
        let leftHole = col>0 ? !pieces[row*PUZZLE_COLS + col-1].rightOut : false;

        let p = {
          sx: col*pieceWidth,
          sy: row*pieceHeight,
          width: pieceWidth,
          height: pieceHeight,
          dx: Math.random()*(PUZZLE_SIZE-pieceWidth),
          dy: Math.random()*(PUZZLE_SIZE-pieceHeight),
          correctX: col*pieceWidth,
          correctY: row*pieceHeight,
          topOut: row===0 ? false : Math.random()>0.5,
          topHole: topHole,
          rightOut: col<PUZZLE_COLS-1 ? Math.random()>0.5 : false,
          rightHole: false,
          bottomOut: row<PUZZLE_ROWS-1 ? Math.random()>0.5 : false,
          bottomHole: false,
          leftOut: col===0 ? false : Math.random()>0.5,
          leftHole: leftHole
        };
        pieces.push(p);
      }
    }
    drawPuzzle();
  }

  function drawPuzzle(){
    ctx.clearRect(0,0,PUZZLE_SIZE,PUZZLE_SIZE);
    pieces.forEach(drawPiece);
    drawHearts();
    requestAnimationFrame(drawPuzzle);
  }

  function getMousePos(e){
    const rect = canvas.getBoundingClientRect();
    return {x:e.clientX - rect.left, y:e.clientY - rect.top};
  }

  function startDrag(e){
    const pos=getMousePos(e);
    for(let i=pieces.length-1;i>=0;i--){
      const p=pieces[i];
      if(pos.x>p.dx && pos.x<p.dx+p.width && pos.y>p.dy && pos.y<p.dy+p.height){
        draggingPiece=p;
        offsetX=pos.x - p.dx;
        offsetY=pos.y - p.dy;
        pieces.push(pieces.splice(i,1)[0]);
        break;
      }
    }
  }

  function doDrag(e){
    if(draggingPiece){
      const pos=getMousePos(e);
      draggingPiece.dx = pos.x - offsetX;
      draggingPiece.dy = pos.y - offsetY;
    }
  }

  function endDrag(){
    if(draggingPiece){
      const tolerance = 20;
      if(Math.abs(draggingPiece.dx - draggingPiece.correctX)<tolerance &&
         Math.abs(draggingPiece.dy - draggingPiece.correctY)<tolerance){
        draggingPiece.dx = draggingPiece.correctX;
        draggingPiece.dy = draggingPiece.correctY;
      }
      draggingPiece = null;
      checkWin();
    }
  }

  function startDragTouch(e){
    e.preventDefault();
    const t=e.touches[0];
    startDrag({clientX:t.clientX, clientY:t.clientY});
  }
  function doDragTouch(e){
    e.preventDefault();
    const t=e.touches[0];
    doDrag({clientX:t.clientX, clientY:t.clientY});
  }

  function checkWin(){
    const won=pieces.every(p=>p.dx===p.correctX && p.dy===p.correctY);
    if(won){
      message.textContent = "Noi doi. De fiecare dată, compleți ❤️";
      message.style.opacity=1;
      for(let i=0;i<60;i++){
        addHeart(Math.random()*PUZZLE_SIZE, Math.random()*PUZZLE_SIZE);
      }
    }
  }

  // evenimente
  canvas.addEventListener('mousedown', startDrag);
  canvas.addEventListener('mousemove', doDrag);
  canvas.addEventListener('mouseup', endDrag);
  canvas.addEventListener('mouseleave', endDrag);
  canvas.addEventListener('touchstart', startDragTouch, {passive:false});
  canvas.addEventListener('touchmove', doDragTouch, {passive:false});
  canvas.addEventListener('touchend', endDrag, {passive:false});

  // imagini
  const puzzleImages=[];
  const TOTAL_IMAGES=10;
  for(let i=1;i<=TOTAL_IMAGES;i++){
    const img=new Image();
    img.src=`images/${i}.jpg`;
    puzzleImages.push(img);
  }

  btn.addEventListener('click',()=>{
    let loaded=puzzleImages.filter(img=>img.complete && img.naturalWidth>0);
    if(loaded.length===0){ alert("Verifică imaginile!"); return; }
    puzzleImage = loaded[Math.floor(Math.random()*loaded.length)];
    initPuzzle(puzzleImage);
  });

})();


	


