// 共通UX強化スクリプト
(function(){
  // スライダー操作時に数値表示を光らせる
  document.querySelectorAll('input[type=range]').forEach(function(slider){
    var panel = slider.closest('.slider-panel');
    if(!panel) return;
    var valueEl = panel.querySelector('.value');
    if(!valueEl) return;

    slider.addEventListener('input', function(){
      valueEl.classList.add('flash');
      clearTimeout(valueEl._flashTimer);
      valueEl._flashTimer = setTimeout(function(){
        valueEl.classList.remove('flash');
      }, 150);
    });
  });

  // readoutカードの数値も光らせる
  var cards = document.querySelectorAll('.readout .card .v');
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      if(m.type === 'characterData' || m.type === 'childList'){
        var el = m.target.nodeType === 1 ? m.target : m.target.parentElement;
        if(el && el.classList){
          el.classList.add('flash');
          clearTimeout(el._flashTimer);
          el._flashTimer = setTimeout(function(){
            el.classList.remove('flash');
          }, 180);
        }
      }
    });
  });
  cards.forEach(function(card){
    observer.observe(card, {childList: true, characterData: true, subtree: true});
  });
})();
