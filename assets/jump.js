
const $=id=>document.getElementById(id);
const jp=$('jp'),valJp=$('valJp'),jpjump=$('jpjump'),jpweight=$('jpweight'),jpfall=$('jpfall');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const jumpBar=$('jumpBar'),jumpFig=$('jumpFig'),mascot=$('mascot'),panelJp=$('panelJp'),whyJp=$('whyJp');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
const P=[
 {n:'月',g:'重力は地球の約1/6',j:300,w:5,f:'約1.1秒',
  line:'わたしのジャンプが3m!?月なら、重い宇宙服でもピョンピョン跳べちゃうんだ',face:'happy',
  why:'🔎 重力が小さいと、けり出した体がゆっくり落ちる。だから高く・長く跳べるよ。アポロの飛行士は100kg超の宇宙服でもはねていたんだ'},
 {n:'火星',g:'重力は地球の約0.38倍',j:132,w:11,f:'約0.73秒',
  line:'火星なら2.6倍ジャンプ!運動会のヒーローになれるね',face:'happy',
  why:'🔎 火星の重力は月の約2倍、地球の約3分の1。ボールもスローモーションみたいにゆっくり落ちるよ'},
 {n:'金星',g:'重力は地球の約0.91倍',j:55,w:27,f:'約0.47秒',
  line:'地球とほぼ同じジャンプ。金星は大きさも重力も、地球の双子なんだよ',face:'',
  why:'🔎 金星は大きさが地球とそっくりだから、重力もほぼ同じ。ちがうのは灼熱の大気のほうなんだ'},
 {n:'地球',g:'いつもの重力(1G)',j:50,w:30,f:'約0.45秒',
  line:'いつものジャンプ。この「ふつう」が、わたしたちの基準だね',face:'happy',
  why:'🔎 ジャンプの高さは重力に反比例。重力が半分なら2倍跳べる、シンプルなルールだよ'},
 {n:'海王星',g:'重力は地球の約1.1倍',j:44,w:34,f:'約0.42秒',
  line:'地球の17倍も重い星なのに、ジャンプはちょっと低くなるだけ。不思議でしょ?',face:'',
  why:'🔎 重力は「重さ」と「大きさ」のバランスで決まるよ。海王星は重いけど半径も大きいから、表面の重力は1.1倍ほどなんだ'},
 {n:'木星',g:'重力は地球の約2.5倍',j:20,w:76,f:'約0.28秒',
  line:'体が2.5倍重い…!階段1段ぶんしか跳べないよ。うでを上げるのも大変…',face:'dizzy',
  why:'🔎 木星はガスの星だから本当は立てないけれど、雲の上に立てたとしたら体は2.5倍の重さ。ジャンプは階段1段(約20cm)がやっとだよ'},
];
function update(){
  const i=parseInt(jp.value,10),d=P[i];
  valJp.textContent=d.n+'('+d.g+')';
  jpjump.textContent=d.j>=100?(d.j/100).toFixed(d.j%100?1:0).replace('.0','')+'m':d.j+'cm';
  jpweight.textContent='約'+d.w+'kg';
  jpfall.textContent=d.f;
  if(jumpBar){const h=Math.max(6,Math.round(d.j/300*104));jumpBar.style.height=h+'px';if(jumpFig)jumpFig.style.bottom=(12+h)+'px';}
  panelJp.classList.toggle('danger',i===5);
  speechLine.textContent=d.line;
  setFace(d.face);
  whyJp.textContent=d.why;
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
jp.addEventListener('input',update);update();
