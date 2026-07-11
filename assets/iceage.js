
const $=id=>document.getElementById(id);
const ia=$('ia'),valIa=$('valIa'),iatemp=$('iatemp'),iaice=$('iaice'),iasea=$('iasea');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const iceOverlay=$('iceOverlay'),heatOverlay=$('heatOverlay'),iaWater=$('iaWater'),iaLabel=$('iaLabel');
const mascot=$('mascot'),panelIa=$('panelIa'),whyIa=$('whyIa');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const p=parseInt(ia.value,10); // 0=いま(間氷期), 100=氷期のピーク(約2万年前相当)
  // 気候ラベル
  let lab;
  if(p<10)lab='間氷期(いま)';
  else if(p<45)lab='寒冷化が進む';
  else if(p<85)lab='氷期';
  else lab='氷期のピーク';
  valIa.textContent=lab;
  // 平均気温: 15℃ → 9℃(−6℃)
  const t=15-6*(p/100);
  iatemp.textContent='約'+t.toFixed(0)+'℃'+(p<10?'(いま)':'(いまより'+(15-t).toFixed(0)+'℃低い)');
  // 氷におおわれた陸: 約1割 → 約25%
  const icePct=10+15*(p/100);
  iaice.textContent=p<10?'約1割':'約'+icePct.toFixed(0)+'%';
  // 海面: 0 → −125m
  const sea=Math.round(-125*(p/100));
  iasea.textContent=p<10?'いまの高さ':sea+' m';
  // 海面ビジュアル: いま50% → ピーク20%
  if(iaWater)iaWater.style.height=(50-30*(p/100))+'%';
  if(iaLabel)iaLabel.textContent=p<10?'いまの気候':lab;
  // 地球ビジュアル
  if(iceOverlay)iceOverlay.style.opacity=Math.min(0.65,p/100*0.65);
  if(heatOverlay)heatOverlay.style.opacity=0;
  earthWrap.classList.toggle('extreme-ice',p>=75);
  panelIa.classList.toggle('danger',p>=85);
  let line='いまは氷期と氷期の間の、暖かい「間氷期」なんだよ',face='happy';
  if(p>=85){line='氷期のピーク!海が下がって、大陸が地続きになってる。マンモスが歩いてそう…さむい…';face='cold';}
  else if(p>=45){line='氷床がどんどん育って、海面が下がってきたよ。浅い海が陸になっていく…';face='cold';}
  else if(p>=10){line='少しずつ寒くなってきた…氷期に向かってるのかな';face='';}
  speechLine.textContent=line;
  setFace(face);
  if(p>=85)whyIa.textContent='🔎 約2万年前の最終氷期極大期は、平均気温が今より約6℃低く、海面は約125mも低かったよ。日本列島も大陸とほぼ地続きだったんだ';
  else if(p>=45)whyIa.textContent='🔎 海の水が雪になって陸に氷床として積もるぶん、海面が下がるよ。氷は日ざしをはね返す(アルベド)ので、寒さがさらに寒さを呼ぶんだ';
  else whyIa.textContent='🔎 氷期と間氷期は約10万年の周期で繰り返してきたよ。原因は地球の軌道や地軸のわずかなゆらぎ(ミランコビッチ・サイクル)なんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
ia.addEventListener('input',update);update();
