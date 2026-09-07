const canvas=document.querySelector('#stage');
const ctx=canvas.getContext('2d',{alpha:false});
const reveal=document.querySelector('#reveal');
const title=document.querySelector('#title');
const titleZh=document.querySelector('#titleZh');
const hint=document.querySelector('#hint');
const actions=document.querySelector('#resultActions');
const detailLink=document.querySelector('#detailLink');
const shuffle=document.querySelector('#shuffle');
const pointerNode=document.querySelector('#pointer');
const imageLoader=document.querySelector('#imageLoader');
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const items=(window.ATLAS_CATALOG?.items||[]).filter(item=>item.localThumbnail||item.thumbnail);

let width=innerWidth,height=innerHeight,dpr=1,current,image,revealed=false,open=0,targetOpen=0,lastIndex=-1;
const pointer={x:innerWidth*.58,y:innerHeight*.54,tx:innerWidth*.58,ty:innerHeight*.54};

function escapeGlyph(char){return char===' '?'&nbsp;':char.replace(/[&<>]/g,value=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[value]))}
function setTitle(value){title.innerHTML=[...value].map((char,index)=>`<span class="glyph" style="transition-delay:${index*24}ms">${escapeGlyph(char)}</span>`).join('')}
function itemImage(item){return item.localThumbnail||item.thumbnail}
function choose(){
  if(!items.length)return;
  let index=Math.floor(Math.random()*items.length);
  if(items.length>1&&index===lastIndex)index=(index+1)%items.length;
  lastIndex=index;current=items[index];image=new Image();image.decoding='async';document.body.classList.add('image-loading');imageLoader?.setAttribute('aria-label',`正在加载 ${current.name}`);image.onload=()=>{document.body.classList.remove('image-loading');imageLoader?.removeAttribute('aria-label')};image.onerror=()=>document.body.classList.remove('image-loading');image.src=itemImage(current);
  setTitle(current.name);titleZh.textContent=current.nameZh||'';
  detailLink.href=`style.html?style=${encodeURIComponent(current.slug)}`;
  window.lensGL?.setImage(itemImage(current));
}
function resize(){dpr=Math.min(devicePixelRatio||1,2);width=innerWidth;height=innerHeight;canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
function cover(){const scale=Math.max(width/image.width,height/image.height),w=image.width*scale,h=image.height*scale;return[(width-w)/2,(height-h)/2,w,h]}
function background(){ctx.fillStyle='#070809';ctx.fillRect(0,0,width,height);const glow=ctx.createRadialGradient(width*.52,height*.52,0,width*.52,height*.52,Math.max(width,height)*.65);glow.addColorStop(0,'#111315');glow.addColorStop(.5,'#090a0b');glow.addColorStop(1,'#050607');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height)}
function fallbackLens(){
  background();if(!image?.complete||!image.naturalWidth)return;
  ctx.save();ctx.globalAlpha=.05;ctx.drawImage(image,...cover());ctx.restore();
  pointer.x+=(pointer.tx-pointer.x)*.12;pointer.y+=(pointer.ty-pointer.y)*.12;
  open+=(targetOpen-open)*(reduced?1:.045);const radius=126+open*Math.max(width,height)*1.25;
  ctx.save();ctx.beginPath();ctx.arc(pointer.x,pointer.y,radius,0,Math.PI*2);ctx.clip();ctx.filter=`brightness(${.96-open*.22}) saturate(1.03) contrast(1.06)`;ctx.drawImage(image,...cover());ctx.restore();
  if(!revealed){const rim=ctx.createRadialGradient(pointer.x-38,pointer.y-42,6,pointer.x,pointer.y,126);rim.addColorStop(0,'rgba(255,255,255,.08)');rim.addColorStop(.75,'rgba(255,255,255,0)');rim.addColorStop(.96,'rgba(220,228,242,.17)');rim.addColorStop(1,'rgba(20,24,30,.55)');ctx.fillStyle=rim;ctx.beginPath();ctx.arc(pointer.x,pointer.y,126,0,Math.PI*2);ctx.fill()}
}
function frame(){if(!window.lensGL?.ready)fallbackLens();requestAnimationFrame(frame)}
function reset(){revealed=false;open=targetOpen=0;reveal.classList.remove('on');actions.classList.remove('on');document.body.classList.remove('result-open');hint.textContent='MOVE · CLICK';window.lensGL?.reset();choose()}
function revealCurrent(){if(revealed)return;revealed=true;targetOpen=1;document.body.classList.add('result-open');window.lensGL?.reveal();hint.textContent='';setTimeout(()=>reveal.classList.add('on'),reduced?0:620);setTimeout(()=>actions.classList.add('on'),reduced?0:1220)}

addEventListener('resize',resize);
addEventListener('pointermove',event=>{pointer.tx=event.clientX;pointer.ty=event.clientY;pointerNode.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`;window.lensGL?.setPointer(event.clientX,event.clientY)});
addEventListener('pointerdown',event=>{if(event.target.closest?.('.discovery-header,.discovery-actions'))return;revealCurrent()});
shuffle.addEventListener('click',event=>{event.stopPropagation();reset()});
choose();resize();window.lensGL?.setVisible(true);requestAnimationFrame(frame);
