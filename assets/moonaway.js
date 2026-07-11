
const $=id=>document.getElementById(id);
const ma=$('ma'),valMa=$('valMa'),masize=$('masize'),maeclipse=$('maeclipse'),maday=$('maday');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const miniMoon=$('miniMoon'),maLaneMoon=$('maLaneMoon'),maTick=$('maTick');
const mascot=$('mascot'),panelMa=$('panelMa'),whyMa=$('whyMa');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const p=parseInt(ma.value,10); // 0=いま, 50=約6億年後, 100=はるか未来
  // 経過時間: 前半0〜6億年、後半6億〜数十億年(伸びは徐々に鈍る簡易モデル)
  let T; // 億年
  if(p<=50)T=p/50*6;
  else T=6+(p-50)/50*24; // 〜約30億年後
  valMa.textContent=p<2?'現在':'約'+T.toFixed(0)+'億年後';
  // 距離(万km): いま38.4、年3.8cm→6億年で約+2.3万km。後半は減速して最終的に+17%程度で頭打ちの簡易モデル
  let d;
  if(p<=50)d=38.4+2.28*(T/6);
  else d=40.7+4.3*(1-Math.exp(-(T-6)/12));
  // 見かけの大きさ ∝ 1/距離
  const app=38.4/d;
  masize.textContent=app.toFixed(2)+' 倍'+(p<2?'(いま)':'');
  if(miniMoon){miniMoon.style.transform='scale('+app+')';}
  // 距離レーン: いま=12%、右端=95%
  if(maTick)maTick.style.left='12%';
  if(maLaneMoon)maLaneMoon.style.left=(12+(d-38.4)/6.2*83)+'%';
  // 皆既日食: 見かけの月が太陽(≒1.0)を隠せなくなると金環のみ
  let ec;
  if(app>0.995)ec='見られる';
  else if(app>0.97)ec='ぎりぎり・まれ';
  else ec='金環日食だけ';
  maeclipse.textContent=ec;
  // 1日の長さ: 100年に約1.8ミリ秒→6億年で約+3時間。はるか未来は約30時間で頭打ちの簡易モデル
  let day;
  if(p<=50)day=24+3*(T/6);
  else day=27+3*(1-Math.exp(-(T-6)/12));
  maday.textContent=p<2?'24時間':'約'+day.toFixed(0)+'時間';
  panelMa.classList.toggle('danger',false);
  let line='今夜も月がきれいだね。実は毎年3.8cmずつ遠ざかってるんだよ',face='happy';
  if(p>=90){line='地球の自転と月の公転がそろって、遠ざかりが止まったよ。ずっと見つめ合ったままのダンスだね';face='';}
  else if(app<=0.97){line='月が小さくなって、太陽を隠しきれない…皆既日食はもう見られないんだ…';face='cold';}
  else if(p>=25){line='月が少しずつ遠くなってる…1日もちょっとずつ長くなってるよ';face='';}
  speechLine.textContent=line;
  setFace(face);
  if(p>=90)whyMa.textContent='🔎 はるか未来、地球の自転周期と月の公転周期が一致するとエネルギーのやりとりが釣り合い、月の後退は止まると考えられているよ';
  else if(app<=0.97)whyMa.textContent='🔎 見かけの月が太陽より小さくなると、太陽をぴったり隠せなくなるよ。数億年後には皆既日食が見られなくなると考えられているんだ';
  else whyMa.textContent='🔎 月は毎年3.8cmずつ遠ざかっているよ。地球の自転のエネルギーが、潮の満ち引きを通して月に受けわたされているんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
ma.addEventListener('input',update);update();
