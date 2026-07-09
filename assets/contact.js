
// 送信フォーム: 内容はFormspree経由で管理人にだけ届く。メールアドレスはサイト内に存在しない
(function(){
  var form=document.getElementById('obsForm');
  if(!form)return;
  var thanks=document.getElementById('formThanks');
  var err=document.getElementById('formError');
  var btn=document.getElementById('sendBtn');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(form.action.indexOf('YOUR_FORM_ID')>=0){
      err.hidden=false;
      err.textContent='(準備中)観測ポストの回線をつなぐ作業がもう少しだけ残っています。ごめんね、また来てみてね。';
      return;
    }
    btn.disabled=true;btn.textContent='送信中…';
    fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
      .then(function(r){
        if(r.ok){form.hidden=true;err.hidden=true;thanks.hidden=false;}
        else{throw new Error('status '+r.status);}
      })
      .catch(function(){
        err.hidden=false;
        err.textContent='うまく送信できなかったみたい…。時間をおいて、もう一度ためしてみてね。';
        btn.disabled=false;btn.textContent='📮 送信する';
      });
  });
})();
