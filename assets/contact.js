
// スパム収集ボット対策:アドレスはHTMLに直接書かず、JSで組み立てる
(function(){
  var p=['ssuzuki','240405'], d=['gmail','com'];
  var addr=p.join('')+'+moshimo'+'\u0040'+d.join('.');
  var a=document.getElementById('mailLink');
  a.href='mailto:'+addr+'?subject='+encodeURIComponent('【もしも地球ラボ】お問い合わせ');
  a.textContent=addr;
  var btn=document.getElementById('copyMail');
  btn.addEventListener('click',function(){
    var done=function(){var o=btn.textContent;btn.textContent='✅ コピーしたよ!';setTimeout(function(){btn.textContent=o;},1600);};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(addr).then(done).catch(function(){fb();});}
    else fb();
    function fb(){var ta=document.createElement('textarea');ta.value=addr;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);done();}
  });
})();
