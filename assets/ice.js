
const $=id=>document.getElementById(id);
const ice=$('ice'),valIce=$('valIce'),ifloat=$('ifloat'),ilake=$('ilake'),ifish=$('ifish');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const iceOverlay=$('iceOverlay'),mascot=$('mascot'),panelIce=$('panelIce'),whyIce=$('whyIce');
function update(){
  const d=ice.value/100; // 氷の密度(水=1.00)
  let tag='';
  if(Math.abs(d-0.92)<0.005)tag='(いまの氷)';
  else if(d<1.0)tag='(水より軽い)';
  else if(d===1.0)tag='(水と同じ)';
  else tag='(水より重い)';
  valIce.textContent=d.toFixed(2)+tag;
  const sinks=d>1.0;
  ifloat.textContent=sinks?'沈む':(d===1.0?'ただよう':'浮く');
  ilake.textContent=sinks?'底から凍っていく':'表面にフタ';
  ifish.textContent=sinks?'冬を越せない':'冬を越せる';
  if(iceOverlay)iceOverlay.style.opacity=sinks?0.55:0;
  earthWrap.classList.toggle('extreme-ice',sinks);
  panelIce.classList.toggle('danger',sinks);
  let line='氷はぷかぷか。湖の生き物は氷のフタの下で冬を越せるよ',face='happy';
  if(sinks){line='氷が沈んでいく…湖が底から凍って、魚が閉じこめられちゃう…';face='cold';}
  else if(d<0.85){line='ずいぶん軽い氷。氷山がもっと高く顔を出すね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(sinks)whyIce.textContent='🔎 氷が沈む世界では、湖は底から丸ごと凍り、春が来ても光が届かず解けにくい。水中の生態系は冬を越せなくなるよ';
  else if(d<0.85)whyIce.textContent='🔎 氷が軽いほど水面から高く浮く。いまの氷山は約1割だけ海面に出ているよ(氷山の一角!)';
  else whyIce.textContent='🔎 いまの氷の密度は約0.92。水(1.00)より軽いから浮くよ。固体が液体より軽いのは、自然界ではとてもめずらしいんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
ice.addEventListener('input',update);update();
