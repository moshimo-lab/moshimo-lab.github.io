
const $=id=>document.getElementById(id);
const gh=$('gh'),valGh=$('valGh'),gtemp=$('gtemp'),warmup=$('warmup'),gsurf=$('gsurf');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),iceOverlay=$('iceOverlay');
const mascot=$('mascot'),panelGh=$('panelGh'),whyGh=$('whyGh');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const g=gh.value/100; // 温室効果の強さ(いま=1)
  valGh.textContent=g.toFixed(2)+' 倍';
  // 毛布のぶん: いま=+33℃。効きに比例(頭打ちなしの単純モデル)。
  const warm=33*g;
  warmup.textContent=(warm>=0?'+':'')+warm.toFixed(0)+'℃';
  // 平均気温 = 放射平衡−18℃ + 毛布ぶん
  const t=-18+warm;
  gtemp.textContent=(t>=0?'+':'')+t.toFixed(0)+'℃';
  // 地表のようす
  let s;
  if(t<=-10)s='全球凍結';
  else if(t<5)s='寒冷';
  else if(t<25)s='ちょうどいい';
  else if(t<60)s='灼熱化';
  else s='暴走温室(金星化)';
  gsurf.textContent=s;
  const heat=t>40?Math.min(0.6,(t-40)/40*0.6):0;
  const ice=t<0?Math.min(0.6,(-t)/30*0.6):0;
  if(heatOverlay)heatOverlay.style.opacity=heat;
  if(iceOverlay)iceOverlay.style.opacity=ice;
  earthWrap.classList.toggle('extreme-heat',t>60);
  panelGh.classList.toggle('danger',t<=-10||t>=60);
  let line='温室効果、ちょうどいい効きぐあいだね',face='happy';
  if(g<0.05){line='温室効果が消えた…−18℃まで凍えていくよ…';face='cold';}
  else if(t<0){line='温室効果が弱い…海まで凍っちゃいそう';face='cold';}
  else if(t>=60){line='効きすぎだよ!金星みたいな灼熱…';face='hot';}
  else if(t>=25){line='ちょっと暑いね。効きが強すぎるかも';face='';}
  speechLine.textContent=line;
  setFace(face);
  if(g<0.05)whyGh.textContent='🔎 温室効果ゼロだと平均−18℃。今の+15℃との差「33℃」が温室効果の実力だよ';
  else if(t>=60)whyGh.textContent='🔎 温室効果が効きすぎると暴走温室に。金星が462℃なのは、この暴走が原因だよ';
  else if(g<=1.2)whyGh.textContent='🔎 温室効果は、地球から逃げる熱をつかまえて温める「毛布」。ないと地球は凍りつくよ';
  else whyGh.textContent='🔎 温室効果は悪者じゃない。ただ「効きすぎ」は暑くなりすぎる。多すぎず少なすぎずが大事なんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
gh.addEventListener('input',update);update();
