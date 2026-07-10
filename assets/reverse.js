
const $=id=>document.getElementById(id);
const rv=$('rv'),valRv=$('valRv'),sunrise=$('sunrise'),flow=$('flow'),sahara=$('sahara');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelRv=$('panelRv'),whyRv=$('whyRv');
function update(){
  const forward=parseInt(rv.value,10)===1;
  valRv.textContent=forward?'順回転（いまの地球）':'逆回転';
  sunrise.textContent=forward?'東から':'西から';
  flow.textContent=forward?'いつも通り':'ぜんぶ逆転';
  sahara.textContent=forward?'砂漠のまま':'緑によみがえる';
  // 見た目: 地球の回転方向(globeStripのアニメ方向)を反転
  globeStrip.style.animationDirection=forward?'normal':'reverse';
  panelRv.classList.toggle('danger',!forward);
  let line,face;
  if(forward){line='いつもの地球。太陽は東から昇るね';face='happy';}
  else{line='逆回転の地球だ!太陽が西から昇って…サハラが緑になってる…!';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  whyRv.textContent=forward
    ? '🔎 自転の向きは、風や海流の向きを決めているよ。向きが変わると、地球の気候地図がまるごと描きかわるんだ'
    : '🔎 研究者の気候シミュレーションでは、逆回転でサハラ砂漠が緑化し、かわりにアメリカ大陸が砂漠になったよ。砂漠は「暑いから」ではなく、風と海流の運び方で決まるんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
rv.addEventListener('input',update);update();
