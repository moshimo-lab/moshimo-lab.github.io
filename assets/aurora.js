
const $=id=>document.getElementById(id);
const au=$('au'),valAu=$('valAu'),aurange=$('aurange'),aujapan=$('aujapan'),autech=$('autech');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const auBand=$('auBand'),auRed=$('auRed'),mascot=$('mascot'),panelAu=$('panelAu'),whyAu=$('whyAu');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const p=parseInt(au.value,10);
  let lv;
  if(p<10)lv='静穏(ふだん)';
  else if(p<40)lv='中規模の磁気嵐';
  else if(p<70)lv='巨大磁気嵐(G5・2024年5月級)';
  else lv='キャリントン級(観測史上最大級)';
  valAu.textContent=lv;
  aurange.textContent=p<10?'極地のまわりの輪だけ':p<40?'輪が中緯度へ広がる':p<70?'北海道〜本州の空まで':'世界中の夜空(ハワイでも)';
  aujapan.textContent=p<10?'見えない':p<40?'北海道で赤い空のチャンス':p<70?'本州でもマゼンタの空':'全国の夜空が赤く染まる';
  autech.textContent=p<10?'なし':p<40?'短波通信やGPSに乱れ':p<70?'衛星・GPS障害のリスク':'送電網の障害・大停電のおそれ';
  if(auBand){auBand.style.opacity=(0.25+p/100*0.75).toFixed(2);auBand.style.height=(34+p/100*44)+'px';}
  if(auRed)auRed.style.opacity=p<25?'0':((p-25)/75*0.8).toFixed(2);
  panelAu.classList.toggle('danger',p>=70);
  let line='オーロラは極地の空の特等席。磁場と太陽風の合作アートだよ',face='happy';
  if(p>=70){line='世界中の空がオーロラに…きれい。でも送電網が心配だよ…';face='dizzy';}
  else if(p>=40){line='北海道の夜がマゼンタ色!2024年5月には、本州でも見えたんだよ';face='happy';}
  else if(p>=10){line='太陽が荒れてきた…オーロラの輪が、少しずつ南に広がっていくよ';face='';}
  speechLine.textContent=line;
  setFace(face);
  if(p<10)whyAu.textContent='🔎 オーロラは太陽風の粒が磁力線に導かれ、極のまわりの輪(オーロラオーバル)で大気とぶつかって光る現象だよ';
  else if(p<40)whyAu.textContent='🔎 磁気嵐が強いとオーロラの輪は赤道側へ広がるよ。日本で見えるオーロラは、高い空の酸素が光る「赤」が多いんだ';
  else if(p<70)whyAu.textContent='🔎 2024年5月11日の巨大磁気嵐では、北海道から兵庫・愛知でもオーロラが撮影されたよ。高度1000kmのとても高い光だったんだ';
  else whyAu.textContent='🔎 1859年のキャリントン・イベントではハワイやカリブ海でもオーロラが見えて、青森や和歌山にも記録が残っているよ。電信機からは火花が出たんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
au.addEventListener('input',update);update();
