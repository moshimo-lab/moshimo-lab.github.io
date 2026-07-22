
const $=id=>document.getElementById(id);
const wt=$('wt'),valWt=$('valWt'),wsea=$('wsea'),wland=$('wland'),wworld=$('wworld');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const slWater=$('slWater'),slLabel=$('slLabel'),mascot=$('mascot'),panelWt=$('panelWt'),whyWt=$('whyWt');
const dryOverlay=$('dryOverlay'),floodOverlay=$('floodOverlay');
function update(){
  const w=wt.value/100; // 水の量(いま=1)
  valWt.textContent=w.toFixed(2)+(w<0.02?' 倍(水なし)':Math.abs(w-1)<0.03?' 倍(いまの地球)':' 倍');
  // 海の割合(ざっくり: 0倍=0%, 1倍=71%, 3倍=100%)
  let sea;
  if(w<0.02)sea=0;
  else if(w<=1)sea=Math.round(71*Math.pow(w,0.5));
  else sea=Math.min(100,Math.round(71+(w-1)*14));
  wsea.textContent=sea+'%';
  // 陸地
  let land;
  if(w<0.02)land='海が消えた乾いた星';
  else if(w<0.5)land='広大な大陸・浅い海';
  else if(w<=1.3)land='海と陸のバランス';
  else if(w<2.2)land='陸地が沈んでいく';
  else land='山の頂だけの島';
  wland.textContent=land;
  // 世界のかたち
  wworld.textContent=w<0.02?'砂漠の星':w<0.5?'大陸の星':w<=1.3?'いまの地球':w<2.2?'水浸しの世界':'水の世界(ほぼ全海)';
  // 海面ビジュアル(高さ%)
  if(slWater){const h=Math.max(4,Math.min(96,sea));slWater.style.height=h+'%';}
  if(slLabel)slLabel.textContent='水の量 '+w.toFixed(1)+'倍';
  const ice=w<0.02?0.4:0;
  panelWt.classList.toggle('danger',w<0.02||w>=2.5);
  // 水の量に応じたオーバーレイ効果
  const dryEffect=w<0.5?Math.min(1,(0.5-w)/0.5):0;
  const floodEffect=w>1.3?Math.min(0.7,(w-1.3)/1.7*0.7):0;
  if(dryOverlay)dryOverlay.style.opacity=dryEffect.toFixed(2);
  if(floodOverlay)floodOverlay.style.opacity=floodEffect.toFixed(2);
  let line='海71%、陸29%。いまの地球のバランスだね',face='happy';
  if(w<0.02){line='水が全部消えた…海のない、からからの星だ…';face='dizzy';}
  else if(w<0.5){line='水が減って、海底が顔を出してきた!大陸が広いね';face='';}
  else if(w>=2.5){line='水浸し…陸がほとんど沈んで、山の頂しか残ってないよ…';face='cold';}
  else if(w>1.3){line='水が増えて、低い土地が沈みはじめたね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(w<0.5)whyWt.textContent='🔎 海の水は地表に薄く広がっているだけ(平均の深さ約3700m)。だから少し減るだけで広大な陸が現れるよ';
  else if(w>=2.5)whyWt.textContent='🔎 宇宙には地表がほぼ全部海の「海洋惑星」もあると考えられているよ。陸と海の両方を持てる地球は、実は絶妙なんだ';
  else whyWt.textContent='🔎 地球の水を全部集めても、直径約1400kmの球にしかならないよ。地球(直径約1万3000km)にくらべると、意外なほど小さいんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
wt.addEventListener('input',update);update();
