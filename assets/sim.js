
const $=id=>document.getElementById(id);
const rot=$('rot'),dist=$('dist'),tilt=$('tilt'),atm=$('atm'),grav=$('grav');
const valRot=$('valRot'),valDist=$('valDist'),valTilt=$('valTilt'),valAtm=$('valAtm'),valGrav=$('valGrav');
const dayLen=$('dayLen'),temp=$('temp'),season=$('season'),pop=$('pop');
const globeStrip=$('globeStrip'),earthWrap=$('earthWrap'),speechLine=$('speechLine');
const heatOverlay=$('heatOverlay'),iceOverlay=$('iceOverlay');
const mascot=$('mascot');
const panelRot=$('panelRot'),panelDist=$('panelDist'),panelAtm=$('panelAtm'),panelGrav=$('panelGrav');
const whyRot=$('whyRot'),whyDist=$('whyDist'),whyTilt=$('whyTilt'),whyAtm=$('whyAtm'),whyGrav=$('whyGrav');

function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
function setFace(f){mascot.className='mascot'+(f?' face-'+f:'');}

function getWhyRot(r,hours){
  if(r>20) return '🔎 自転周期が1.5時間を切るあたりから、赤道の遠心力が重力に近づき、地表がちぎれ始める限界に近づくよ';
  if(r>3)  return '🔎 自転が速いと1日が短くなる(今は約'+hours.toFixed(1)+'時間)。台風のような渦(コリオリ力)も強まりやすいよ';
  if(r<0.05) return '🔎 自転が極端に遅いと、太陽に面した側だけ焼け続け、反対側は凍り続けて昼夜の温度差が大きくなりすぎるよ';
  if(r<0.5) return '🔎 自転が遅いと1日が長くなる(今は約'+hours.toFixed(1)+'時間)。昼と夜の寒暖差が広がるよ';
  return '🔎 地球は約24時間で1回転。これが体内時計や生活リズムの基準になっているよ';
}
function getWhyDist(d,tempC){
  if(d<0.3) return '🔎 太陽に近すぎると受け取る日射エネルギーが10倍以上になり、海が蒸発するほど気温が上がるよ';
  if(d<0.85) return '🔎 太陽に近いほど単位面積あたりの日射エネルギーが増え、気温が上がるよ(今は約'+tempC.toFixed(0)+'℃)';
  if(d>3.2) return '🔎 太陽から遠すぎると日射エネルギーが1/10以下になり、海も凍りつくほど冷えていくよ';
  if(d>1.15) return '🔎 太陽から遠いほど日射エネルギーが減り、気温が下がるよ(今は約'+tempC.toFixed(0)+'℃)';
  return '🔎 今の距離(1AU)は、水が液体で存在できる"ハビタブルゾーン"のほぼ中心だよ';
}
function getWhyTilt(t){
  if(t<5) return '🔎 傾きがほぼ0だと四季がほとんど消え、雨季・乾季など季節変化に頼ってきた生態系や農業が影響を受けるよ(ただし壊滅的ではないよ)';
  if(t<15) return '🔎 傾きが小さいと季節の変化が穏やかになるよ';
  if(t<=30) return '🔎 今の23.4°くらいの傾きが、程よい四季とバランスの取れた気候帯を生み出しているよ';
  if(t<55) return '🔎 傾きが大きくなるほど、夏はより暑く冬はより寒くなり、季節差がどんどん激しくなるよ';
  return '🔎 傾きが90°に近いと、極域では半年ずっと昼、半年ずっと夜になり、季節が極端になりすぎるよ(傾きすぎは、傾かなすぎよりずっと深刻)';
}
function getWhyAtm(a,effA,tempC){
  if(effA<0.02) return '🔎 大気がほとんどないと温室効果が働かず、月のように焼け付く昼と極寒の夜がそのまま気温に出るよ';
  if(effA<0.3) return '🔎 大気が薄いと温室効果が弱く、気温が上がりにくいよ(今は約'+tempC.toFixed(0)+'℃。火星もこのタイプ)';
  if(effA<=3) return '🔎 今の大気の濃さが、程よい温室効果でちょうどいい気温を保っているよ';
  if(effA<20) return '🔎 大気が濃くなるほど温室効果が強まり、熱がこもりやすくなるよ(今は約'+tempC.toFixed(0)+'℃)';
  return '🔎 大気が金星並みに濃くなると温室効果が暴走し、灼熱の惑星になるよ(実際の金星は表面温度460℃超え)';
}
function getWhyGrav(g,a,effA){
  const leaked = a>0 ? (effA/a) : 1;
  if(g<0.3) return '🔎 重力が弱すぎると大気を引き止められず、長い年月で宇宙へ逃げてしまうよ(いま保持できている大気は設定の約'+(leaked*100).toFixed(0)+'%。火星がこのタイプ)';
  if(g<0.8) return '🔎 重力が弱めだと大気が少しずつ逃げやすくなるよ(保持できている大気は設定の約'+(leaked*100).toFixed(0)+'%)。生き物は今より大きく育てるかも';
  if(g<=1.3) return '🔎 今の重力(1G)が、大気をつなぎとめ、生き物のからだの大きさも決めているよ';
  if(g<2.2) return '🔎 重力が強いと大気はしっかり保持できるけど、からだを支えるのが大変。生き物は低く、がっしりした姿になりそうだよ';
  return '🔎 重力が3G近いと、立っているだけで全身トレーニング。木も建物も高くは伸ばせないよ';
}

