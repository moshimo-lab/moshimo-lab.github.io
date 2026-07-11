
const $=id=>document.getElementById(id);
const hl=$('hl'),valHl=$('valHl'),hllayer=$('hllayer'),hltemp=$('hltemp'),hllook=$('hllook');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const depthMarker=$('depthMarker'),mascot=$('mascot'),panelHl=$('panelHl'),whyHl=$('whyHl');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function lerp(a,b,t){return a+(b-a)*t;}
function tempAt(d){
  if(d<=12)return lerp(15,200,d/12);
  if(d<=40)return lerp(200,600,(d-12)/28);
  if(d<=2900)return lerp(600,3700,(d-40)/2860);
  if(d<=5100)return lerp(3700,5000,(d-2900)/2200);
  return lerp(5000,5500,(d-5100)/1271);
}
function pctAt(d){
  if(d<=40)return d/40*7;
  if(d<=2900)return 7+(d-40)/2860*38;
  if(d<=5100)return 45+(d-2900)/2200*32;
  return 77+(d-5100)/1271*23;
}
function update(){
  const p=parseInt(hl.value,10);
  const d=Math.round(Math.pow(p/100,1.6)*6371); // 浅い側を細かく(地殻・コラ半島が見えるように)
  let layer,look;
  if(d<1){layer='地表';look='緑と空';}
  else if(d<40){layer='地殻(ちかく)';look='固い岩の世界';}
  else if(d<2900){layer='マントル';look='ゆっくり流れる熱い岩';}
  else if(d<5100){layer='外核(がいかく)';look='どろどろの鉄の海';}
  else if(d<6300){layer='内核(ないかく)';look='固い鉄のかたまり';}
  else{layer='地球の中心';look='無重力の鉄の世界';}
  valHl.textContent=d.toLocaleString()+'km'+(d<1?'(地表)':'');
  hllayer.textContent=layer;
  const t=tempAt(d);
  hltemp.textContent=d<1?'15℃':'約'+(t<1000?Math.round(t/10)*10:Math.round(t/100)*100).toLocaleString()+'℃';
  hllook.textContent=look;
  if(depthMarker)depthMarker.style.top=pctAt(d).toFixed(1)+'%';
  panelHl.classList.toggle('danger',d>=2900);
  let line,face='';
  if(d<5){line='出発!足の下には、まだだれも見たことのない世界が6371kmも続いてるよ';face='happy';}
  else if(d<40){line='人類の最深記録(約12km)はもう追い越したよ。ここから先は、だれも来たことのない場所';}
  else if(d<2900){line='ここはマントル。固いのに、長ーい時間をかけて流れる岩の世界だよ';}
  else if(d<5100){line='どろどろの鉄の海に突入!この流れが、地球を大きな磁石にしてるんだ';face='hot';}
  else if(d<6300){line='固い鉄のかたまり、内核だよ。まわりは5000℃ごえ…とけないのは圧力のおかげ';face='hot';}
  else{line='地球のまんなかに到着!ここでは、どっちを向いても「上」。ふわっと無重力だよ';face='happy';}
  speechLine.textContent=line;
  setFace(face);
  if(d<40)whyHl.textContent='🔎 深くなるほど熱くなるよ。約12kmのコラ半島の穴でも、底は約200℃だったんだ。それより深くは、地震の波を聴診器がわりにして調べているよ';
  else if(d<2900)whyHl.textContent='🔎 マントルは地球の体積のいちばん大きな部分。この流れがプレートを動かして、山や火山を作っているんだ';
  else if(d<5100)whyHl.textContent='🔎 液体の鉄が流れると電気が生まれて、地球は大きな磁石になる。方位磁針が北を指すのも、オーロラが光るのも、ここのおかげだよ';
  else whyHl.textContent='🔎 中心は約5500℃で、太陽の表面と同じくらい。もし貫通トンネルに飛びこめたら、反対側まで約40分で着く計算だよ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
hl.addEventListener('input',update);update();
