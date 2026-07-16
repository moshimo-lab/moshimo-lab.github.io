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

// 観測バッジシステム（案C）
(function(){
  var STORAGE_KEY = 'moshimo_observed';
  var LEVELS = [
    { min: 0, name: '見習い観測員', icon: '🔰' },
    { min: 3, name: '観測員', icon: '🔭' },
    { min: 10, name: '上級観測員', icon: '⭐' },
    { min: 20, name: 'マスター観測員', icon: '🏆' },
    { min: 42, name: 'コンプリート！', icon: '🌍' }
  ];

  function getObserved(){
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch(e){ return []; }
  }

  function saveObserved(list){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch(e){}
  }

  function getLevel(count){
    for(var i = LEVELS.length - 1; i >= 0; i--){
      if(count >= LEVELS[i].min) return LEVELS[i];
    }
    return LEVELS[0];
  }

  // 記事ページ: 訪問を記録
  var path = location.pathname;
  var articleMatch = path.match(/\/zukan\/([a-z]+)\.html$/);
  if(articleMatch && !/index|kotoba|simulator/.test(path)){
    var slug = articleMatch[1];
    var observed = getObserved();
    if(observed.indexOf(slug) === -1){
      observed.push(slug);
      saveObserved(observed);
    }
  }

  // 図鑑一覧: 観測済みマークを表示
  var zukanGrid = document.getElementById('zukanGrid');
  if(zukanGrid){
    var observed = getObserved();
    zukanGrid.querySelectorAll('.zcard').forEach(function(card){
      var href = card.getAttribute('href');
      if(!href) return;
      var m = href.match(/([a-z]+)\.html$/);
      if(m && observed.indexOf(m[1]) !== -1){
        card.classList.add('observed');
      }
    });
  }

  // ヘッダーにレベル表示
  var observed = getObserved();
  var count = observed.length;
  if(count > 0){
    var level = getLevel(count);
    var badge = document.createElement('div');
    badge.className = 'observer-badge';
    badge.innerHTML = '<span class="ob-icon">' + level.icon + '</span><span class="ob-text">' + level.name + ' (' + count + '/42)</span>';
    var nav = document.querySelector('.topnav');
    if(nav) nav.appendChild(badge);
  }

  // 5本読了時にバナー表示（1回だけ）
  if(count >= 5 && !localStorage.getItem('moshimo_banner_shown')){
    var banner = document.createElement('div');
    banner.className = 'obs-banner';
    banner.innerHTML = '🎉 5記事観測達成！ <a href="' + (path.includes('/zukan/') ? '../' : '') + 'omiyage.html">観測キットで本格観測しよう →</a><button class="obs-close">×</button>';
    document.body.appendChild(banner);
    banner.querySelector('.obs-close').addEventListener('click', function(){
      banner.remove();
      localStorage.setItem('moshimo_banner_shown', '1');
    });
  }
})();
