<x-mail::message>
# {{ $staff->name }} 様

{{ config('app.name') }} のスタッフに登録されました

ログインメールアドレスと初期パスワードは次のとおりです

ログインメールアドレス<br>
{{ $staff->email }}

初期パスワード<br>
{{ $password }}

ログイン後、個人設定のページでパスワードを変更してください

次のボタンからログイン画面にアクセスすることができます

<x-mail::button :url="config('app.url') . '/staff/login'">
ログイン
</x-mail::button>

もしボタンがクリックできない場合には次のURLをクリックしてログイン画面にアクセスしてください<br>
<a href="{{ config('app.url') . '/staff/login' }}">{{ config('app.url') . '/staff/login' }}</a>
</x-mail::message>
