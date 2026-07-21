
const $=id=>document.getElementById(id);
const lt=$('lt'),valLt=$('valLt'),ltfreq=$('ltfreq'),ltfix=$('ltfix'),ltlife=$('ltlife');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const earth=$('earth'),flashLayer=$('flashLayer');
const bolts=[$('bolt1'),$('bolt2'),$('bolt3')];
const mascot=$('mascot'),panelLt=$('panelLt'),whyLt=$('whyLt');
const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let boltTimer=null;
function fireBolt(){
  const n=lt.value/100;
  const count=n>=2.3?(Math.random()<.5?2:1):1;   // 雷だらけの時はたまに2本同時
  for(let i=0;i<count;i++){
    const b=bolts[Math.floor(Math.random()*bolts.length)];
    b.style.left=(12+Math.random()*62)+'%';
    b.style.top=(4+Math.random()*46)+'%';
    b.classList.add('on');
    setTimeout(()=>b.classList.remove('on'),120+Math.random()*80);
  }
  flashLayer.classList.add('on');
  setTimeout(()=>flashLayer.classList.remove('on'),110);
}
function scheduleBolt(){
  clearTimeout(boltTimer);
  const n=lt.value/100;
  if(n<=0.02||reduceMotion)return;
  const delay=(700+Math.random()*1100)/n;        // 1倍:0.7〜1.8秒おき/3倍:0.23〜0.6秒おき
  boltTimer=setTimeout(()=>{fireBolt();scheduleBolt();},delay);
}
function update(){
  const n=lt.value/100; // 雷の多さ(いま=1)
  valLt.textContent=n.toFixed(n<10?1:0)+' 倍';
  ltfreq.textContent=n<0.05?'ほとんどなし':n<0.8?'少なめ':n<1.5?'ふつう':n<2.3?'とても多い':'ひっきりなし';
  ltfix.textContent=n<0.05?'ほぼなし':n<0.8?'ひかえめ':n<1.5?'少し':n<2.3?'活発':'とても活発';
  ltlife.textContent=n<0.05?'つくられない':n<0.8?'ごくわずか':n<1.5?'わずかに':n<2.3?'そこそこ':'さかんに(かも)';
  panelLt.classList.toggle('danger',n>=2.3);
  // ★見た目: 空模様が雷の多さに連動(晴れ→嵐)+稲妻の頻度が変わる
  earth.classList.toggle('stormy',n>=1.5);
  earth.classList.toggle('clearsky',n<0.05);
  if(reduceMotion&&n>=1.5){bolts[0].style.left='40%';bolts[0].style.top='20%';bolts[0].classList.add('on');}
  else if(reduceMotion){bolts[0].classList.remove('on');}
  let line='ときどき雷が鳴る、いつもの地球だね',face='happy';
  if(n>=2.3){line='一日中雷だらけ…こわいけど、実は生命の材料を作ってるのかも…';face='dizzy';}
  else if(n>=1.5){line='雷が増えたね。空気の栄養がたくさん作られているよ';face='';}
  else if(n<0.05){line='雷のない静かな空。でも少しさびしい気もするね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(n>=2.3)whyLt.textContent='🔎 1953年のミラーの実験では、雷に見立てた放電で生命の材料アミノ酸ができたよ。こわい雷と、いのちの火花は同じものだったのかも';
  else if(n>=1.5)whyLt.textContent='🔎 雷は空気の窒素を「使える形」に変える(窒素固定)。雨に溶けて地上に降り、植物の栄養になるんだ';
  else whyLt.textContent='🔎 雷は一瞬で空気を超高温にして、ふつうは結びつかない空気中の窒素どうしを反応させるよ。これが生き物の栄養や材料になるんだ';
  scheduleBolt();
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
lt.addEventListener('input',update);update();
