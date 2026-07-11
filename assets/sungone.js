
const $=id=>document.getElementById(id);
const sg=$('sg'),valSg=$('valSg'),elapsed=$('elapsed'),sky=$('sky'),orbit=$('orbit');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const iceOverlay=$('iceOverlay'),mascot=$('mascot'),panelSg=$('panelSg'),whySg=$('whySg');
// スライダー0-100を、対数的な時間軸(0秒〜数か月)に対応させる
function phaseFromVal(v){
  // 0-40: 0〜8分19秒(499秒), 40-70: 〜数時間, 70-100: 〜数か月
  if(v<=40)return {sec:v/40*499};
  if(v<=70)return {sec:499+(v-40)/30*(6*3600)};
  return {sec:499+6*3600+(v-70)/30*(90*24*3600)};
}
function fmt(sec){
  if(sec<60)return sec.toFixed(0)+'秒';
  if(sec<3600)return Math.floor(sec/60)+'分'+Math.floor(sec%60)+'秒';
  if(sec<86400)return (sec/3600).toFixed(1)+'時間';
  return Math.round(sec/86400)+'日';
}
function update(){
  const v=parseInt(sg.value,10);
  const {sec}=phaseFromVal(v);
  const before=sec<499; // 8分19秒=499秒
  elapsed.textContent=fmt(sec);
  valSg.textContent=(sec<1?'0秒(消えた瞬間)':fmt(sec)+'後');
  if(before){sky.textContent='いつも通り明るい';orbit.textContent='太陽をまわる';}
  else{
    sky.textContent='真っ暗';
    orbit.textContent='まっすぐ飛んでいく';
  }
  // 寒冷化: 8分19秒以降、時間とともに冷える
  let coldFrac=0;
  if(!before){coldFrac=Math.min(1,(sec-499)/(60*24*3600));}
  if(iceOverlay)iceOverlay.style.opacity=coldFrac*0.7;
  earthWrap.classList.toggle('extreme-ice',coldFrac>0.5);
  panelSg.classList.toggle('danger',!before);
  let line,face;
  if(before){line='太陽…いつも通りに見えるよ?まだ何も起きてない…';face='happy';}
  else if(sec<3600){line='太陽が消えた!空も真っ暗…そして体が軽い?地球が軌道をはずれたんだ…';face='dizzy';}
  else if(coldFrac<0.5){line='どんどん冷えていく…太陽って、こんなにあたたかかったんだね…';face='cold';}
  else{line='海まで凍りはじめた…でも深い海の底には、まだ生き物がいるかも…';face='cold';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(before)whySg.textContent='🔎 光も重力も秒速約30万km。太陽まで約1億5000万km離れているから、変化が届くのに8分19秒かかるよ。それまで誰も気づかないんだ';
  else if(sec<3600)whySg.textContent='🔎 引力が消えると、地球はひもを切られたボールのように、その瞬間の進行方向へまっすぐ飛んでいくよ';
  else whySg.textContent='🔎 本当にこわいのは暗さより寒さ。ただし海の大きな熱や地熱のおかげで、すぐ全部が凍るわけではないよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
sg.addEventListener('input',update);update();
