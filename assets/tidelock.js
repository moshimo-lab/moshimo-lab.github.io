
const $=id=>document.getElementById(id);
const tl=$('tl'),valTl=$('valTl'),tlday=$('tlday'),tlnight=$('tlnight'),tllive=$('tllive');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),iceOverlay=$('iceOverlay'),mascot=$('mascot'),panelTl=$('panelTl'),whyTl=$('whyTl');
function update(){
  const p=parseInt(tl.value,10); // 0=自転, 100=完全ロック
  valTl.textContent=p<3?'0%(いまの地球:自転する)':p>97?'100%(片面を向け固定)':p+'%';
  // ロックが進むほど昼面は灼熱・夜面は極寒に
  if(p<10){tlday.textContent='昼と夜がめぐる';tlnight.textContent='昼と夜がめぐる';}
  else{
    tlday.textContent=p<50?'昼が長く暑い':p<85?'ほぼ永遠の昼':'永遠の昼(灼熱)';
    tlnight.textContent=p<50?'夜が長く寒い':p<85?'ほぼ永遠の夜':'永遠の夜(極寒)';
  }
  // 住める場所
  let live;
  if(p<10)live='ほぼ全体';
  else if(p<50)live='広い範囲';
  else if(p<85)live='境界に限られる';
  else live='「永遠の夕暮れ」の帯だけ';
  tllive.textContent=live;
  if(heatOverlay)heatOverlay.style.opacity=p>=50?Math.min(0.4,(p-50)/50*0.4):0;
  if(iceOverlay)iceOverlay.style.opacity=p>=50?Math.min(0.35,(p-50)/50*0.35):0;
  earthWrap.classList.toggle('extreme-heat',p>=90);
  panelTl.classList.toggle('danger',p>=85);
  let line='自転して、昼と夜が規則正しくめぐる地球だね',face='happy';
  if(p>=85){line='片面が永遠の昼で灼熱、片面が永遠の夜で極寒…境目だけが頼りだよ…';face='hot';}
  else if(p>=50){line='自転が遅くなってきた…昼の面と夜の面の差が開いていくよ';face='';}
  else if(p>=10){line='だんだん自転が遅くなってる。昼と夜が長くなってきたね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(p>=85)whyTl.textContent='🔎 昼と夜の境目「ターミネーターゾーン(永遠の夕暮れ)」だけは、灼熱と極寒が混ざってちょうどよい気温になり、生命が住める可能性があるよ';
  else if(p>=50)whyTl.textContent='🔎 月が地球にいつも同じ面を向けているのと同じ現象。主星に近い惑星ほど起こりやすいよ';
  else whyTl.textContent='🔎 主星に近すぎると、惑星は同じ面を向けたまま止まる「潮汐ロック」になるよ。月が地球にいつも同じ面を向けているのと同じだよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
tl.addEventListener('input',update);update();
