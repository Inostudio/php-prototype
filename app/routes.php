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


Route::get('/', function() {
    $url = App::getLocale() . '/';
    return Redirect::to($url);
});

Route::any('{url?}', function($url) {
    $segmentLang = Request::segment(1);
    $url = App::getLocale() . '/' . $url;
    if(!($segmentLang === "ru" || $segmentLang === "en"))
        return Redirect::to($url);
})->where(['url' => '^((?!ru|en).)[-a-z0-9/]+']);



Route::group(['prefix' => '{lang}', 'before' => 'localization'], function() {

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
            'getShow' => 'front.profile'
        ]);

        Route::resource('entity', 'EntityController', [
            'names' => [
                'create' => 'front.entity.create',
                'index' => 'front.entity.index',
                'show' => 'front.entity.show'
            ]
        ]);

        /*Route::resource('articles', 'ArticlesController', [
            'names' => [
                //'create' => 'front.articles.create',
                'index' => 'front.articles.index',
                //'show' => 'front.articles.show',
                //'destroy' => 'front.articles.destroy',
                //'update' => 'front.articles.update',
                //'edit' => 'front.articles.edit',
                //'store' => 'front.articles.store'
            ]
        ]);*/
        Route::controller('page', 'PagesController', [
            'showPage' => 'front.page'
        ]);
        
        //Articles
        Route::controller('articles', 'ArticlesController', [
            'getIndex' => 'front.articles'
        ]);
//        Route::controller('articles', 'ArticlesController');
        
        //Route for static pages
        Route::get('{namePage}', ['as' => 'front.static','uses' => 'PagesController@showPage'])->where(['namePage' => '[-a-z0-9/]+']);
   });   
});
