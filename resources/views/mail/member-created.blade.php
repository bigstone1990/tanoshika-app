<x-mail::message>
# {{ $member->name }} 様

{{ config('app.name') }} のメンバーに登録されました

ログインメールアドレスと初期パスワードは次のとおりです

ログインメールアドレス<br>
{{ $member->email }}

初期パスワード<br>
{{ $password }}

ログイン後、個人設定のページでパスワードを変更してください

次のボタンからログイン画面にアクセスすることができます

<x-mail::button :url="config('app.url') . '/member/login'">
ログイン
</x-mail::button>

もしボタンがクリックできない場合には次のURLをクリックしてログイン画面にアクセスしてください<br>
<a href="{{ config('app.url') . '/member/login' }}">{{ config('app.url') . '/member/login' }}</a>
</x-mail::message>
