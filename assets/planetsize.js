
const $=id=>document.getElementById(id);
const ps=$('ps'),valPs=$('valPs'),psgrav=$('psgrav'),psair=$('psair'),psland=$('psland');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const scBall=$('scBall'),scLabel=$('scLabel'),mascot=$('mascot'),panelPs=$('panelPs'),whyPs=$('whyPs');
function update(){
  const d=ps.value/100; // 直径(いま=1)
  valPs.textContent=d.toFixed(2)+' 倍';
  // 同密度なら地表重力 ∝ 直径
  const g=d;
  psgrav.textContent=g.toFixed(2)+' G';
  // 空気の保ちやすさ
  let air;
  if(g<0.4)air='ほぼ保てない';
  else if(g<0.7)air='薄くなる';
  else if(g<1.6)air='ちょうどいい';
  else air='分厚くなりすぎ';
  psair.textContent=air;
  // 地表
  let land;
  if(g<0.4)land='火星のような星';
  else if(g<0.7)land='空気の薄い星';
  else if(g<1.6)land='緑と海の星';
  else land='高圧・高温の星';
  psland.textContent=land;
  // サイズ比較ボール(基準54px)
  if(scBall){const px=Math.max(16,Math.min(150,54*d));scBall.style.width=px+'px';scBall.style.height=px+'px';}
  if(scLabel)scLabel.textContent='直径 '+d.toFixed(1)+'倍';
  panelPs.classList.toggle('danger',g<0.4||g>2);
  let line='いまの地球サイズ。空気も重力もちょうどいいね',face='happy';
  if(g<0.4){line='小さすぎる…空気が宇宙へ逃げていく…火星みたいだ…';face='cold';}
  else if(g<0.7){line='ちょっと小さいね。空気がだんだん薄くなってきたよ';face='';}
  else if(g>2){line='大きすぎ!体が重い…空気も分厚くて息苦しいよ…';face='hot';}
  else if(g>1.5){line='大きな地球。重力が強くて歩くのが大変だね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(g<0.4)whyPs.textContent='🔎 重力が弱いと空気を宇宙につなぎとめられない。火星が薄い大気しか持てないのは、小さくて重力が弱いからなんだ';
  else if(g>2)whyPs.textContent='🔎 大きい惑星(スーパーアース)は重力が強く、分厚い大気で高温・高圧になりがち。大きければいいわけじゃないんだ';
  else whyPs.textContent='🔎 惑星が大きいほど重力が強くなり、空気(大気)を強くつなぎとめられるよ。小さいと空気は宇宙へ逃げてしまうんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
ps.addEventListener('input',update);update();
