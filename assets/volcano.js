
const $=id=>document.getElementById(id);
const vo=$('vo'),valVo=$('valVo'),vdust=$('vdust'),vshort=$('vshort'),vlong=$('vlong');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const iceOverlay=$('iceOverlay'),heatOverlay=$('heatOverlay'),mascot=$('mascot'),panelVo=$('panelVo'),whyVo=$('whyVo');
function update(){
  const n=vo.value/100; // 噴火の多さ(いま=1)
  valVo.textContent=n.toFixed(n<10?1:0)+' 倍';
  // 空のちり
  vdust.textContent=n<0.1?'ほとんどなし':n<0.8?'少なめ':n<1.5?'ふつう':n<2.3?'かすむ':'空が暗い';
  // 短期(数年後): 日傘効果で寒冷化
  let s;
  if(n<0.5)s='やや高め';
  else if(n<1.5)s='安定';
  else if(n<2.3)s='寒くなる(火山の冬)';
  else s='冷夏・凶作レベル';
  vshort.textContent=s;
  // 長期(数百年後): CO2で温暖化
  let l;
  if(n<0.5)l='やや低め';
  else if(n<1.5)l='安定';
  else if(n<2.3)l='暖かくなる';
  else l='温暖化が進む';
  vlong.textContent=l;
  // 見た目: 噴火多いと短期の寒冷を主に表現(ちりの日傘)
  if(iceOverlay)iceOverlay.style.opacity=n>1.5?Math.min(0.45,(n-1.5)/1.5*0.45):0;
  if(heatOverlay)heatOverlay.style.opacity=0;
  panelVo.classList.toggle('danger',n>=2.3);
  let line='いまの地球の火山活動。バランスが取れているね',face='happy';
  if(n<0.1){line='火山が静かだね。でも火山は地球が生きている証拠でもあるんだよ';face='';}
  else if(n>=2.3){line='噴火だらけ…空がちりで暗くて、数年は寒くなりそう…';face='cold';}
  else if(n>=1.5){line='噴火が増えてきた。まずは日傘効果で少し寒くなるよ';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(n>=2.3)whyVo.textContent='🔎 短期はちりの日傘で寒冷化(火山の冬)、でも長期は火山のCO₂で温暖化。火山は冷房と暖房、両方のスイッチを持っているんだ';
  else if(n>=1.5)whyVo.textContent='🔎 1991年のピナトゥボ噴火では、ちりが3週間で地球を取り巻き、世界の平均気温が約0.4℃下がったよ';
  else whyVo.textContent='🔎 噴火のちりは太陽の光をさえぎって地球を冷やすよ。でも火山が出すCO₂は、長い時間をかけて地球を暖めるんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
vo.addEventListener('input',update);update();
