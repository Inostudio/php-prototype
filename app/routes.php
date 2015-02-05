<?php
Blade::setContentTags('<%', '%>');        // for variables and all things Blade
Blade::setEscapedContentTags('<%%', '%%>');    // for escaped data
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


Route::group(array(
    'domain' => '{lang}.php-prototype.com',
    'before' => 'localization'), function()
{
    Route::get('/angular/', ['uses' => 'AngularController@serve']);

    Route::group(['namespace' => 'Admin', 'prefix' => 'adm'], function () {

        Route::group(['before' => 'auth.admin'], function () {
            Route::get('/', ['as' => 'admin.dashboard', 'uses' => 'DashboardController@getIndex']);
            Route::controller('group', 'GroupController');
            Route::controller('permission', 'PermissionController');
            Route::controller('user', 'UserController');
            Route::controller('resource', 'ResourceController');
            Route::controller('page', 'StaticPageController');
            Route::controller('article', 'ArticleController');
            Route::controller('dashboard', 'DashboardController');
        });



        Route::controller('auth', 'AuthController', [
            'getSignin' => 'admin.signin',
            'getLogout' => 'admin.logout'
        ]);

    });

    Route::group(['namespace' => 'Front'], function () {

        Route::controller('search', 'SearchController', [
            'postIndex' => 'front.search'
        ]);

        //Login in Facebook
        Route::controller('facebook', 'FacebookController');

        Route::get('/', ['as' => 'front.home', 'uses' => 'PagesController@home']);
        Route::get('/contact', ['as' => 'front.contact', 'uses' => 'PagesController@contact']);
        Route::get('/about', ['as' => 'front.about', 'uses' => 'PagesController@about']);
        Route::post('/checklang', ['uses' => 'LanguageController@postCheckLang']);
        //

        Route::controller('password', 'RemindersController', [
            'getRemind' => 'front.remind',
            'postRemind' => 'front.remind.post',
            'getReset' => 'front.reset',
            'postReset' => 'front.reset.post'
        ]);

        Route::controller('auth', 'AuthController', [
            'getSignin' => 'front.signin',
            'getSignup' => 'front.signup',
            'getLogout' => 'front.logout'
        ]);

        Route::controller('profile', 'ProfileController', [
            'getShow' => 'front.profile',
            'getUser' => 'front.profile.user',
            'getChangeEmailConfirmation' => 'emails.change.reminder'
        ]);

        Route::resource('entity', 'EntityController', [
            'names' => [
                'create' => 'front.entity.create',
                'index' => 'front.entity.index',
                'show' => 'front.entity.show'
            ]
        ]);

        Route::controller('page', 'PagesController', [
            'showPage' => 'front.page',
            'postSendContact' => 'front.contact.send'
        ]);

        //Articles
        Route::controller('articles', 'ArticlesController', [
            'getIndex' => 'front.articles'
        ]);

        //Route for static pages
        Route::get('{namePage}', ['as' => 'front.static','uses' => 'PagesController@showPage'])->where(['namePage' => '[-a-z0-9/]+']);
    });
});

Route::group(array('domain' => 'php-prototype.com'), function()
{
    Route::any('{url?}', function($url) {
        $redirectUrl = 'http://' . Config::get('app.locale'). '.' . 'php-prototype.com' . ($url === '/' ? $url : '/' . $url);
        return Redirect::to($redirectUrl);
    })->where(['url' => '[-a-z0-9/]+']);
});