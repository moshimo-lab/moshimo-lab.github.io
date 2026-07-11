
const $=id=>document.getElementById(id);
const sd=$('sd'),valSd=$('valSd'),sdsize=$('sdsize'),sdphase=$('sdphase'),sdearth=$('sdearth');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),iceOverlay=$('iceOverlay'),sdMarker=$('sdMarker');
const mascot=$('mascot'),panelSd=$('panelSd'),whySd=$('whySd');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const p=parseInt(sd.value,10); // 0=いま, 33=10億年後, 66=50億年後, 100=70億年後〜
  if(sdMarker)sdMarker.style.left=p+'%';
  // 経過時間ラベル(era-labelsの目盛に合わせる)
  let when;
  if(p<4)when='現在';
  else if(p<33)when='約'+(p/33*10).toFixed(0)+'億年後';
  else if(p<66)when='約'+(10+(p-33)/33*40).toFixed(0)+'億年後';
  else if(p<92)when='約'+(50+(p-66)/34*20).toFixed(0)+'億年後';
  else when='約70億年後より先';
  valSd.textContent=when;
  // 太陽の大きさ(概算): 主系列でほぼ1倍→末期にかけ徐々に→赤色巨星で200倍超→白色矮星で地球サイズ
  let size,sizeTxt;
  if(p<66){size=1+0.6*Math.pow(p/66,2);sizeTxt=size.toFixed(1)+' 倍'+(p<4?'(いま)':'');}
  else if(p<92){size=1.6+(p-66)/26*218;sizeTxt='約'+size.toFixed(0)+' 倍';}
  else{sizeTxt='約0.01倍(地球サイズ)';}
  sdsize.textContent=sizeTxt;
  // 太陽の姿
  let phase;
  if(p<33)phase='主系列星';
  else if(p<60)phase='明るさを増す主系列星';
  else if(p<70)phase='ふくらみはじめる';
  else if(p<92)phase='赤色巨星';
  else phase='白色矮星';
  sdphase.textContent=phase;
  // 地球のようす
  let earth;
  if(p<30)earth='生命の星';
  else if(p<50)earth='海が蒸発…';
  else if(p<66)earth='灼熱の乾いた星';
  else if(p<92)earth='のみ込まれるか瀬戸際';
  else earth='凍てつく暗い星';
  sdearth.textContent=earth;
  // 地球ビジュアル: 加熱→末期は暗く凍える
  const heat=p<92?Math.min(0.85,Math.max(0,(p-20)/50)):0;
  const ice=p>=92?0.7:0;
  if(heatOverlay)heatOverlay.style.opacity=heat;
  if(iceOverlay)iceOverlay.style.opacity=ice;
  earthWrap.classList.toggle('extreme-heat',heat>0.5);
  earthWrap.classList.toggle('extreme-ice',ice>0.5);
  panelSd.classList.toggle('danger',p>=33);
  let line='太陽は今日も安定運転。あと50億年はだいじょうぶ',face='happy';
  if(p>=92){line='太陽が小さな白色矮星に…静かで、とても寒い夜だね…';face='cold';}
  else if(p>=66){line='太陽が空いっぱいに…!地球、のみ込まれちゃうの…?';face='dizzy';}
  else if(p>=50){line='海が全部干上がって、砂漠の星になっちゃった…';face='hot';}
  else if(p>=33){line='太陽が1割明るくなっただけで、海が沸きはじめてる…あつい…';face='hot';}
  speechLine.textContent=line;
  setFace(face);
  if(p>=92)whySd.textContent='🔎 赤色巨星の外層は宇宙へ流れ去り、中心に残った芯が白色矮星だよ。新しい熱は作れず、何十億年もかけてゆっくり冷えていくんだ';
  else if(p>=66)whySd.textContent='🔎 赤色巨星の太陽は今の200倍以上。水星と金星は確実にのみ込まれるよ。地球がのみ込まれるかは、太陽がどれだけ軽くなるか次第で今も議論中なんだ';
  else if(p>=33)whySd.textContent='🔎 太陽は年をとるほど少しずつ明るくなるよ。約10億年後には1割増しの明るさになり、暴走温室で海が蒸発すると考えられているんだ';
  else whySd.textContent='🔎 太陽は今、水素を燃やして安定して輝く「主系列星」。でも燃料には限りがあるよ。あと約50億年で寿命をむかえるんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
sd.addEventListener('input',update);update();
