<% Session::get('error') %>
<% Session::get('status') %>
<form action="<% action('front.remind.post', ['lang' => 'en']) %>" method="POST">
    <input type="email" name="email">
    <input type="submit" value="Send Reminder">
</form>