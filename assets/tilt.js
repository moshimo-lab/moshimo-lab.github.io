
const $=id=>document.getElementById(id);
const tilt=$('tilt'),valTilt=$('valTilt'),season=$('season'),polar=$('polar'),pop=$('pop');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelTilt=$('panelTilt'),whyTilt=$('whyTilt');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const t=tilt.value/10;
  valTilt.textContent=t.toFixed(1)+'°';
  earthWrap.style.transform='rotate('+t+'deg)';
  const swing=t*0.85;
  season.textContent='±'+swing.toFixed(0)+'℃';
  polar.textContent=t<1?'なし':(90-t).toFixed(1)+'°〜';
  const lowDev=Math.max(0,23.4-t),highDev=Math.max(0,t-23.4);
  const tiltFactor=Math.exp(-Math.pow(lowDev/50,2))*Math.exp(-Math.pow(highDev/22,2));
  const population=80*tiltFactor;
  pop.textContent='約'+population.toFixed(1)+'億';
  panelTilt.classList.toggle('danger',t>60);
  let line='23.4°。ちょうどいい四季の傾きだね',face='happy';
  if(t<3){line='まっすぐ!四季がなくなっちゃった…毎日おなじ季節だ';face='';}
  else if(t<15){line='季節の変化がずいぶん穏やかになったね';face='';}
  else if(t<=30){line='23.4°前後。ちょうどいい四季の傾きだね';face='happy';}
  else if(t<55){line='夏が暑くて冬が寒い…季節差がきびしくなってきたよ';face='';}
  else if(t<80){line='季節が激しすぎるよ〜!夏は灼熱、冬は極寒…';face='cold';}
  else{line='横倒しだ〜!極地は半年ずっと夜になっちゃう…';face='dizzy';}
  speechLine.textContent=line;
  setFace(face);
  if(t<5)whyTilt.textContent='🔎 傾きがほぼ0だと四季がほとんど消えるよ。不便だけど、壊滅的ではないのがポイント';
  else if(t<15)whyTilt.textContent='🔎 傾きが小さいと季節の変化が穏やかになるよ';
  else if(t<=30)whyTilt.textContent='🔎 今の23.4°くらいの傾きが、程よい四季とバランスの取れた気候帯を生み出しているよ';
  else if(t<55)whyTilt.textContent='🔎 傾きが大きくなるほど、夏はより暑く冬はより寒くなり、季節差がどんどん激しくなるよ';
  else whyTilt.textContent='🔎 「極夜が起きる緯度」に注目。90°に近づくほど、半年間夜が続くエリアが赤道近くまで広がるよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
tilt.addEventListener('input',update);update();
