<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Change email</h2>

<div>
    Для смены емаила передейдите по ссылке: <% URL::to('profile/change-email-confirmation', array($token)) %>.<br/>
    This link will expire in <% Config::get('auth.email_change.expire', 60) %> minutes.
</div>
</body>
</html>
