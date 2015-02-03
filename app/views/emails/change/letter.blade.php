<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
    @if(App::getLocale() == 'ru')
        <h2>Подтверждение смены емаила</h2>

        <div>
            Для смены емаила перейдите по ссылке: <% URL::to('profile/change-email-confirmation', array($token)) %>.<br/>
            Эта сслыка будет действительна в течении <% Config::get('auth.email_change.expire', 60) %> минут.
        </div>
    @else
        <h2>Confirmation email change</h2>

        <div>
            To change the email please go to: <% URL::to('profile/change-email-confirmation', array($token)) %>.<br/>
            This link will expire in <% Config::get('auth.email_change.expire', 60) %> minutes.
        </div>
    @endif

</body>
</html>
