
const $=id=>document.getElementById(id);
const atm=$('atm'),valAtm=$('valAtm'),temp=$('temp'),green=$('green'),pressure=$('pressure');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),iceOverlay=$('iceOverlay');
const mascot=$('mascot'),panelAtm=$('panelAtm'),whyAtm=$('whyAtm');
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const a=Math.pow(10,(atm.value/1000)*5-3); // 0.001-100倍
  valAtm.textContent=(a<0.01?a.toExponential(1):a.toFixed(2))+' 倍';
  const deltaT=33*Math.pow(a,0.604);
  const tempC=255+deltaT-273;
  temp.textContent='約'+tempC.toFixed(0)+'℃';
  green.textContent='+'+deltaT.toFixed(0)+'℃';
  // 気圧のたとえ: 1気圧超は水深換算(約10.3m/気圧)、1気圧未満は標高換算(スケールハイト約7.4km)
  if(a>=1.05)pressure.textContent='水深'+Math.round((a-1)*10.3)+'m相当';
  else if(a>0.95)pressure.textContent='地上と同じ';
  else pressure.textContent='標高'+Math.round(-7400*Math.log(a)).toLocaleString()+'m の空気';
  const heat=clamp((tempC-15)/80,0,.92),ice=clamp((15-tempC)/60,0,.92);
  heatOverlay.style.opacity=heat;iceOverlay.style.opacity=ice;
  earthWrap.classList.toggle('extreme-heat',heat>.5);
  earthWrap.classList.toggle('extreme-ice',ice>.5);
  panelAtm.classList.toggle('danger',a<0.02||a>50);
  let line='ちょうどいい厚さの空気だね',face='happy';
  if(a>80){line='これはもう金星…!暑い、重い、つぶれる〜!';face='hot';}
  else if(heat>.5){line='空気が厚すぎるよ…熱がこもって出ていかない…';face='hot';}
  else if(heat>.15){line='ちょっと蒸してきたかも…';face='hot';}
  else if(a<0.02){line='空気がなさすぎて、昼は焼けて夜は凍っちゃう…息もできない…';face='cold';}
  else if(ice>.3){line='空気がうすい…さむい…';face='cold';}
  speechLine.textContent=line;
  setFace(face);
  if(a>50)whyAtm.textContent='🔎 金星(大気92倍相当)の実測は約460℃・92気圧。このざっくりモデルでも90倍で約480℃。いい線いってるでしょ';
  else if(a>5)whyAtm.textContent='🔎 大気が濃いほど温室効果が強まり、熱がこもるよ(今は+'+deltaT.toFixed(0)+'℃の上乗せ)';
  else if(a>=0.3)whyAtm.textContent='🔎 地球の温室効果は約+33℃。これがなければ平均気温は−18℃の氷の星だよ';
  else if(a>=0.02)whyAtm.textContent='🔎 大気1%未満の火星は温室効果がほぼ働かず、平均−63℃。大気の保温の大切さがわかるね';
  else whyAtm.textContent='🔎 ほぼ真空だと月と同じ。昼は100℃超え、夜は−100℃以下の世界だよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
atm.addEventListener('input',update);update();
