
const $=id=>document.getElementById(id);
const dist=$('dist'),valDist=$('valDist'),flux=$('flux'),temp=$('temp'),ocean=$('ocean');
const laneEarth=$('laneEarth'),laneTick=$('laneTick'),skySun=$('skySun'),skySunVal=$('skySunVal');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelDist=$('panelDist'),whyDist=$('whyDist');
const heatOverlay=$('heatOverlay'),iceOverlay=$('iceOverlay');
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const d=dist.value/100;
  let near='';
  if(Math.abs(d-1)<0.03)near='(いまとおなじ)';
  else if(d<1)near='(いまより近い)';
  else near='(いまより遠い)';
  valDist.innerHTML=d.toFixed(2)+' 倍'+near+'<span class="vsub">= '+d.toFixed(2)+' AU(天文単位)…太陽と地球のいまの距離が「1AU」だよ</span>';
  // 距離レーン: 0.1〜5倍を対数で配置
  const pos=Math.max(0,Math.min(100,(Math.log10(d)+1)/Math.log10(50)*100));
  if(laneEarth)laneEarth.style.left=pos+'%';
  if(laneTick)laneTick.style.left=((0+1)/Math.log10(50)*100)+'%';
  // 地球から見える太陽: 見かけの大きさ∝1/距離
  if(skySun){const s=Math.max(7,Math.min(78,34/d));skySun.style.width=s+'px';skySun.style.height=s+'px';}
  if(skySunVal)skySunVal.textContent=(1/d).toFixed(1)+'倍';
  const f=100/(d*d);
  flux.textContent=(f>=100?f.toFixed(0):f.toFixed(1))+'%';
  const tempC=255/Math.sqrt(d)+33-273; // 大気は地球のまま(=1倍)
  temp.textContent='約'+tempC.toFixed(0)+'℃';
  let sea='液体';
  if(tempC>=100)sea='蒸発…';
  else if(tempC>=0)sea='液体';
  else if(tempC>=-40)sea='凍結が進む';
  else sea='ほぼ全面凍結';
  ocean.textContent=sea;
  const heat=clamp((tempC-15)/80,0,.92),ice=clamp((15-tempC)/60,0,.92);
  heatOverlay.style.opacity=heat;iceOverlay.style.opacity=ice;
  earthWrap.classList.toggle('extreme-heat',heat>.5);
  earthWrap.classList.toggle('extreme-ice',ice>.5);
  panelDist.classList.toggle('danger',d<0.3||d>3.2);
  let line='1AU。ちょうどいい席だね',face='happy';
  if(tempC>=100){line='海が沸いてる…!太陽、近すぎるよ…';face='hot';}
  else if(heat>.3){line='暑い…この席、太陽に近すぎない?';face='hot';}
  else if(d>=1.4&&d<=1.65){line='ここ、火星の席だ…寒いよ〜。大気の毛布がほしい…';face='cold';}
  else if(tempC<=-40){line='海まで真っ白…雪玉になっちゃった…';face='cold';}
  else if(ice>.3){line='席替えしたら寒くなった…';face='cold';}
  speechLine.textContent=line;
  setFace(face);
  if(d<0.3)whyDist.textContent='🔎 太陽に近すぎると日射が10倍以上になり、海が蒸発するほど気温が上がるよ';
  else if(d<0.85)whyDist.textContent='🔎 日射は距離の2乗で増える(今は地球の'+f.toFixed(0)+'%)。席がちょっと前なだけで大違い';
  else if(d<1.15)whyDist.textContent='🔎 今の距離(1AU)は、水が液体で存在できる"ハビタブルゾーン"のほぼ中心だよ';
  else if(d<=1.7)whyDist.textContent='🔎 このあたりが広い見積もりのハビタブルゾーンの外縁(約1.67AU)。大気しだいで住めるかどうかが決まる席だよ';
  else if(d<=3.2)whyDist.textContent='🔎 日射が'+f.toFixed(0)+'%まで減ったよ。CO2の温室効果でどこまで粘れるかの勝負になるよ';
  else whyDist.textContent='🔎 日射が1/10以下。もう大気の毛布ではカバーしきれない距離だよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
dist.addEventListener('input',update);update();
