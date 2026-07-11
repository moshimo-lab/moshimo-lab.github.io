
const grid=document.getElementById('zukanGrid');
const chips=Array.from(document.querySelectorAll('.cat-chip'));
const zq=document.getElementById('zq');
const fcount=document.getElementById('filterCount');
let cat='all';
function apply(){
  if(!grid)return;
  const text=(zq&&zq.value?zq.value:'').trim().toLowerCase();
  let n=0;
  grid.querySelectorAll('.zcard').forEach(c=>{
    const ccat=c.getAttribute('data-cat');
    if(!ccat){ // 準備中カードなど: 「ぜんぶ」かつ検索なしのときだけ表示
      const show=(cat==='all'&&!text);
      c.classList.toggle('hide',!show);
      return;
    }
    const hay=(c.getAttribute('data-q')||c.textContent||'').toLowerCase();
    const show=((cat==='all')||(ccat===cat))&&(!text||hay.includes(text));
    c.classList.toggle('hide',!show);
    if(show)n++;
  });
  if(fcount)fcount.textContent=(cat==='all'&&!text)?'':'🔭 '+n+'件みつかったよ';
}
chips.forEach(ch=>ch.addEventListener('click',()=>{
  cat=ch.getAttribute('data-cat');
  chips.forEach(x=>x.classList.toggle('on',x===ch));
  apply();
}));
if(zq)zq.addEventListener('input',apply);
apply();