// ミッション
const missions={venus:false,snow:false,slow:false,half:false,side:false};
let overrideLine=null,overrideTimer=null;
const CONGRATS={venus:'ミッション達成!これはもう金星だよ…あっつい!',
 snow:'ミッション達成!まっしろ!雪玉地球のできあがり…ぶるぶる',
 slow:'ミッション達成!1日100時間…のんびりすぎるよ〜',
 half:'ミッション達成!ぴったり半分に調整できるなんて、観測員の才能あるよ!',
 side:'ミッション達成!横倒しだ〜!天王星もこんな気分なのかな'};
function checkMission(key,cond){
  if(cond && !missions[key]){
    missions[key]=true;
    const el=document.querySelector('.mission[data-m="'+key+'"]');
    el.classList.add('done','flash');
    el.querySelector('.chk').textContent='[✓]';
    setTimeout(()=>el.classList.remove('flash'),1200);
    overrideLine={text:CONGRATS[key],face:'happy'};
    clearTimeout(overrideTimer);
    overrideTimer=setTimeout(()=>{overrideLine=null;update();},3000);
    document.getElementById('mCount').textContent='達成 '+Object.values(missions).filter(Boolean).length+'/5';
  }
}

let last={};
function update(){
  const r=rot.value/100;
  const d=dist.value/100;
  const t=tilt.value/10;
  const a=Math.pow(10,(atm.value/1000)*5-3); // 0.001 - 100倍
  const g=grav.value/100;                    // 0.1 - 3.0G

  valRot.textContent=r.toFixed(2)+' 倍';
  valDist.textContent=d.toFixed(2)+' AU';
  valTilt.textContent=t.toFixed(1)+'°';
  valAtm.textContent=(a<0.01?a.toExponential(1):a.toFixed(2))+' 倍';
  valGrav.textContent=g.toFixed(2)+' G';
  earthWrap.style.transform='rotate('+t+'deg)';

  const hours=24/r;
  dayLen.textContent=(hours>=1000?hours.toFixed(0):hours.toFixed(1))+'h';

  // 重力による大気保持:g=1で1.0、弱いほど長期的に大気が逃げる(火星0.38Gで約12%)
  const retention=Math.min(1,Math.pow(g,2.2));
  const effA=a*retention;

  // 気温 = 平衡温度(距離) + 温室効果(有効大気)
  const teq=255/Math.sqrt(d);
  const deltaT=33*Math.pow(effA,0.604);
  const tempC=teq+deltaT-273;
  temp.textContent='約'+tempC.toFixed(0)+'℃';

  const seasonSwing=t*0.85;
  season.textContent='±'+seasonSwing.toFixed(0)+'℃';

  const rotExtreme=r<0.05||r>=17; // 17倍以上=赤道の遠心力が重力を超え地表崩壊(記事と統一)
  const distExtreme=d<0.3||d>3.2;
  const atmExtreme=effA<0.02||effA>50;
  const gravExtreme=g<0.15;
  const uninhabitable=rotExtreme||distExtreme||atmExtreme||gravExtreme;

  // 人口モデル
  const tempFactor=Math.exp(-Math.pow((tempC-15)/16,2));
  const rotFactor=Math.exp(-Math.pow(Math.log(r)/2.2,2));
  const lowDev=Math.max(0,23.4-t), highDev=Math.max(0,t-23.4);
  const tiltFactor=Math.exp(-Math.pow(lowDev/50,2))*Math.exp(-Math.pow(highDev/22,2));
  const gravFactor=Math.exp(-Math.pow(Math.log(g)/1.1,2));
  let population=80*tempFactor*rotFactor*tiltFactor*gravFactor;
  if(uninhabitable) population=Math.min(population,0.05);
  pop.textContent=population<0.01?'0人':'約'+population.toFixed(1)+'億';

  const spinDuration=Math.max(0.3,6/r);
  globeStrip.style.animation='slideGlobe '+spinDuration+'s linear infinite';

  const heatOpacity=clamp((tempC-15)/80,0,0.92);
  const iceOpacity=clamp((15-tempC)/60,0,0.92);
  heatOverlay.style.opacity=heatOpacity;
  iceOverlay.style.opacity=iceOpacity;
  earthWrap.classList.toggle('extreme-heat',heatOpacity>0.5);
  earthWrap.classList.toggle('extreme-ice',iceOpacity>0.5);
  panelRot.classList.toggle('danger',rotExtreme);

  // テラちゃんの浮遊は重力しだい:軽い星ではふわんと高く、重い星では沈み込む
  const floatAmp=clamp(7/Math.pow(g,0.7),2.5,15);
  const floatBase=clamp((g-1)*5,-8,5);
  mascot.style.setProperty('--float-amp',floatAmp.toFixed(1)+'px');
  mascot.style.setProperty('--float-base',floatBase.toFixed(1)+'px');
  panelDist.classList.toggle('danger',distExtreme);
  panelAtm.classList.toggle('danger',atmExtreme);
  panelGrav.classList.toggle('danger',gravExtreme||g>2.5);

  let line='今日も平常運転だよ〜',face='';
  if(atmExtreme&&effA<0.02){line='大気がなさすぎて、寒暖差がダイレクトに来る…息もできないよ…';face='hot';}
  else if(heatOpacity>0.85){line='暑い…暑すぎるよ…海がどんどん干上がっていく…';face='hot';}
  else if(heatOpacity>0.5){line='うだるような暑さ…氷がどんどん溶けてる…';face='hot';}
  else if(heatOpacity>0.15){line='ちょっと暑くなってきたかも…温暖化、気になるね';face='hot';}
  else if(iceOpacity>0.85){line='寒い…寒すぎる…海まで凍ってきたかも…';face='cold';}
  else if(iceOpacity>0.5){line='雪と氷がどんどん広がってきてる…寒いよ〜';face='cold';}
  else if(iceOpacity>0.15){line='なんだか肌寒いね…';face='cold';}
  else if(g<0.3){line='からだがふわっふわ!ジャンプしたら戻ってこられないかも…';face='dizzy';}
  else if(g>2.2){line='おもい…からだが地面に張りつきそう…';face='cold';}
  else if(rotExtreme&&r>20){line='まわるの速すぎ!目が回っちゃう!';face='dizzy';}
  else if(rotExtreme&&r<0.05){line='一日が長すぎて、昼と夜の差がすごいことに…';}
  else if(r>3){line='まわるの速い〜!目が回っちゃう!';face='dizzy';}
  else if(seasonSwing>50){line='季節の差が激しすぎて大変そう…';}
  else if(hours>48){line='一日が長くてのんびりだね〜';}
  else if(hours<12){line='一日があっという間!忙しない!';face='dizzy';}
  else if(Math.abs(tempC-15)<3&&Math.abs(g-1)<0.15&&Math.abs(r-1)<0.2){line='うん、ちょうどいい!やっぱりこの地球がいちばんだね';face='happy';}

  if(overrideLine){line=overrideLine.text;face=overrideLine.face;}
  speechLine.textContent=line;
  setFace(face);

  whyRot.textContent=getWhyRot(r,hours);
  whyDist.textContent=getWhyDist(d,tempC);
  whyTilt.textContent=getWhyTilt(t);
  whyAtm.textContent=getWhyAtm(a,effA,tempC);
  whyGrav.textContent=getWhyGrav(g,a,effA);

  checkMission('venus',tempC>=400);
  checkMission('snow',tempC<=-40);
  checkMission('slow',hours>=100);
  checkMission('half',population>=35&&population<=45);
  checkMission('side',t>=80);

  last={r,d,t,a,g,hours,tempC,seasonSwing,population,line};
}

