
const $=id=>document.getElementById(id);
const mh=$('mh'),valMh=$('valMh'),tide=$('tide'),moonsize=$('moonsize'),shore=$('shore');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const miniMoon=$('miniMoon'),mascot=$('mascot'),panelMh=$('panelMh'),whyMh=$('whyMh');
const laneMoon=$('laneMoon'),laneTickMh=$('laneTickMh');
function update(){
  const d=mh.value/100; // 月までの距離(いま=1)
  valMh.textContent=d.toFixed(2)+' 倍';
  // 潮汐力 ∝ 1/d^3
  const tf=1/Math.pow(d,3);
  tide.textContent=tf>=100?tf.toFixed(0)+' 倍':tf.toFixed(1)+' 倍';
  // 見かけの大きさ ∝ 1/d
  const sz=1/d;
  moonsize.textContent=sz.toFixed(1)+' 倍';
  // レーン: 0.3〜2.0倍を線形配置。月ドットは近いほど大きく
  if(laneMoon){
    const pos=Math.max(0,Math.min(100,(d-0.3)/1.7*100));
    laneMoon.style.left=pos+'%';
    const mpx=Math.max(9,Math.min(26,14/d));
    laneMoon.style.width=mpx+'px';laneMoon.style.height=mpx+'px';
  }
  if(laneTickMh)laneTickMh.style.left=((1-0.3)/1.7*100)+'%';
  // 見た目の月サイズ・位置(近いほど大きく)
  if(miniMoon){
    const px=Math.max(10,Math.min(60,26*sz));
    miniMoon.style.width=px+'px';miniMoon.style.height=px+'px';
    miniMoon.style.opacity=Math.max(0.5,Math.min(1,1.2/d));
  }
  // 海辺
  let s;
  if(tf>=8)s='破滅的な大潮';
  else if(tf>=3)s='巨大な満ち引き';
  else if(tf>=1.5)s='大きな満ち引き';
  else if(tf>=0.6)s='いつも通り';
  else s='おだやかな潮';
  shore.textContent=s;
  panelMh.classList.toggle('danger',tf>=8);
  let line='月との間合い、ちょうどいいね',face='happy';
  if(d<=0.4){line='月が近すぎる!潮が'+tf.toFixed(0)+'倍…海辺がのみこまれちゃう!';face='dizzy';}
  else if(tf>=3){line='大きな月だね。潮の満ち引きもかなり激しいよ';face='';}
  else if(d>=1.8){line='月が遠い…小さな月と、おだやかな潮だね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(d<0.6)whyMh.textContent='🔎 潮汐力は距離の3乗に反比例。月が半分の距離なら潮は8倍!約40億年前、月は本当にもっと近かったんだ';
  else if(d>1.4)whyMh.textContent='🔎 月は今も毎年3.8cmずつ遠ざかっているよ。遠い未来の空には、小さな月がかかるんだね';
  else whyMh.textContent='🔎 潮を起こす力は「距離の3乗」に反比例。だから距離が近づくと、潮は一気に大きくなるよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
mh.addEventListener('input',update);update();
