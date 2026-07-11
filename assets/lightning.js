
const $=id=>document.getElementById(id);
const lt=$('lt'),valLt=$('valLt'),ltfreq=$('ltfreq'),ltfix=$('ltfix'),ltlife=$('ltlife');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelLt=$('panelLt'),whyLt=$('whyLt');
function update(){
  const n=lt.value/100; // 雷の多さ(いま=1)
  valLt.textContent=n.toFixed(n<10?1:0)+' 倍';
  ltfreq.textContent=n<0.05?'ほとんどなし':n<0.8?'少なめ':n<1.5?'ふつう':n<2.3?'とても多い':'ひっきりなし';
  // 窒素固定
  ltfix.textContent=n<0.05?'ほぼなし':n<0.8?'ひかえめ':n<1.5?'少し':n<2.3?'活発':'とても活発';
  // 生命の材料
  ltlife.textContent=n<0.05?'つくられない':n<0.8?'ごくわずか':n<1.5?'わずかに':n<2.3?'そこそこ':'さかんに(かも)';
  panelLt.classList.toggle('danger',n>=2.3);
  let line='ときどき雷が鳴る、いつもの地球だね',face='happy';
  if(n>=2.3){line='一日中雷だらけ…こわいけど、実は生命の材料を作ってるのかも…';face='dizzy';}
  else if(n>=1.5){line='雷が増えたね。空気の栄養がたくさん作られているよ';face='';}
  else if(n<0.05){line='雷のない静かな空。でも少しさびしい気もするね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(n>=2.3)whyLt.textContent='🔎 1953年のミラーの実験では、雷に見立てた放電で生命の材料アミノ酸ができたよ。こわい雷と、いのちの火花は同じものだったのかも';
  else if(n>=1.5)whyLt.textContent='🔎 雷は空気の窒素を「使える形」に変える(窒素固定)。雨に溶けて地上に降り、植物の栄養になるんだ';
  else whyLt.textContent='🔎 雷は一瞬で空気を超高温にして、ふつうは結びつかない空気中の窒素どうしを反応させるよ。これが生き物の栄養や材料になるんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
lt.addEventListener('input',update);update();
