
const grid=document.getElementById('zukanGrid');
const chips=Array.from(document.querySelectorAll('.cat-chip'));
const zq=document.getElementById('zq');
const fcount=document.getElementById('filterCount');

// URLパラメータからカテゴリを取得（複数対応: ?cat=moon,sun）
const urlParams=new URLSearchParams(location.search);
const catParam=urlParams.get('cat');
let cats=catParam?catParam.split(','):['all'];

function apply(){
  if(!grid)return;
  const text=(zq&&zq.value?zq.value:'').trim().toLowerCase();
  let n=0;
  grid.querySelectorAll('.zcard').forEach(c=>{
    const ccat=c.getAttribute('data-cat');
    if(!ccat){
      const show=(cats.includes('all')&&!text);
      c.classList.toggle('hide',!show);
      return;
    }
    const hay=(c.getAttribute('data-q')||c.textContent||'').toLowerCase();
    const catMatch=cats.includes('all')||cats.includes(ccat);
    const show=catMatch&&(!text||hay.includes(text));
    c.classList.toggle('hide',!show);
    if(show)n++;
  });
  if(fcount)fcount.textContent=(cats.includes('all')&&!text)?'':'🔭 '+n+'件みつかったよ';
}

// チップの初期状態を設定
chips.forEach(ch=>{
  const chipCat=ch.getAttribute('data-cat');
  if(cats.includes('all')&&chipCat==='all'){
    ch.classList.add('on');
  }else if(cats.includes(chipCat)){
    ch.classList.add('on');
    // allチップのonを外す
    chips.find(x=>x.getAttribute('data-cat')==='all')?.classList.remove('on');
  }
});

chips.forEach(ch=>ch.addEventListener('click',()=>{
  cats=[ch.getAttribute('data-cat')];
  chips.forEach(x=>x.classList.toggle('on',x===ch));
  apply();
  // URLパラメータをクリア
  history.replaceState(null,'',location.pathname);
}));
if(zq)zq.addEventListener('input',apply);
apply();
