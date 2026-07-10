
const $=id=>document.getElementById(id);
const moon=$('moon'),valMoon=$('valMoon'),tide=$('tide'),moonlight=$('moonlight'),stability=$('stability');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelMoon=$('panelMoon'),whyMoon=$('whyMoon'),miniMoon=$('miniMoon');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const m=moon.value/100;
  valMoon.textContent=m.toFixed(2)+' 倍';
  // 潮汐: 月由来を100、太陽由来を50(=月の約半分)とした簡易モデル
  const tidePct=(m*100+50)/150*100;
  tide.textContent=tidePct.toFixed(0)+'%';
  // 月明かり: 同じ距離・同じ反射率なら見かけ面積(半径の2乗)に比例する概算
  const light=m*m*100;
  moonlight.textContent=m<0.01?'星明かりのみ':light.toFixed(0)+'%';
  let st='安定(いまと同等)';
  if(m<0.01)st='長期でぐらぐら';
  else if(m<0.3)st='長期でぐらつく';
  else if(m<0.6)st='やや不安定';
  stability.textContent=st;
  miniMoon.style.transform='scale('+Math.max(m,0.001)+')';
  miniMoon.style.opacity=m<0.01?'0':'1';
  earthWrap.classList.toggle('unstable',m<0.3);
  if(m>=0.3)earthWrap.style.transform='rotate(23.4deg)';
  else earthWrap.style.transform='';
  panelMoon.classList.toggle('danger',m<0.3);
  let line='月がいてくれると、地球は安心だね',face='happy';
  if(m<0.01){line='月がいない…夜がまっくらだよ…なんだかさみしい…';face='cold';}
  else if(m<0.3){line='月が小さすぎて、地軸を支えきれないみたい…ゆらゆらする…';face='dizzy';}
  else if(m<0.7){line='月がちょっと小さいと、潮もひかえめになるんだね';face='';}
  else if(m>1.2){line='大きな月!潮の満ち引きがすごいことになりそう!';face='dizzy';}
  speechLine.textContent=line;
  setFace(face);
  if(m<0.01)whyMoon.textContent='🔎 月が消えても太陽の潮汐(月の約半分)が残るので、潮は1/3程度になるよ。地軸は長い年月で数十度規模でぐらつくと考えられているよ';
  else if(m<0.3)whyMoon.textContent='🔎 月が小さいと地軸を支えるジャイロの力が弱まるよ。火星(大きな月なし)の地軸は長期で大きく変動してきたと考えられているよ';
  else if(m<=1.2)whyMoon.textContent='🔎 月は潮をつくり、地軸を支える、地球の「安定装置」だよ。年に約3.8cmずつ遠ざかってもいるよ';
  else whyMoon.textContent='🔎 月が大きいほど潮汐は強くなるよ。生まれたての月は距離2万km余りで、潮汐は今よりはるかに強烈だったと考えられているよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
earthWrap.style.transform='rotate(23.4deg)';
moon.addEventListener('input',update);update();
