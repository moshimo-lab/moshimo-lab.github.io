
const $=id=>document.getElementById(id);
const im=$('im'),valIm=$('valIm'),pmeteor=$('pmeteor'),pbig=$('pbig'),pland=$('pland');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),mascot=$('mascot'),panelIm=$('panelIm'),whyIm=$('whyIm');
function update(){
  const n=Math.pow(10,im.value/100); // 頻度: 1〜1000倍(対数)
  valIm.textContent=(n>=100?n.toFixed(0):n>=10?n.toFixed(0):n.toFixed(1))+' 倍';
  // 夜空
  let mt;
  if(n<2)mt='いつも通り';
  else if(n<20)mt='流れ星が毎晩';
  else if(n<200)mt='火球が日常';
  else mt='空が燃えている';
  pmeteor.textContent=mt;
  // 大きな衝突
  let bg;
  if(n<2)bg='ごくまれ';
  else if(n<20)bg='歴史にたびたび';
  else if(n<200)bg='文明の危機レベル';
  else bg='絶えず起こる';
  pbig.textContent=bg;
  // 地表
  let ld;
  if(n<2)ld='緑と海の星';
  else if(n<20)ld='ときどき傷あと';
  else if(n<200)ld='クレーターが増える';
  else ld='月面のような地表へ';
  pland.textContent=ld;
  const heat=n>=100?Math.min(0.5,(n-100)/900*0.5+0.2):0;
  if(heatOverlay)heatOverlay.style.opacity=heat;
  panelIm.classList.toggle('danger',n>=100);
  let line='今日も平和な空。流れ星がときどき光るくらいだね',face='happy';
  if(n>=200){line='空から降ってくる…!これが重爆撃期の空なんだ…';face='dizzy';}
  else if(n>=20){line='火球が毎日みたいに…文明にはきびしい空だよ…';face='';}
  else if(n>=2){line='流れ星が増えたね。きれいだけど、少しどきどきするな';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(n>=200)whyIm.textContent='🔎 約41〜38億年前の後期重爆撃期(と考えられている時代)のイメージ。月のクレーターの多くはこの時代の記録とされるよ';
  else if(n>=20)whyIm.textContent='🔎 約6600万年前には直径10km級の衝突で生物種の75%が絶滅。地球の歴史は衝突と無縁ではないんだ';
  else if(n>=2)whyIm.textContent='🔎 2022年、人類は探査機DARTを小惑星に体当たりさせ、軌道を変える実験に初めて成功したよ';
  else whyIm.textContent='🔎 いまの地球にも毎日小さな天体は降っているよ。ほとんどは大気が燃やしてくれる——流れ星がその姿だよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
im.addEventListener('input',update);update();
