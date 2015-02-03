<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="utf-8">
	</head>
	<body>
	@if(App::getLocale() === 'en')
		<h2>Password Reset</h2>

		<div>
			To reset your password, complete this form: <% URL::to('password/reset', array($token)) %>.<br/>
			This link will expire in <% Config::get('auth.reminder.expire', 60) %> minutes.
		</div>

	@else

		<h2>Сброс пароля</h2>

		<div>
			Чтобы завершить сброс пароля, заполните форму: <% URL::to('password/reset', array($token)) %>.<br/>
			Эта ссылка будет действительна в течении <% Config::get('auth.reminder.expire', 60) %> минут.
		</div>
	@endif
	</body>
</html>
