
const $=id=>document.getElementById(id);
const pc=$('pc'),valPc=$('valPc'),pcstar=$('pcstar'),pcprog=$('pcprog'),pcsky=$('pcsky');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const pcAxis=$('pcAxis'),mascot=$('mascot'),panelPc=$('panelPc'),whyPc=$('whyPc');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function yrLabel(yr){
  if(yr<100)return '現在';
  if(yr<10000)return '約'+yr.toLocaleString()+'年後';
  const man=Math.floor(yr/10000),rest=yr%10000;
  return '約'+man+'万'+(rest?rest.toLocaleString():'')+'年後';
}
function update(){
  const p=parseInt(pc.value,10);
  const yr=Math.round(p*260/100)*100; // 0〜26000年(100年刻み)
  valPc.textContent=yrLabel(yr);
  pcprog.textContent=p+'%';
  let star;
  if(yr<600)star='ポラリス(こぐま座)';
  else if(yr>=1500&&yr<=2600)star='エライ(ケフェウス座)';
  else if(yr>=7000&&yr<=9000)star='デネブ(はくちょう座)';
  else if(yr>=11800&&yr<=14200)star='ベガ(こと座)';
  else if(yr>=25400)star='ポラリスに帰還';
  else star='交代の途中(目印なし)';
  pcstar.textContent=star;
  if(yr<600)pcsky.textContent='いまの星空';
  else if(Math.abs(yr-13000)<1700)pcsky.textContent='夏と冬の星座が入れかわる';
  else if(yr>=25400)pcsky.textContent='いまの星空に戻る';
  else pcsky.textContent='星座の見える季節がずれていく';
  const a=p/100*2*Math.PI;
  const x=55*Math.sin(a),y=-55*Math.cos(a);
  if(pcAxis){pcAxis.style.left='calc(50% + '+x.toFixed(1)+'px)';pcAxis.style.top='calc(50% + '+y.toFixed(1)+'px)';}
  panelPc.classList.toggle('danger',false);
  let line='地軸はコマみたいに、ゆーっくり首を振ってるよ。1周するのに2万6000年!',face='happy';
  if(yr>=25400){line='ぐるっと1周して、ポラリスにおかえり。星の世界の、長い長い時計だね';face='happy';}
  else if(yr>=11800&&yr<=14200){line='未来の北極星はベガ!七夕のおりひめ星が、旅の目印になる時代だね';face='happy';}
  else if(yr>=7000&&yr<=9000){line='この時代の北極星はデネブ。はくちょう座のしっぽが北を教えてくれるよ';face='';}
  else if(yr>=1500&&yr<=2600){line='次の当番はケフェウス座のエライ。北極星は交代制なんだよ';face='';}
  else if(yr>=600){line='いまは北極星の交代の途中。北の空に、はっきりした目印がない時代もあるんだ';face='';}
  speechLine.textContent=line;
  setFace(face);
  if(p<8)whyPc.textContent='🔎 地球は赤道がふくらんだ形。月と太陽の引力がそのふくらみを引っぱるので、コマの首振りと同じ動きが生まれるよ';
  else if(Math.abs(yr-13000)<1700)whyPc.textContent='🔎 首振りが半周すると、季節と星空の関係が逆転。いま夏に見える星座が冬の星座になるよ。オリオン座が夏の星座になる時代だね';
  else if(p>=92)whyPc.textContent='🔎 約2万6000年でひと回り。紀元前2世紀にヒッパルコスが星の記録の比較から見つけた、空の大きなリズムだよ';
  else whyPc.textContent='🔎 「北極星」は星の名前じゃなくて、たまたま地軸の先にいる星の称号。地軸が動けば、称号もリレーされていくんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
earthWrap.style.transform='rotate(23.4deg)';
pc.addEventListener('input',update);update();
