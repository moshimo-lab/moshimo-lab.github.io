
const $=id=>document.getElementById(id);
const yr=$('yr'),valYr=$('valYr'),ylen=$('ylen'),yseason=$('yseason'),ylike=$('ylike');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const revSpin=$('revSpin'),mascot=$('mascot'),panelYr=$('panelYr'),whyYr=$('whyYr');
function update(){
  const d=yr.value/100; // 太陽との距離(いま=1)
  valYr.textContent=d.toFixed(2)+' 倍';
  // ケプラー第3法則: T^2 ∝ d^3 → T = d^1.5 (年)
  const T=Math.pow(d,1.5);
  const days=T*365;
  ylen.textContent=days<730?Math.round(days)+' 日':T.toFixed(T<10?1:0)+' 年';
  // 季節の長さ = 1年の1/4
  const sd=days/4;
  yseason.textContent=sd<183?Math.round(sd)+' 日ずつ':(T/4).toFixed(1)+' 年ずつ';
  // 似ている惑星
  let lk='(地球だけ)';
  if(Math.abs(d-0.39)<0.06)lk='水星(88日)';
  else if(Math.abs(d-0.72)<0.06)lk='金星(225日)';
  else if(Math.abs(d-1)<0.04)lk='地球(365日)';
  else if(Math.abs(d-1.52)<0.08)lk='火星(687日)';
  else if(Math.abs(d-5.2)<0.4)lk='木星(約12年)';
  else if(d>4.5)lk='木星より遠い世界';
  else lk='—';
  ylike.textContent=lk;
  // 公転アニメ: 1年=4秒を基準にTに比例
  if(revSpin)revSpin.style.animationDuration=(4*T)+'s';
  panelYr.classList.toggle('danger',d<0.3);
  let line='1年365日。季節は3か月ずつ。ちょうどいいリズムだね',face='happy';
  if(d<=0.45){line='1年が'+Math.round(days)+'日!お正月がすぐ来るよ。でも暑い…';face='hot';}
  else if(d>=4){line='1年が'+T.toFixed(0)+'年…冬だけで人生の何年ぶんも続くんだ…';face='cold';}
  else if(d>=1.4){line='1年が長い…季節がゆっくりで、冬が'+(sd<365?Math.round(sd)+'日':(T/4).toFixed(1)+'年')+'も続くよ';face='cold';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(d<0.5)whyYr.textContent='🔎 太陽に近いほど公転は速く、1年は短い。水星の1年はたった88日だよ(ケプラーの法則)';
  else if(d<=1.1)whyYr.textContent='🔎 1年の長さ=太陽を1周する時間。距離が決まると1年の長さも自動的に決まるよ(ケプラーの法則)';
  else whyYr.textContent='🔎 遠いほど道のりが長く、進む速さも遅くなるので1年はぐんと伸びる。海王星の1年は約165年。人の一生より長いんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
yr.addEventListener('input',update);update();
