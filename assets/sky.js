
const $=id=>document.getElementById(id);
const sk=$('sk'),valSk=$('valSk'),scolor=$('dayc'),ssunset=$('sunsetc'),sstars=$('stars');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const skyBand=$('skyBand'),skySunMini=$('skySunMini'),mascot=$('mascot'),panelSk=$('panelSk'),whySk=$('whySk');
function update(){
  const a=sk.value/100; // 大気の散乱の強さ(いま=1)
  valSk.textContent=a.toFixed(2)+' 倍';
  // 空の色バンド(昼側→夕方側のグラデーション)をJSで計算
  if(skyBand){
    let day,dusk;
    if(a<0.05){day='#05070f';dusk='#05070f';}
    else if(a<0.5){day='#0e1e46';dusk='#20263a';}
    else if(a<1.6){day='#3a8fe0';dusk='#e0703a';}
    else{day='#cfd8e6';dusk='#b0392a';}
    skyBand.style.background='linear-gradient(90deg,'+day+' 0%,'+day+' 55%,'+dusk+' 100%)';
  }
  if(skySunMini){
    skySunMini.style.background=a>=1.6
      ? 'radial-gradient(circle at 35% 30%,#ffd9c8 0%,#ff7a4d 60%,#c23a1d 100%)'
      : 'radial-gradient(circle at 35% 30%,#fff6d8 0%,#ffd166 55%,#e08a2e 100%)';
  }
  scolor.textContent=a<0.05?'黒(大気なし)':a<0.5?'濃い藍色':a<1.6?'青(いま)':'白っぽい';
  ssunset.textContent=a<0.05?'なし':a<0.5?'かすか':a<1.6?'赤い夕焼け(いま)':'真っ赤で長い';
  sstars.textContent=a<0.05?'昼でも見える':a<0.5?'夕方から見える':a<1.6?'夜に見える(いま)':'夜も見えにくい';
  panelSk.classList.toggle('danger',a<0.05||a>=2.4);
  let line='青い空と赤い夕焼け。これが地球の空だね',face='happy';
  if(a<0.05){line='空が真っ黒…昼なのに星が見える。月の空みたいだ…';face='cold';}
  else if(a<0.5){line='空がうすい藍色…高い山の上みたいな空だね';face='';}
  else if(a>=1.6){line='空が白っぽい…太陽が赤く見えるよ。夕焼けはすごそうだけど…';face='';}
  speechLine.textContent=line;
  mascot.className='mascot'+(face?' face-'+face:'');
  if(a<0.05)whySk.textContent='🔎 大気がないと光が散乱されず、空は昼でも黒いまま。月の空がまさにこれだよ';
  else if(a<1.6)whySk.textContent='🔎 空が青いのは、大気が太陽光のうち波長の短い青い光を強く散乱するから(レイリー散乱)。夕方は光の通り道が長くなり、青が散らされ尽くして赤が残るよ';
  else whySk.textContent='🔎 散乱が強すぎると青も赤も散らされて空は白っぽく、太陽は赤く見えるよ。大きな火山噴火のあとに世界中で夕焼けが真っ赤になった記録があるんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
sk.addEventListener('input',update);update();
