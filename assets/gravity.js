
const $=id=>document.getElementById(id);
const grav=$('grav'),valGrav=$('valGrav'),weight=$('weight'),mountain=$('mountain'),pop=$('pop');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const mascot=$('mascot'),panelGrav=$('panelGrav'),whyGrav=$('whyGrav');
const atmoEscape=$('atmoEscape');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const g=grav.value/100;
  valGrav.textContent=g.toFixed(2)+' G';
  weight.textContent=(60*g).toFixed(1)+'kg';
  // 山の高さ上限の目安: 岩の強度で決まり、ざっくり重力に反比例(エベレスト8850m基準)
  mountain.textContent='約'+Math.round(8850/g).toLocaleString()+'m';
  // 重力が弱いと大気が長期的に逃げる(統合シミュレーターと同じモデル)
  const retention=Math.min(1,Math.pow(g,2.2));
  const gravExtreme=g<0.15||retention<0.02;
  const gravFactor=Math.exp(-Math.pow(Math.log(g)/1.1,2));
  let population=80*gravFactor;
  if(gravExtreme)population=Math.min(population,0.05);
  pop.textContent=population<0.01?'0人':'約'+population.toFixed(1)+'億';
  // テラちゃんの浮遊も重力しだい
  const amp=Math.max(2.5,Math.min(15,7/Math.pow(g,0.7)));
  const base=Math.max(-8,Math.min(5,(g-1)*5));
  mascot.style.setProperty('--float-amp',amp.toFixed(1)+'px');
  mascot.style.setProperty('--float-base',base.toFixed(1)+'px');
  // 重力が弱いと大気が逃げる視覚効果
  const escapeOpacity=g<0.5?Math.max(0,(0.5-g)/0.4*0.8):0;
  if(atmoEscape)atmoEscape.style.opacity=escapeOpacity.toFixed(2);
  earthWrap.classList.toggle('atmo-thin',g<0.3);
  panelGrav.classList.toggle('danger',g<0.2||g>2.5);
  let line='1G。ちょうどいい重さだね',face='happy';
  if(g<0.2){line='ふわふわすぎ!大気も逃げちゃうし、地面に戻れないよ〜!';face='dizzy';}
  else if(g<0.7){line='からだが軽い!ジャンプが楽しい世界だね';face='happy';}
  else if(g>2.4){line='おも…い…。立ってるだけで、くたくただよ…';face='cold';}
  else if(g>1.4){line='ずっしり重い…階段がつらい世界だ…';face='';}
  speechLine.textContent=line;
  setFace(face);
  if(g<0.2)whyGrav.textContent='🔎 重力が弱すぎると大気を引き止められず、長い年月で宇宙へ逃げてしまうよ(火星がこのタイプ)';
  else if(g<0.7)whyGrav.textContent='🔎 重力が弱いと生き物は大きく、山は高く育てるよ。火星(0.38G)には約22kmのオリンポス山があるよ';
  else if(g<=1.4)whyGrav.textContent='🔎 今の重力が、大気をつなぎとめ、生き物や山の大きさを決めているよ';
  else if(g<=2.4)whyGrav.textContent='🔎 山の上限目安に注目。重力2倍の世界では、エベレスト級の山はそもそも存在できないよ';
  else whyGrav.textContent='🔎 3G近いと宇宙へ出る速度も跳ね上がるよ。ロケットが飛ばせない=人工衛星もGPSもない世界かも';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
grav.addEventListener('input',update);update();
