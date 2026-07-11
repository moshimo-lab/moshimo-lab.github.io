
const $=id=>document.getElementById(id);
const fl=$('fl'),valFl=$('valFl'),fdir=$('fdir'),fstr=$('fstr'),fshield=$('fshield');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const fNeedle=$('fNeedle'),fPhase=$('fPhase'),mascot=$('mascot'),panelFl=$('panelFl'),whyFl=$('whyFl');
function update(){
  const p=parseInt(fl.value,10); // 逆転の進み具合%
  valFl.textContent=p+(p<2?'%(いまの向き)':p>98?'%(逆転完了)':'%');
  // 針の回転: 0%=0deg(N北) → 100%=180deg(N南)
  if(fNeedle)fNeedle.style.transform='rotate('+(p/100*180)+'deg)';
  // 向き表示
  let dir;
  if(p<15)dir='北';
  else if(p<85)dir='ぐるぐる(不安定)';
  else dir='南';
  fdir.textContent=dir;
  // 強さ: 逆転の最中(50%)で最小=約10%
  const strength=Math.round(100-90*Math.sin(p/100*Math.PI));
  fstr.textContent=strength+'%';
  fshield.textContent=strength<40?'弱まる(でも機能)':'しっかり';
  panelFl.classList.toggle('danger',p>=30&&p<=70);
  if(fPhase){
    if(p<15)fPhase.textContent='いまの地球:Nは北';
    else if(p<85)fPhase.textContent='逆転の最中:磁石が弱く不安定(オーロラが各地に)';
    else fPhase.textContent='逆転完了:Nは南';
  }
  let line='方位磁針は北を指す、いつもの地球だね',face='happy';
  if(p>=40&&p<=60){line='磁石が弱まって不安定…でもバリアはまだ効いてるよ';face='dizzy';}
  else if(p>85){line='逆転完了!方位磁針のNが南を指してる…不思議な感じ';face='';}
  else if(p>=15){line='磁石の向きがぐらぐら変わってる最中だよ';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(p>=30&&p<=70)whyFl.textContent='🔎 逆転の最中は地磁気が今の10分の1ほどに弱まるよ。それでもバリアと大気が守るので、生き物への影響は限定的と考えられているんだ';
  else if(p>85)whyFl.textContent='🔎 直近の逆転は約77万年前。その地層(千葉)が「チバニアン」の由来だよ。地質時代名に日本の地名がついた初の例なんだ';
  else whyFl.textContent='🔎 地球の中心では溶けた鉄が対流して、地球を大きな磁石にしているよ。その向きは数万〜数十万年ごとに逆転してきたんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
fl.addEventListener('input',update);update();
