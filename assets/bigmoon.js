
const $=id=>document.getElementById(id);
const bm=$('bm'),valBm=$('valBm'),ecVerdict=$('ecVerdict'),btide=$('btide'),bnight=$('bnight');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const miniMoon=$('miniMoon'),ecMoon=$('ecMoon'),mascot=$('mascot'),panelBm=$('panelBm'),whyBm=$('whyBm');
const floodOverlay=$('floodOverlay');
function update(){
  const s=bm.value/100; // 月の大きさ(いま=1)
  valBm.textContent=s.toFixed(2)+' 倍';
  // 日食判定: 月の見かけ ÷ 太陽の見かけ = s(距離同じ・サイズ比例)
  if(ecMoon){const px=Math.max(8,Math.min(64,34*s));ecMoon.style.width=px+'px';ecMoon.style.height=px+'px';}
  let v;
  if(s>1.05)v='皆既日食だけになる';
  else if(s<0.95)v='金環日食だけになる';
  else v='皆既も金環も見られる';
  ecVerdict.textContent=v;
  // 潮汐 ∝ 質量 ∝ サイズ^3
  const t=Math.pow(s,3);
  btide.textContent=t>=100?t.toFixed(0)+' 倍':t.toFixed(1)+' 倍';
  // 満月の明るさ ∝ 面積 ∝ サイズ^2
  const br=Math.pow(s,2);
  bnight.textContent=br.toFixed(1)+' 倍';
  if(miniMoon){
    const mp=Math.max(9,Math.min(40,14*s));
    miniMoon.style.width=mp+'px';miniMoon.style.height=mp+'px';
  }
  panelBm.classList.toggle('danger',s>=2);
  // 潮汐が強すぎると洪水オーバーレイ
  const tidalEffect=s>1.2?Math.min(0.6,(s-1.2)/1.8*0.6):0;
  if(floodOverlay)floodOverlay.style.opacity=tidalEffect.toFixed(2);
  let line='いつもの月。日食のときは太陽とぴったり同じ大きさに見えるんだ',face='happy';
  if(s>=2.5){line='大きすぎ!潮が'+t.toFixed(0)+'倍…海辺が大変なことに…';face='dizzy';}
  else if(s>=1.5){line='大きな月!夜がすごく明るいね。潮も'+t.toFixed(1)+'倍だよ';face='';}
  else if(s<=0.5){line='小さな月…夜が暗いし、日食はリングにしかならないね';face='cold';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(s>1.05)whyBm.textContent='🔎 月が太陽より大きく見えると、太陽を完全にかくす皆既日食だけになるよ。リング状の金環日食は見られなくなるんだ';
  else if(s<0.95)whyBm.textContent='🔎 月が太陽より小さく見えると、太陽をかくしきれずリングが残る金環日食だけになるよ';
  else whyBm.textContent='🔎 いまの月と太陽は、大きさ400倍・距離400倍で見かけがほぼ同じ。この偶然が皆既日食と金環日食の両方を生んでいるよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
bm.addEventListener('input',update);update();
