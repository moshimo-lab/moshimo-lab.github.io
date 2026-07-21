
const $=id=>document.getElementById(id);
const ox=$('ox'),valOx=$('valOx'),bug=$('bug'),fire=$('fire'),breath=$('breath');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),bugIcon=$('bugIcon');
const mascot=$('mascot'),panelOx=$('panelOx'),whyOx=$('whyOx');
function update(){
  const p=parseInt(ox.value,10); // 酸素濃度 %
  valOx.textContent=p+'%';
  // 昆虫サイズ: 酸素が濃いほど大きく。21%=ふつう、35%=巨大。
  let b;
  if(p<12)b='育ちにくい';
  else if(p<24)b='ふつう';
  else if(p<30)b='ひとまわり大';
  else if(p<38)b='巨大(翼70cm級)';
  else b='超巨大';
  bug.textContent=b;
  // ★昆虫アイコンのビジュアル: 酸素濃度に応じてサイズ変化
  if(bugIcon){
    bugIcon.classList.toggle('tiny',p<12);
    bugIcon.classList.toggle('giant',p>=30&&p<38);
    bugIcon.classList.toggle('mega',p>=38);
  }
  // 山火事
  let f;
  if(p<15)f='燃えにくい';
  else if(p<24)f='ふつう';
  else if(p<30)f='燃えやすい';
  else f='止まらない';
  fire.textContent=f;
  // 人間の呼吸
  let br;
  if(p<10)br='危険(低酸素)';
  else if(p<17)br='息苦しい';
  else if(p<25)br='快適';
  else if(p<35)br='興奮ぎみ';
  else br='酸素中毒の恐れ';
  breath.textContent=br;
  const heat=p>=30?Math.min(0.6,(p-30)/20*0.6):0;
  if(heatOverlay)heatOverlay.style.opacity=heat;
  earthWrap.classList.toggle('extreme-heat',p>=38);
  panelOx.classList.toggle('danger',p<12||p>=38);
  let line='酸素21%。生き物にちょうどいい設定だね',face='happy';
  if(p<10){line='酸素が薄すぎる…息ができないよ…';face='dizzy';}
  else if(p>=30&&p<38){line='石炭紀の空気だ!巨大トンボが飛んでる…!';face='';}
  else if(p>=38){line='濃すぎ!山火事が止まらないし、人間には毒だよ…';face='hot';}
  else if(p>=24&&p<30){line='ちょっと濃いめ。虫が大きく育つね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(p>=30&&p<38)whyOx.textContent='🔎 これは約3億年前の石炭紀の地球そのもの。翼70cmのメガネウラや体長2mの巨大ヤスデが実在したよ';
  else if(p>=38)whyOx.textContent='🔎 酸素が濃いと火が消えにくく、山火事が巨大化するよ。人間も高濃度を吸い続けると酸素中毒になるんだ';
  else if(p<12)whyOx.textContent='🔎 酸素が薄いと大きな生き物は呼吸できないよ。多すぎても少なすぎてもダメなんだ';
  else whyOx.textContent='🔎 昆虫は肺ではなく体の管(気管)で酸素を取り込むよ。だから空気の酸素が濃いほど大きくなれるんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
ox.addEventListener('input',update);update();
