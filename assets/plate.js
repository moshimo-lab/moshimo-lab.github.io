
const $=id=>document.getElementById(id);
const pl=$('pl'),valPl=$('valPl'),quake=$('quake'),thermo=$('thermo'),climate=$('climate');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelPl=$('panelPl'),whyPl=$('whyPl');
function update(){
  const s=pl.value/100; // プレート速度(いま=1)
  valPl.textContent=s.toFixed(2)+' 倍';
  // 地震・火山
  let q;
  if(s<0.05)q='なし(静穏)';
  else if(s<0.5)q='おだやか';
  else if(s<1.5)q='活発';
  else q='とても活発';
  quake.textContent=q;
  // サーモスタット
  let th;
  if(s<0.05)th='停止';
  else if(s<0.5)th='弱まる';
  else th='効いている';
  thermo.textContent=th;
  // 長い目の気候
  let cl;
  if(s<0.05)cl='暴走のリスク';
  else if(s<0.5)cl='ゆらぎやすい';
  else cl='安定';
  climate.textContent=cl;
  panelPl.classList.toggle('danger',s<0.05);
  let line='大地がほどよく動いてる。地震はあるけど、気候は安定だね',face='happy';
  if(s<0.05){line='大地が止まった…地震はないけど、気温の自動調整も止まっちゃった…';face='cold';}
  else if(s<0.5){line='動きがゆっくりだね。サーモスタットの効きが弱まってきたよ';face='';}
  else if(s>1.5){line='大地が活発!地震も火山も多いけど、調整はよく効いてる';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(s<0.05)whyPl.textContent='🔎 プレートが止まると火山がCO₂を補給しなくなり、気温を保つ天然サーモスタットが止まるよ。地震がない代わりに気候が暴走しやすくなるんだ';
  else if(s<0.5)whyPl.textContent='🔎 火山のCO₂放出と岩石の風化のバランスが、長い目で気温を一定に保っているよ';
  else whyPl.textContent='🔎 プレートが動くから地震や火山が起きるよ。でも実はそれが気候の調整にもつながっているんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
pl.addEventListener('input',update);update();
