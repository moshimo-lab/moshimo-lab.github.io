
const $=id=>document.getElementById(id);
const dn=$('dn'),valDn=$('valDn'),dtemp=$('dtemp'),dco2=$('dco2'),dice=$('dice');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),eraMarker=$('eraMarker'),eraTick=$('eraTick');
const mascot=$('mascot'),panelDn=$('panelDn'),whyDn=$('whyDn');
function update(){
  const p=parseInt(dn.value,10); // 0=現代, 100=恐竜全盛
  // 時代ラベル
  let era;
  if(p<8)era='現代';
  else if(p<40)era='新生代→白亜紀へ';
  else if(p<70)era='白亜紀(恐竜全盛)';
  else if(p<90)era='ジュラ紀';
  else era='三畳紀';
  valDn.textContent=era;
  // 気温: 現代15℃ → 恐竜全盛で+約11℃(6〜14の中間)
  const t=15+11*(p/100);
  dtemp.textContent='約'+t.toFixed(0)+'℃'+(p<8?'(いま)':'');
  // CO2: 現代1倍 → 最大7倍(4〜10の中間)
  const co2=1+6*(p/100);
  dco2.textContent=co2.toFixed(1)+'倍'+(p<8?'(いま)':'');
  // 極の氷
  dice.textContent=p<25?'あり':p<50?'とけかけ':'なし(氷のない地球)';
  if(heatOverlay)heatOverlay.style.opacity=Math.min(0.4,p/100*0.4);
  earthWrap.classList.toggle('extreme-heat',p>=85);
  // 時代マーカー
  if(eraMarker)eraMarker.style.left=p+'%';
  if(eraTick)eraTick.style.left='6%';
  panelDn.classList.toggle('danger',false);
  let line='いまの地球。氷河があって、季節がはっきりしているね',face='happy';
  if(p>=70){line='恐竜時代だ!極地にも氷がなくて、南極にも森が広がってるよ';face='';}
  else if(p>=40){line='どんどん暖かくなって、極地の氷がとけていくね';face='';}
  else if(p>=8){line='時代をさかのぼり中…だんだん暖かくなってきたよ';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(p>=70)whyDn.textContent='🔎 恐竜時代のCO₂は今の4〜10倍、平均気温は6〜14℃も高かったよ。南極の海水温は約17℃(今は約2℃)もあったんだ';
  else if(p>=40)whyDn.textContent='🔎 火山活動が活発でCO₂が多く、温室効果で極地の氷までとけていったよ。海面も今より高かったんだ';
  else whyDn.textContent='🔎 恐竜時代は火山活動が活発でCO₂が多く、地球全体が今よりずっと暖かい「温室地球」だったよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
dn.addEventListener('input',update);update();
