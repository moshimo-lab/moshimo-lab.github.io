
const $=id=>document.getElementById(id);
const sb=$('sb'),valSb=$('valSb'),albedo=$('albedo'),strend=$('strend'),scover=$('scover');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const iceOverlay=$('iceOverlay'),mascot=$('mascot'),panelSb=$('panelSb'),whySb=$('whySb');
function update(){
  const p=parseInt(sb.value,10); // 氷の割合%
  valSb.textContent=p+(Math.abs(p-10)<2?'%(いまの地球)':'%');
  albedo.textContent=p>=70?'まぶしいほど白い':p>=40?'白っぽい':p>=15?'やや白い':'ふつう';
  // 暴走の閾値イメージ: 約50%を超えると正のフィードバックで100%へ坂を下る
  let tr;
  if(p<=2)tr='温暖へ';
  else if(p<40)tr='安定';
  else if(p<55)tr='寒冷化の坂道';
  else if(p<100)tr='暴走凍結中…';
  else tr='全球凍結';
  strend.textContent=tr;
  scover.textContent=p>=95?'赤道まで(全球)':p>=50?'中緯度まで':p>=15?'高緯度に拡大':'高緯度だけ';
  if(iceOverlay)iceOverlay.style.opacity=Math.min(0.75,p/100*0.8);
  earthWrap.classList.toggle('extreme-ice',p>=60);
  panelSb.classList.toggle('danger',p>=55);
  let line='いまの地球。氷は極と山にあるくらいだね',face='happy';
  if(p>=95){line='赤道まで真っ白…これがスノーボールアースなんだ…';face='cold';}
  else if(p>=55){line='氷が氷を呼んで止まらない…坂道を転がってるみたい…';face='cold';}
  else if(p>=25){line='氷がだいぶ広がってきたね。少し心配…';face='';}
  else if(p<=2){line='氷がほとんどない、あたたかい地球だね';face='happy';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(p>=95)whySb.textContent='🔎 約7億年前、地球は本当に赤道まで凍った(全球凍結)。抜け出せたのは火山のCO₂が数百万年かけて温室効果を高めたおかげだよ';
  else if(p>=55)whySb.textContent='🔎 白い氷が太陽光をはね返し、寒さがさらに氷を増やす「アイス・アルベド・フィードバック」の暴走が始まっているよ';
  else whySb.textContent='🔎 白い氷は太陽光をはね返すよ。氷が増えるほど寒くなり、その寒さがまた氷を増やす——これが暴走のもとだよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
sb.addEventListener('input',update);update();
