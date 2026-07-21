
const $=id=>document.getElementById(id);
const jp=$('jp'),valJp=$('valJp'),jreach=$('jreach'),jbelt=$('jbelt'),jrisk=$('jrisk');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelJp=$('panelJp'),whyJp=$('whyJp');
const impactFlash=$('impactFlash');
let impactTimer=null;
function doImpact(){
  impactFlash.classList.add('on');
  setTimeout(()=>impactFlash.classList.remove('on'),120);
}
function update(){
  const m=jp.value/100; // 木星の質量(いま=1)
  valJp.textContent=m.toFixed(2)+' 倍';
  // 重力のとどく範囲(ヒル圏)∝ 質量の1/3乗
  if(m<0.01)jreach.textContent='なし';
  else jreach.textContent=Math.cbrt(m).toFixed(2)+' 倍';
  // 小惑星帯
  let b;
  if(m<0.01)b='惑星に育っていたかも';
  else if(m<0.5)b='乱れが弱まる';
  else if(m<1.5)b='いまの姿';
  else b='もっと激しく乱される';
  jbelt.textContent=b;
  // 地球への彗星・小惑星(正直に「議論中」を貫く)
  let r;
  if(m<0.01)r='増える?減る?(諸説)';
  else if(m<1.5)r='研究者も議論中';
  else r='はじく力も送る力も増';
  jrisk.textContent=r;
  panelJp.classList.toggle('danger',m<0.01);
  // 視覚効果: 木星がないと地球が揺れ、衝撃フラッシュ
  earthWrap.classList.toggle('vulnerable',m<0.1);
  if(m<0.1&&!impactTimer){impactTimer=setInterval(doImpact,1800);doImpact();}
  else if(m>=0.1&&impactTimer){clearInterval(impactTimer);impactTimer=null;}
  let line='太陽系の重力の大黒柱、いつも通りだね',face='happy';
  if(m<0.01){line='木星が消えた…太陽系の交通整理係がいなくなっちゃった…';face='dizzy';}
  else if(m<0.5){line='軽い木星。小惑星帯の乱れがおとなしくなるね';face='';}
  else if(m>1.5){line='重い木星!軌道をかき回す力も強くなるよ';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(m<0.01)whyJp.textContent='🔎 木星がなければ小惑星帯はもう1つの惑星に育っていたかも。地球に水が届いたかどうかも変わったかもしれないよ';
  else if(m<0.5)whyJp.textContent='🔎 「木星は地球の盾」という定説は、近年のシミュレーションで見直しが進んでいる、答えが動いている問題だよ';
  else if(m<=1.5)whyJp.textContent='🔎 木星は全惑星を合わせたより重い、太陽系の重力の大黒柱。その影響は太陽系全体におよぶよ';
  else whyJp.textContent='🔎 重力が強いほど、彗星をはじく力も内側へ送り込む力も両方強くなる。差し引きの答えはまだ研究中だよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
jp.addEventListener('input',update);update();
