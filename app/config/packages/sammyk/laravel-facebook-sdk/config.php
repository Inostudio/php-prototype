<?php

return [

    /*
     * In order to integrate the Facebook SDK into your site,
     * you'll need to create an app on Facebook and enter the
     * app's ID and secret here.
     *
     * Add an app: https://developers.facebook.com/apps
     */
    'app_id' => '403271526488273',
    'app_secret' => '20e941f95d69b64641f46e3fea2d08eb',

    /*
     * The default list of permissions that are
     * requested when authenticating a new user with your app.
     * The fewer, the better! Leaving this empty is the best.
     * You can overwrite this when creating the login link.
     *
     * Example:
     *
     * 'default_scope' => ['email', 'user_birthday'],
     *
     * For a full list of permissions see:
     *
     * https://developers.facebook.com/docs/facebook-login/permissions
     */
    'default_scope' => ['email'],

    /*
     * The default endpoint that Facebook will redirect to after
     * an authentication attempt.
     */
    'default_redirect_uri' => '/en/facebook/login',

    /*
     * For a full list of locales supported by Facebook visit:
     *
     * https://www.facebook.com/translations/FacebookLocales.xml
     */
    'locale' => 'en_US',

    /*
     * Allows you to customize the channel endpoint. Most
     * configurations won't need to change this but if you do,
     * and you're using the JavaScript SDK, make sure you also
     * update the "channelUrl" option in "FB.init()".
     *
     * https://developers.facebook.com/blog/post/2011/08/02/how-to--optimize-social-plugin-performance/
     */
    'channel_endpoint' => '/channel.html',

    ];
