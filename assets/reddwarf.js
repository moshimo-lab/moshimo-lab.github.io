
const $=id=>document.getElementById(id);
const rd=$('rd'),valRd=$('valRd'),hz=$('hz'),lock=$('lock'),life=$('life');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const starMini=$('starMini');
const mascot=$('mascot'),panelRd=$('panelRd'),whyRd=$('whyRd');
function update(){
  const m=rd.value/100; // 主星質量(太陽=1) 0.08〜1.20
  valRd.textContent=m.toFixed(2)+' 倍';
  // 主系列星の光度 L ~ M^3.5。ハビタブルゾーン距離 ~ sqrt(L)。
  const L=Math.pow(m,3.5);
  const d=Math.sqrt(L); // AU
  hz.textContent=d>=0.1?d.toFixed(2)+' AU':(d*1000).toFixed(0)+'×10⁻³AU';
  // ★主星ビジュアル: 質量に応じてサイズと色を変化
  if(starMini){
    const size=Math.max(14,Math.min(60,36*Math.pow(m,0.8)));
    starMini.style.width=size+'px';
    starMini.style.height=size+'px';
    starMini.classList.toggle('reddwarf',m<0.6);
    starMini.classList.toggle('bright',m>1.05);
  }
  // 潮汐ロックのリスク: HZが主星に近い(小さいd)ほど高い。目安 0.2AU未満で高。
  let lk,lkClass=false;
  if(d>=0.5){lk='なし';}
  else if(d>=0.2){lk='中くらい';}
  else{lk='高い(片面が永遠の昼)';lkClass=true;}
  lock.textContent=lk;
  // 寿命 ~ M/L = M^-2.5。太陽=100億年(=10 Ga)。
  const t=10*Math.pow(m,-2.5); // 十億年(Ga)
  const oku=t*10; // 億年
  if(oku>=10000)life.textContent='約'+(oku/10000).toFixed(oku>=100000?0:1)+'兆年';
  else life.textContent='約'+Math.round(oku/10)*10+'億年';
  panelRd.classList.toggle('danger',lkClass);
  let line='太陽くらいの明るさ。ちょうどいいね',face='happy';
  if(m<=0.15){line='うんと暗い星…住める帯が主星のすぐ隣まで来てるよ!';face='dizzy';}
  else if(d<0.2){line='近すぎて潮汐ロック。半分が永遠の昼、半分が永遠の夜だね';face='cold';}
  else if(m<0.6){line='ちょっと暗めの星。住める場所が内側に寄ってきたね';face='';}
  else if(m>1.1){line='太陽より明るい星。住める帯は外側だね';face='happy';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(m<0.5)whyRd.textContent='🔎 赤色矮星は暗いぶん超長寿命。何千億年も燃えるから、生命がゆっくり進化する時間はたっぷりあるよ';
  else if(m<=1.05)whyRd.textContent='🔎 星は軽いほど暗い。暗い星のまわりでは「住める帯」が主星のすぐ近くまで寄ってくるよ';
  else whyRd.textContent='🔎 太陽より重い星は明るいけど寿命が短い。ほどよい太陽は寿命と明るさのバランスがいいんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
rd.addEventListener('input',update);update();
