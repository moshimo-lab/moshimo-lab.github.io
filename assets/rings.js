
const $=id=>document.getElementById(id);
const rg=$('rg'),valRg=$('valRg'),rgview=$('rgview'),rgnight=$('rgnight'),rgshadow=$('rgshadow');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const ringArc=$('ringArc'),ringNote=$('ringNote'),mascot=$('mascot'),panelRg=$('panelRg'),whyRg=$('whyRg');
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}
function update(){
  const lat=parseInt(rg.value,10);
  let where='';
  if(lat<3)where='(赤道)';
  else if(lat<25)where='(熱帯)';
  else if(lat<50)where='(日本はこのあたり)';
  else if(lat<70)where='(高緯度)';
  else where='(極地)';
  valRg.textContent='緯度'+lat+'°'+where;
  let view,night,note;
  if(lat<3){view='頭の真上を横切る細い線';night='細いが明るい光の線';note='真上を細い光の線が横切る(環を真横から見ている)';}
  else if(lat<25){view='空高くかかる巨大なアーチ';night='一晩中、夜空を照らす';note='頭上近くまでのぼる巨大な光のアーチ';}
  else if(lat<50){view='南の空の大きなアーチ';night='一晩中、夜空を照らす';note='南の空に大きな光のアーチ';}
  else if(lat<70){view='南の地平線ぞいの低いアーチ';night='地平線ぞいがほのかに明るい';note='南の地平線近くに低いアーチ';}
  else{view='見えない(地平線の下)';night='環あかりのない夜';note='環は地平線の下(見えない)';}
  rgview.textContent=view;rgnight.textContent=night;
  rgshadow.textContent=lat<3?'ほぼ影なし':lat<25?'冬に環の影がかかる日がある':lat<60?'冬は環の影で日ざしが減る':'影の影響は小さい';
  if(ringNote)ringNote.textContent=note;
  if(ringArc){
    if(lat<3){ringArc.style.opacity='1';ringArc.style.width='560px';ringArc.style.height='560px';ringArc.style.top='6px';ringArc.style.borderWidth='2px';}
    else if(lat<70){const peak=8+(lat/70)*72;ringArc.style.opacity='1';ringArc.style.width='340px';ringArc.style.height='340px';ringArc.style.top=peak+'px';ringArc.style.borderWidth=(3+lat/12).toFixed(1)+'px';}
    else{ringArc.style.opacity='0.08';ringArc.style.top='96px';}
  }
  panelRg.classList.toggle('danger',false);
  let line='南の空に巨大な光のアーチ…!毎晩この眺めなんて、ぜいたくだね',face='happy';
  if(lat<3){line='真上に細い光の線!環を真横から見てるんだね。夜どおし消えない目印だよ';face='happy';}
  else if(lat>=70){line='ここまで来ると環は地平線の下…見えなくて、ちょっとさみしいな';face='cold';}
  else if(lat>=50){line='アーチが低くなってきた。そのぶん冬は、環の影で日ざしが減りそう…';face='';}
  speechLine.textContent=line;
  setFace(face);
  if(lat<3)whyRg.textContent='🔎 環は赤道の真上に広がる薄い円盤。赤道からはちょうど真横から見るので、細い線になるよ';
  else if(lat<50)whyRg.textContent='🔎 環は昇りも沈みもせず、毎晩空の同じ場所にかかるよ。夜は太陽の光を反射して光るけど、真夜中には地球の影が環に落ちて一部が暗く欠けるんだ';
  else if(lat<70)whyRg.textContent='🔎 緯度が上がるほどアーチは南に低くなるよ。中緯度の冬には環の影で日ざしが減り、冬がいっそう寒くなると考えられているんだ';
  else whyRg.textContent='🔎 高緯度からは地球自身のカーブにさえぎられて環は見えないよ。オルドビス紀のクレーターが赤道近くに集中していたのは、環が赤道上空にあった証拠と考えられているんだ';
}
globeStrip.style.animation='slideGlobe 6s linear infinite';
rg.addEventListener('input',update);update();
