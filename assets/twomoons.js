
const $=id=>document.getElementById(id);
const tm=$('tm'),valTm=$('valTm'),tmnight=$('tmnight'),tmtide=$('tmtide'),tmstable=$('tmstable');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const miniMoonA=$('miniMoonA'),miniMoonB=$('miniMoonB'),mascot=$('mascot'),panelTm=$('panelTm'),whyTm=$('whyTm');
function update(){
  const s=tm.value/100; // 2つ目の月の大きさ(いまの月=1)
  valTm.textContent=s<0.03?'0(月はひとつ)':s.toFixed(2)+' 倍';
  // 夜の明るさ: 1(既存の月) + 2つ目の面積ぶん(s^2)
  const night=1+s*s;
  tmnight.textContent=night.toFixed(1)+' 倍';
  // 潮
  tmtide.textContent=s<0.03?'シンプル':s<0.5?'やや複雑':s<1.1?'複雑':'とても複雑';
  // 軌道の安定
  let st;
  if(s<0.03)st='安定';
  else if(s<0.5)st='ほぼ安定';
  else if(s<1.1)st='ゆらぎやすい';
  else st='不安定';
  tmstable.textContent=st;
  // 2つ目の月の表示
  if(miniMoonB){
    if(s<0.03){miniMoonB.style.opacity=0;}
    else{const px=Math.max(8,Math.min(30,14*s));miniMoonB.style.opacity=1;
      miniMoonB.style.width=px+'px';miniMoonB.style.height=px+'px';
      miniMoonB.style.marginLeft='6px';}
  }
  panelTm.classList.toggle('danger',s>=1.1);
  let line='月がひとつの、いつもの地球だね',face='happy';
  if(s>=1.1){line='2つ目の月が大きすぎる…月どうしが引っぱり合って、軌道が乱れそう…';face='dizzy';}
  else if(s>=0.5){line='ふたつの月!夜が明るいね。でも潮が複雑になってきたよ';face='';}
  else if(s>=0.03){line='小さな2つ目の月が現れたよ。夜が少し明るいね';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(s>=1.1)whyTm.textContent='🔎 大きな月がふたつあると、月どうしの引力で軌道が乱れやすい。うまく共鳴すれば安定することもあるけど、バランスは繊細なんだ';
  else if(s>=0.5)whyTm.textContent='🔎 潮の満ち引きは2つの月の引力の合わせ技。並べば大きく、離れれば打ち消し合って、複雑なリズムになるよ';
  else whyTm.textContent='🔎 月がもうひとつあると、夜は明るく、潮の満ち引きは2つの月の合わせ技で複雑になるよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
tm.addEventListener('input',update);update();
