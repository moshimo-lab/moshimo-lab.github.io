
// 訪問回数カウント(この端末のブラウザ内にだけ保存。どこにも送信されない)
let visits=1;
try{
  const st=window.localStorage, ss=window.sessionStorage;
  visits=parseInt(st.getItem('tera-visits')||'0',10)||0;
  if(!ss.getItem('tera-here')){visits++;st.setItem('tera-visits',String(visits));ss.setItem('tera-here','1');}
  if(visits<1)visits=1;
}catch(e){}
// 3回目から:あいさつが変わる / 7回目から:月担当・ルナが現れる
const REGULAR_LINE = visits>=3 ? ('また来てくれた!今日で'+visits+'回目の観測だね。記録しまーす!') : '今日も平常運転だよ〜';
if(visits>=7){const lu=document.getElementById('luna'); if(lu) lu.hidden=false;}

const dist=document.getElementById('dist'),valDist=document.getElementById('valDist'),
temp=document.getElementById('temp'),speech=document.getElementById('speech'),speechLine=document.getElementById('speechLine'),
heatOverlay=document.getElementById('heatOverlay'),iceOverlay=document.getElementById('iceOverlay'),
earthWrap=document.getElementById('earthWrap'),globeStrip=document.getElementById('globeStrip'),
mascot=document.getElementById('mascot');
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const d=dist.value/100;
  valDist.textContent=d.toFixed(2)+' AU';
  const tempC=255/Math.sqrt(d)+33-273;
  temp.textContent='約'+tempC.toFixed(0)+'℃';
  const heat=clamp((tempC-15)/80,0,.92), ice=clamp((15-tempC)/60,0,.92);
  heatOverlay.style.opacity=heat; iceOverlay.style.opacity=ice;
  earthWrap.classList.toggle('extreme-heat',heat>.5);
  earthWrap.classList.toggle('extreme-ice',ice>.5);
  let line=REGULAR_LINE,face=(visits>=3?'happy':'');
  if(heat>.6){line='暑い…!海が干上がっちゃうよ…';face='hot';}
  else if(heat>.2){line='ちょっと暑くなってきたかも…';face='hot';}
  else if(ice>.6){line='寒すぎる…海まで凍りそう…';face='cold';}
  else if(ice>.2){line='なんだか肌寒いね…';face='cold';}
  speechLine.textContent=line;
  setFace(face);
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
dist.addEventListener('input',update);
const QAS=[
 ['地球の1日は、本当は24時間じゃない?','自転そのものは約23時間56分で1周。太陽の方向がずれるぶんを足して、太陽が真南に来る間隔が約24時間になっています。'],
 ['地軸はなぜ23.4°も傾いているの?','有力なのは、大昔に火星サイズの天体がぶつかった説。その衝突で月も生まれたと考えられています。'],
 ['月は地球から離れていってるって本当?','本当です。年に約3.8cmずつ遠ざかっています。爪が伸びるのと同じくらいのスピードです。'],
 ['金星の1日は1年より長い?','金星の自転は1周に約243日。公転(1年)は約225日なので、「1日」のほうが「1年」より長い不思議な星です。'],
 ['地球の自転は昔からずっと同じ速さ?','いいえ、少しずつ遅くなっています。サンゴの化石から、約3億7000万年前(デボン紀)は1年が約400日、つまり1日が約22時間だったことがわかっています。'],
 ['体重は場所によって変わる?','変わります。赤道では遠心力と地球のふくらみのせいで、極地より約0.5%軽くなります。'],
 ['太陽系でいちばん高い山は?','火星のオリンポス山で高さ約22km、エベレストの約2.5倍。重力が小さい星では山が高く育ちます。'],
 ['生まれたての月はどれくらい近かった?','約2万km余り。今の38万kmの20分の1ほどで、空には巨大な月が浮かんでいたはずです。'],
];
const q=QAS[new Date().getDate()%QAS.length];
document.getElementById('qaQ').textContent='Q. '+q[0];
document.getElementById('qaA').textContent='A. '+q[1];
update();
