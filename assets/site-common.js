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

// 関連記事の自動生成
(function(){
  // zukan配下の記事ページでのみ実行
  var path = location.pathname;
  if(!/\/zukan\/[a-z]+\.html$/.test(path)) return;
  if(/index|kotoba|simulator/.test(path)) return;

  var slug = path.match(/\/zukan\/([a-z]+)\.html$/)[1];
  var basePath = path.includes('/zukan/') ? '../assets/' : 'assets/';

  fetch(basePath + 'articles.json')
    .then(function(r){ return r.json(); })
    .then(function(articles){
      var current = articles.find(function(a){ return a.slug === slug; });
      if(!current) return;

      // 同カテゴリの記事をフィルタ（自分除外）
      var related = articles.filter(function(a){
        return a.cat === current.cat && a.slug !== slug;
      });

      // 同カテゴリが3本未満なら他カテゴリから補充
      if(related.length < 3){
        var others = articles.filter(function(a){
          return a.cat !== current.cat && a.slug !== slug;
        });
        shuffle(others);
        related = related.concat(others.slice(0, 3 - related.length));
      }

      shuffle(related);
      related = related.slice(0, 3);

      // HTML生成
      var html = '<div class="related-section"><h3>🔭 関連するもしも</h3><div class="related-grid">';
      related.forEach(function(a){
        html += '<a class="zcard mini" href="' + a.slug + '.html">';
        html += '<span class="icon">' + a.icon + '</span>';
        html += '<div class="t">' + a.title + '</div>';
        html += '</a>';
      });
      html += '</div></div>';

      // .relnav の前に挿入
      var relnav = document.querySelector('.relnav');
      if(relnav){
        relnav.insertAdjacentHTML('beforebegin', html);
      }
    })
    .catch(function(e){ console.log('Related articles not loaded:', e); });

  function shuffle(arr){
    for(var i = arr.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
  }
})();
