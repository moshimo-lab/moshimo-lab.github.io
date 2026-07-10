
const $=id=>document.getElementById(id);
const mag=$('mag'),valMag=$('valMag'),shield=$('shield'),aurora=$('aurora'),fate=$('fate');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelMag=$('panelMag'),whyMag=$('whyMag');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const m=mag.value/100;
  valMag.textContent=m.toFixed(2)+' 倍';
  // バリア強度: 磁場に概ね比例(頭打ち)。0で0%。
  const sh=Math.min(120,m*100);
  shield.textContent=m<0.01?'0%(消失)':sh.toFixed(0)+'%';
  // オーロラが降りる磁気緯度の目安: 磁場が弱いほど低緯度へ。ざっくり 67°×√m。
  if(m<0.01)aurora.textContent='赤道まで';
  else{const lat=Math.min(67,67*Math.sqrt(m));aurora.textContent=lat.toFixed(0)+'°〜';}
  // 大気の運命(長い目)
  let ft='がっちり保持';
  if(m<0.01)ft='何億年で流出→火星化';
  else if(m<0.3)ft='長期でジワジワ流出';
  else if(m<0.7)ft='やや守りが弱い';
  fate.textContent=ft;
  panelMag.classList.toggle('danger',m<0.3);
  let line='見えないバリア、正常だよ',face='happy';
  if(m<0.01){line='バリアが消えた…オーロラが赤道まで降りてきてる…!';face='dizzy';}
  else if(m<0.3){line='バリアが弱いよ…太陽風がちょっと心配…';face='cold';}
  else if(m<0.7){line='守りがちょっと薄いかな';face='';}
  else if(m>1.6){line='バリアばっちり!びくともしないよ';face='happy';}
  speechLine.textContent=line;
  setFace(face);
  if(m<0.01)whyMag.textContent='🔎 磁場ゼロだと太陽風が大気に直撃。すぐ全滅ではないけど、何億年かけて火星のように大気が剥ぎ取られていくよ';
  else if(m<0.3)whyMag.textContent='🔎 磁場が弱いとオーロラが低緯度まで降り、送電や通信が乱れやすいよ。地球は過去に磁場が弱まる逆転を何度も経験しているよ';
  else if(m<=1.2)whyMag.textContent='🔎 地磁気は太陽風をそらす「見えないバリア」。大気と生命を守っているよ';
  else whyMag.textContent='🔎 磁場が強いほどバリアは頑丈。太陽嵐にも動じにくくなるよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
mag.addEventListener('input',update);update();
