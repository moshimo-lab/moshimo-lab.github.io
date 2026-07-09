
const $=id=>document.getElementById(id);
const rot=$('rot'),valRot=$('valRot'),dayLen=$('dayLen'),weight=$('weight'),pop=$('pop');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelRot=$('panelRot'),whyRot=$('whyRot');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const r=rot.value/100;
  valRot.textContent=r.toFixed(2)+' 倍';
  const hours=24/r;
  dayLen.textContent=(hours>=1000?hours.toFixed(0):hours.toFixed(1))+'h';
  const w=Math.max(0,60*(1-0.00346*r*r));
  weight.textContent=w<=0?'0kg(浮く!)':w.toFixed(1)+'kg';
  const rotExtreme=r<0.05||r>20;
  const rotFactor=Math.exp(-Math.pow(Math.log(r)/2.2,2));
  let population=80*rotFactor;
  if(rotExtreme)population=Math.min(population,0.05);
  pop.textContent=population<0.01?'0人':'約'+population.toFixed(1)+'億';
  globeStrip.style.animation='slideGlobe '+Math.max(0.3,6/r)+'s linear infinite';
  panelRot.classList.toggle('danger',r>17||rotExtreme);
  let line='24時間で1回転。いつもの地球だね',face='';
  if(r>17){line='たいへん!赤道のものが宇宙へ飛んでいっちゃう!';face='dizzy';}
  else if(r>10){line='目が回る目が回る目が回る〜!';face='dizzy';}
  else if(r>3){line='まわるの速すぎ!目が回っちゃう!';face='dizzy';}
  else if(r>1.5){line='1日'+hours.toFixed(0)+'時間かぁ。忙しない世界だね';face='dizzy';}
  else if(r<0.05){line='一日が長すぎて、昼と夜の温度差がすごいことに…';face='cold';}
  else if(r<0.5){line='一日が長くてのんびりだね〜';}
  speechLine.textContent=line;
  setFace(face);
  if(r>17)whyRot.textContent='🔎 赤道の遠心力が重力に追いついた!地表がちぎれて宇宙へ飛び出す限界だよ';
  else if(r>3)whyRot.textContent='🔎 遠心力は速度の2乗で効くよ。体重の減りがどんどん大きくなってるのはそのせい';
  else if(r<0.05)whyRot.textContent='🔎 自転が極端に遅いと、太陽に面した側だけ焼け続け、反対側は凍り続けるよ';
  else if(r<0.5)whyRot.textContent='🔎 自転が遅いと1日が長くなる(今は約'+hours.toFixed(1)+'時間)。昼と夜の寒暖差が広がるよ';
  else whyRot.textContent='🔎 2倍にすると1日12時間。体内時計(約24時間周期)とのズレが全人類の悩みになるよ';
}
rot.addEventListener('input',update);update();
