# もしも地球ラボ — 公開手順とセキュリティ

すべて静的HTML(外部依存はGoogle Fontsのみ)。この site/ フォルダの中身をアップロードするだけで公開できます。
記事の追加・更新は隣の generator/ で行います(generator/HOWTO-articles.md 参照)。generator/ はデプロイしないでください。

## 公開方法(無料)
1. **Netlify Drop**: https://app.netlify.com/drop に site/ をドラッグ&ドロップ
2. **Cloudflare Pages**: ダッシュボードからアップロード
3. **Vercel**: リポジトリ連携 or `vercel deploy`
4. GitHub Pages も可(ただし下記「ホスト別の注意」参照)
※更新を楽にしたい場合は、GitHubリポジトリにpush→Netlify/Cloudflare Pagesを連携させる方式を推奨。
  以後の記事追加は「build.py実行→git push」だけで公開まで自動化されます。

## 構成
- index.html / zukan/ / tera.html / qa.html / omiyage.html … 各ページ
- assets/ … 共通CSS・各ページJS(すべて外部ファイル。インラインscript/styleは禁止)
- 404.html / robots.txt / .well-known/security.txt … ★security.txtの連絡先は公開前に書き換え★
- _headers / vercel.json … セキュリティヘッダー(Netlify・Cloudflare / Vercel が自動適用)

## 実施済みのセキュリティ対策
- CSP: default-src 'none' 起点、unsafe-inline/unsafe-eval 不使用。meta版CSPも各ページに二重化
- frame-ancestors 'none' + X-Frame-Options: DENY(クリックジャッキング対策)
- X-Content-Type-Options: nosniff / HSTS / Referrer-Policy / Permissions-Policy(全機能拒否)
- Cross-Origin-Opener-Policy / Cross-Origin-Resource-Policy: same-origin
- コード側: innerHTML・eval・インラインイベントハンドラ不使用

## ホスト別の注意
- Netlify / Cloudflare Pages: _headers がそのまま有効。Vercel: vercel.json が有効。
- GitHub Pages: カスタムヘッダー非対応。meta版CSPで大半カバーされるが、
  frame-ancestors / HSTS はmetaでは効かないため、フル対応なら上記3ホストを推奨。

## お問い合わせ(contact.html)について
- 連絡先: ssuzuki240405+moshimo@gmail.com(Gmailエイリアス。security.txt にも設定済み)
- Gmail側で「To: +moshimo」でフィルタを作ると、サイト宛メールを自動でラベル分けできます
- サフィックスを変えたい場合: generator/pages_a.py のCONTACT_JS内 '+moshimo' と build.py のsecurity.txt行の2箇所
- スパム収集ボット対策として、アドレスはHTMLに平文で書かず contact.js が組み立てて表示します
- もし迷惑メールが増えてきたら: ①問い合わせ専用のGmailエイリアス(例: +contact付き)に変える
  ②Netlifyで公開しているならNetlify Forms(無料枠あり)のフォームに置き換える、が定番の対処です

## 公開後にやること
1. https://securityheaders.com / Mozilla Observatory で採点確認(A+想定)
2. (任意)Google Fontsの自己ホスト化で外部接続ゼロに

## 記事のファクトチェック方針
本文の数値・年代・固有名詞は一次情報で確認し、各記事末尾の「出典・参考」に確認元URLを掲載しています。
シミュレーション数値は簡略化した概算モデルであり、その旨を全ページのフッターに明記しています。

## 計算モデル(引き継ぎ書準拠+重力軸)
- 気温 = 255/√(距離AU) + 33×(有効大気)^0.604 − 273
- 有効大気 = 大気の濃さ × min(1, 重力^2.2)
- 検算: 金星プリセット→462℃(実際464℃)、火星プリセット→−66℃(実際−63℃)
