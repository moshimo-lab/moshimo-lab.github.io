
const $=id=>document.getElementById(id);
const wk=$('wk'),valWk=$('valWk'),wkwalk=$('wkwalk'),wkcar=$('wkcar'),wklight=$('wklight');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const tripMarker=$('tripMarker'),mascot=$('mascot'),panelWk=$('panelWk'),whyWk=$('whyWk');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
const D=[
 {n:'宇宙の入り口(高度100km)',walk:'約1日',car:'約1時間',light:'約0.0003秒',left:24,
  line:'宇宙って、東京から箱根くらいの距離なんだ。上にまっすぐ歩ければ、だけどね',face:'happy',
  why:'🔎 高度100kmから先が宇宙(カーマン・ライン)。飛行機が飛べなくなる高さを目安に決められた、世界共通の「宇宙の入り口」だよ'},
 {n:'月(38万4400km)',walk:'約11年(不眠不休)',car:'約160日',light:'約1.3秒',left:52,
  line:'月まで歩くと11年…!小学生が出発したら、着くころには大人だよ',face:'',
  why:'🔎 アポロの宇宙船は月まで約3日。歩けば11年の道のりを3日で行ったんだ。人類の乗り物ってすごいね'},
 {n:'太陽(1億4960万km)',walk:'約4300年',car:'約170年',light:'約8分19秒',left:88,
  line:'4300年!?縄文時代に出発しても、まだ着いてないよ…',face:'dizzy',
  why:'🔎 光は宇宙でいちばん速い旅人。それでも太陽から8分19秒かかる。いま見ている太陽は、8分前の姿なんだよ'},
];
function update(){
  const i=parseInt(wk.value,10),d=D[i];
  valWk.textContent=d.n;
  wkwalk.textContent=d.walk;wkcar.textContent=d.car;wklight.textContent=d.light;
  if(tripMarker)tripMarker.style.left=d.left+'%';
  panelWk.classList.toggle('danger',false);
  speechLine.textContent=d.line;
  setFace(d.face);
  whyWk.textContent=d.why;
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
wk.addEventListener('input',update);update();
