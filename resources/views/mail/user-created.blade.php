<x-mail::message>
# {{ $user->name }} 様

{{ config('app.name') }} の事業所に登録されました

ログインメールアドレスと初期パスワードは次のとおりです

ログインメールアドレス<br>
{{ $user->email }}

初期パスワード<br>
{{ $password }}

ログイン後、個人設定のページでパスワードを変更してください

次のボタンからログイン画面にアクセスすることができます

<x-mail::button :url="config('app.url') . '/user/login'">
ログイン
</x-mail::button>

もしボタンがクリックできない場合には次のURLをクリックしてログイン画面にアクセスしてください<br>
<a href="{{ config('app.url') . '/user/login' }}">{{ config('app.url') . '/user/login' }}</a>
</x-mail::message>
