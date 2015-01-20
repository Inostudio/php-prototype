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

/*
Route::get('/{any}', function()
{
    $params = Route::getCurrentRoute()->parameters();
    $lang =  App::getLocale();
    if($params != $lang){
        header('Refresh: 0; URL=/'.$lang.'/'.$params['any']);
    }
});
*/
Route::group(['prefix' => '{lang?}', 'before' => 'localization'], function() {
    Route::get('/angular/', ['uses' => 'AngularController@serve']);
    Route::group(['namespace' => 'Admin', 'prefix' => 'adm'], function () {
        
        Route::group(['before' => 'auth.admin'], function () {
            Route::get('/', ['as' => 'admin.dashboard', 'uses' => 'DashboardController@getIndex']);
            Route::controller('group', 'GroupController');
            Route::controller('permission', 'PermissionController');
            Route::controller('user', 'UserController');
            Route::controller('resource', 'ResourceController');
            Route::controller('page', 'StaticPageController');
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
       Route::resource('articles', 'ArticlesController', [
           'names' => [
               'create' => 'front.articles.create',
               'index' => 'front.articles.index',
               'show' => 'front.articles.show',
               'destroy' => 'front.articles.destroy',
               'update' => 'front.articles.update',
               'edit' => 'front.articles.edit',
               'store' => 'front.articles.store'
           ]
       ]);
       Route::controller('page', 'PagesController', [
           'showPage' => 'front.page'
       ]);
       //Route for static pages
       Route::get('/{namePage}', 'PagesController@showPage');
   });   
});
