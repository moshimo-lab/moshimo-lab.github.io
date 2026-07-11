
const $=id=>document.getElementById(id);
const wd=$('wd'),valWd=$('valWd'),wdwind=$('wdwind'),wdheat=$('wdheat'),wdgap=$('wdgap');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const windStage=$('windStage'),mascot=$('mascot'),panelWd=$('panelWd'),whyWd=$('whyWd');
function update(){
  const w=wd.value/100; // 風の強さ(いま=1)
  valWd.textContent=w.toFixed(1)+' 倍';
  wdwind.textContent=w<0.05?'吹かない(無風)':w<0.6?'弱い':w<1.5?'よく吹く':'強い';
  wdheat.textContent=w<0.05?'運ばれない':w<0.6?'運びにくい':w<1.5?'よく混ざる':'活発に混ざる';
  // 温度差: 風なし=約80℃、いま=約40℃。風が強いほど差は縮む(下限35℃程度)
  let gap;
  if(w<0.05)gap=80;
  else gap=Math.round(80-40*Math.min(1,w));
  wdgap.textContent='約'+gap+'℃';
  // 帯アニメの速さ(風が強いほど速い、無風で停止)
  if(windStage){
    const bands=windStage.querySelectorAll('.wind-band');
    bands.forEach(bd=>{
      if(w<0.05){bd.style.animationPlayState='paused';bd.style.opacity=0.25;}
      else{bd.style.animationPlayState='running';bd.style.opacity=1;
        bd.style.animationDuration=(3/Math.max(0.2,w))+'s';}
    });
  }
  panelWd.classList.toggle('danger',w<0.05);
  let line='風がほどよく吹いて、地球の熱をならしているね',face='happy';
  if(w<0.05){line='風が止まった…赤道は灼熱、極は極寒。温度差が倍にひらいちゃう…';face='hot';}
  else if(w<0.6){line='風が弱いね。熱が運ばれにくくて、温度差が開いてきたよ';face='';}
  else if(w>=1.5){line='風が強い!熱がぐんぐん運ばれて、よく混ざっているね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(w<0.05)whyWd.textContent='🔎 大気が熱を運ばないと、赤道と極の温度差は約40℃から約80℃に倍増すると考えられているよ。風は気候をならす名脇役なんだ';
  else if(w<0.6)whyWd.textContent='🔎 貿易風や偏西風は、地球の自転が生むコリオリの力から生まれるよ。自転と風は深くつながっているんだ';
  else whyWd.textContent='🔎 風は熱を運ぶ宅配便。赤道の熱を極へ、極の冷気を赤道へ運んで、地球の温度をならしているんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
wd.addEventListener('input',update);update();
