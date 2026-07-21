
const $=id=>document.getElementById(id);
const oc=$('oc'),valOc=$('valOc'),sea=$('sea'),swing=$('swing'),dry=$('dry');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),iceOverlay=$('iceOverlay');
const dryOverlay=$('dryOverlay'),floodOverlay=$('floodOverlay');
const mascot=$('mascot'),panelOc=$('panelOc'),whyOc=$('whyOc');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const p=parseInt(oc.value,10); // 海の割合 %
  valOc.textContent=p+'%';
  sea.textContent=p+'%';
  let sw;
  if(p>=85)sw='とてもおだやか';
  else if(p>=60)sw='おだやか';
  else if(p>=40)sw='やや激しい';
  else if(p>=15)sw='大陸性・激しい';
  else sw='極端(灼熱と極寒)';
  swing.textContent=sw;
  let dr;
  if(p>=85)dr='どこも湿潤';
  else if(p>=60)dr='うるおい十分';
  else if(p>=40)dr='内陸は乾燥ぎみ';
  else if(p>=15)dr='内陸に砂漠が拡大';
  else dr='ほぼ全土が乾燥';
  dry.textContent=dr;
  // ★見た目: 大陸の面積が海の割合に連動して育つ/沈む
  const landFrac=(100-p)/29;                       // いま(海71%)=1
  const scale=Math.min(1.75,Math.sqrt(Math.max(0,landFrac)));
  earthWrap.style.setProperty('--lscale',scale.toFixed(3));
  earthWrap.style.setProperty('--lopacity',(p>=97?Math.max(0,(100-p)/3):1).toFixed(2));
  // 乾燥した惑星へ(海が減るほど砂色に)/水の惑星へ(海が増えるほど大陸が沈み波が出る)
  dryOverlay.style.opacity=p<71?((71-p)/71).toFixed(2):0;
  floodOverlay.style.opacity=p>71?((p-71)/29*0.85).toFixed(2):0;
  earthWrap.classList.toggle('dryworld',p<40);
  const heat=Math.max(0,(71-p)/71)*0.35;
  heatOverlay.style.opacity=p<25?heat:0;iceOverlay.style.opacity=0;
  earthWrap.classList.toggle('extreme-heat',p<15);
  panelOc.classList.toggle('danger',p<25||p>97);
  let line='海7割。気候をなめらかにしてくれる、ちょうどいい配分だね',face='happy';
  if(p<15){line='陸ばっかり…夏は灼熱、冬は極寒。内陸カラカラだよ…';face='hot';}
  else if(p<40){line='海が減ると、季節の寒暖差がきびしくなるんだね';face='';}
  else if(p>97){line='見わたすかぎり海…おだやかだけど、陸の役目も恋しいかも';face='';}
  else if(p>=60&&p<=85){line='海7割。気候をなめらかにしてくれる、ちょうどいい配分だね';face='happy';}
  speechLine.textContent=line;
  setFace(face);
  if(p<15)whyOc.textContent='🔎 海が少ないと保温タンクが小さくなり、内陸は大陸性気候に。パンゲアの内部もこんな酷暑と乾燥だったと考えられているよ';
  else if(p<40)whyOc.textContent='🔎 海から遠いほど寒暖差が大きく雨も届きにくいよ。シベリアの年較差は60℃超だよ';
  else if(p<=85)whyOc.textContent='🔎 海は大気の約1000倍の熱をたくわえる保温タンク。今の7割が気候をなめらかにしているよ';
  else whyOc.textContent='🔎 全部海だと気温はおだやか。でも陸がないと岩石の風化による養分やCO2調整の仕組みが弱まると考えられるよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
oc.addEventListener('input',update);update();
