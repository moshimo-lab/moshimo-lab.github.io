
const $=id=>document.getElementById(id);
const orb=$('orb'),valOrb=$('valOrb'),fluxgap=$('fluxgap'),tgap=$('tgap'),shape=$('shape');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelOrb=$('panelOrb'),whyOrb=$('whyOrb');
const ovOval=$('ovOval'),ovSun=$('ovSun'),ovEarth=$('ovEarth'),ovNear=$('ovNear'),ovFar=$('ovFar');
function update(){
  const e=orb.value/100; // 0〜0.80
  valOrb.textContent=e.toFixed(3);
  // 近日点a(1-e)・遠日点a(1+e)。日射は距離の2乗に反比例。
  // 日射比 = ((1+e)/(1-e))^2。近日点が遠日点の何倍明るいか→%差で表示。
  const ratio=Math.pow((1+e)/(1-e),2);
  const gapPct=(ratio-1)*100;
  fluxgap.textContent=gapPct<1000?'約'+gapPct.toFixed(0)+'%':(ratio).toFixed(0)+'倍';
  // 気温差の概算: 平衡温度は日射の1/4乗∝ (距離)^-1/2。
  // 近日点/遠日点の平衡温度比 = √((1+e)/(1-e))。地球平均288Kに乗せて差をとる。
  // 平衡温度は距離の-1/2乗∝。近日点/遠日点の平衡温度(K)を出し、その差を℃差とする
  const T=278; // 地球の有効放射平衡温度の目安(K)
  const Tperi=T*Math.pow(1-e,-0.5), Tapo=T*Math.pow(1+e,-0.5);
  const dT=Tperi-Tapo;
  tgap.textContent='約'+dT.toFixed(0)+'℃';
  let sp='ほぼ真円';
  if(e>=0.6)sp='彗星みたいな細長い楕円';
  else if(e>=0.3)sp='はっきりタマゴ型';
  else if(e>=0.1)sp='ゆるいタマゴ型';
  else if(e>=0.05)sp='わずかに楕円';
  shape.textContent=sp;
  // 楕円ビジュアル: 半長径a=80px固定、b=a√(1-e²)。太陽は焦点(中心からa·e)に。
  if(ovOval){
    const a=60,bb=a*Math.sqrt(1-e*e);
    ovOval.style.width=(2*a)+'px';ovOval.style.height=(2*bb)+'px';
    ovSun.style.left='calc(50% + '+(a*e)+'px)';
    ovEarth.style.left='calc(50% + '+a+'px)';
    ovNear.style.left='calc(50% + '+(a+12)+'px)';
    ovFar.style.left='calc(50% - '+(a+62)+'px)';
    ovNear.style.opacity=e>0.04?1:0;ovFar.style.opacity=e>0.04?1:0;
  }
  panelOrb.classList.toggle('danger',e>=0.5);
  let line='ほとんど真円。おだやかな軌道だね',face='happy';
  if(e>=0.6){line='ぐわんぐわん!近づくと灼熱、離れると極寒だよ〜!';face='hot';}
  else if(e>=0.3){line='距離でできる季節、けっこう激しいね';face='';}
  else if(e>=0.1){line='ちょっとタマゴ型。季節に距離の味が混ざるね';face='';}
  else if(e<0.005){line='完全な真円!距離の季節はゼロだね';face='happy';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(e<0.05)whyOrb.textContent='🔎 地球の軌道は離心率0.017の、ほとんど真円。だから四季は距離ではなく地軸の傾きがつくっているよ';
  else if(e<0.1)whyOrb.textContent='🔎 火星の離心率は0.093。このくらいから距離由来の季節差がはっきり出てくるよ';
  else if(e<0.3)whyOrb.textContent='🔎 離心率は約10万年周期でのび縮みするよ。氷期のリズム(ミランコビッチ・サイクル)の一要素だよ';
  else if(e<0.6)whyOrb.textContent='🔎 ここまで来ると、傾きとは別に「惑星全体が同時に暑い/寒い」季節が主役になるよ';
  else whyOrb.textContent='🔎 彗星並みの軌道。近日点の灼熱と遠日点の極寒を、毎年往復する過酷な世界だよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
orb.addEventListener('input',update);update();