// プリセット
const PRESETS={
  earth:{rot:100,dist:100,tilt:234,atm:600,grav:100},
  venus:{rot:1,  dist:72, tilt:26, atm:991,grav:90},
  mars: {rot:97, dist:152,tilt:252,atm:156,grav:38},
  spin: {rot:400,dist:100,tilt:234,atm:600,grav:100},
  side: {rot:100,dist:100,tilt:900,atm:600,grav:100},
};
document.querySelectorAll('.preset').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const p=PRESETS[btn.dataset.p];
    rot.value=p.rot;dist.value=p.dist;tilt.value=p.tilt;atm.value=p.atm;grav.value=p.grav;
    update();
  });
});

// 結果コピー
document.getElementById('copyBtn').addEventListener('click',()=>{
  const l=last;
  const txt='🌍もしも地球ラボ 観測ログ\n'
    +'自転 '+l.r.toFixed(2)+'倍 / 距離 '+l.d.toFixed(2)+'AU / 傾き '+l.t.toFixed(1)+'° / 大気 '+(l.a<0.01?l.a.toExponential(1):l.a.toFixed(2))+'倍 / 重力 '+l.g.toFixed(2)+'G\n'
    +'→ 1日 '+l.hours.toFixed(1)+'時間・平均気温 約'+l.tempC.toFixed(0)+'℃・人口予測 '+(l.population<0.01?'0人':'約'+l.population.toFixed(1)+'億')+'\n'
    +'テラちゃん「'+l.line+'」';
  const done=()=>{const b=document.getElementById('copyBtn');const o=b.textContent;b.textContent='✅ コピーしたよ!';setTimeout(()=>b.textContent=o,1600);};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done).catch(()=>fallback(txt,done));}
  else fallback(txt,done);
  function fallback(t,cb){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);cb();}
});

[rot,dist,tilt,atm,grav].forEach(el=>el.addEventListener('input',update));
update();
