
const $=id=>document.getElementById(id);
const pg=$('pg'),valPg=$('valPg'),pcont=$('pcont'),pinland=$('pinland'),pseason=$('pseason');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),mascot=$('mascot'),panelPg=$('panelPg'),whyPg=$('whyPg');
function update(){
  const p=parseInt(pg.value,10); // 集まり度合い%
  valPg.textContent=p+(p<2?'%(いまの地球)':'%');
  pcont.textContent=p>=90?'超大陸パンゲア':p>=50?'大きな塊に集合中':p>=20?'集まりつつある':'バラバラ(いま)';
  pinland.textContent=p>=90?'究極の内陸・砂漠':p>=50?'乾燥が拡大':p>=20?'内陸が乾きぎみ':'海の恵みが届く';
  pseason.textContent=p>=90?'メガモンスーン(酷暑と乾燥)':p>=50?'振れ幅が大きい':p>=20?'やや激しい':'おだやか';
  const heat=p>=50?Math.min(0.5,(p-50)/50*0.5):0;
  if(heatOverlay)heatOverlay.style.opacity=heat;
  earthWrap.classList.toggle('extreme-heat',p>=90);
  panelPg.classList.toggle('danger',p>=90);
  let line='大陸がバラバラのいまの地球。どこも海から近いね',face='happy';
  if(p>=90){line='ぜんぶの大陸がひとつに…内陸は酷暑と乾燥の砂漠だよ…';face='hot';}
  else if(p>=50){line='大陸が集まってきた。内陸がどんどん乾いていくね';face='';}
  else if(p>=20){line='少しずつ集合中。海から遠い場所が生まれてきたよ';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(p>=90)whyPg.textContent='🔎 約3〜2億年前に実在した超大陸パンゲア。内陸では夏は酷暑・冬は乾燥の「メガモンスーン」が吹き荒れたと考えられているよ';
  else if(p>=50)whyPg.textContent='🔎 大陸が集まるほど、海から遠い土地が増える。陸の総量は同じでも「配置」で気候はまるごと変わるんだ';
  else whyPg.textContent='🔎 大陸がバラバラだと、どこも海から近く、雨や穏やかな気候の恵みを受けられるよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
pg.addEventListener('input',update);update();
