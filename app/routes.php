<?php

Blade::setContentTags('<%', '%>'); 		// for variables and all things Blade
Blade::setEscapedContentTags('<%%', '%%>'); 	// for escaped data

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

Route::group(['namespace' => 'Admin', 'prefix' => 'adm'], function(){

    Route::group(['before' => 'auth.admin'], function(){

        Route::get('/', ['as' => 'admin.dashboard', 'uses' => 'DashboardController@getIndex']);

    });

    Route::controller('auth', 'AuthController', [
        'getSignin' => 'admin.signin',
        'getLogout' => 'admin.logout'
    ]);

    Route::post('/groupInfo', ['uses' => 'DashboardController@postGroup']);
    Route::post('/addGroup', ['uses' => 'DashboardController@postAddGroup']);
    Route::post('/removeGroup', ['uses' => 'DashboardController@postRemoveGroup']);
    Route::post('/editGroup', ['uses' => 'DashboardController@postEditGroup']);

    Route::post('/permissionInfo', ['uses' => 'DashboardController@postPermission']);
    Route::post('/addPermission', ['uses' => 'DashboardController@postAddPermission']);
    Route::post('/removePermission', ['uses' => 'DashboardController@postRemovePermission']);
    Route::post('/editPermission', ['uses' => 'DashboardController@postEditPermission']);

    Route::post('/groupOptions', ['uses' => 'DashboardController@postGroupOptions']);
    Route::post('/changePermissionsInGroup', ['uses' => 'DashboardController@postChangePermissionsInGroup']);


    Route::post('/users', ['uses' => 'DashboardController@postUsers']);
    Route::post('/addUsers', ['uses' => 'DashboardController@postAddUser']);
    Route::post('/removeUser', ['uses' => 'DashboardController@postRemoveUser']);
    Route::post('/editUser', ['uses' => 'DashboardController@postEditUser']);
    Route::post('/userOptions', ['uses' => 'DashboardController@postUserOptions']);
    Route::post('/changeGroupByUser', ['uses' => 'DashboardController@postChangeGroupByUser']);


    Route::controller('page', 'StaticPageController');//, [
    /*'names' => [
        'postAllPages' => 'front.articles.create',
        'postGetPage' => 'front.articles.index',
        'postDeletePage' => 'front.articles.show',
        'postAddPage' => 'front.articles.destroy',
        'postSavePage' => 'front.articles.update',
        'postAllStatuses' => 'front.articles.edit',
        'store' => 'front.articles.store'
    ]
]);*/

    /*Route::get('/{controller?}/{action?}', function($controller, $action){
        $controller = ucfirst($controller);
        return App::make("{$controller}Controller")->$action();
    });*/
});

Route::get('/angular/', ['uses' => 'AngularController@serve']);

Route::group(['namespace' => 'Front'], function(){

    Route::get('/', ['as' => 'front.home', 'uses' => 'PagesController@home']);
    Route::get('/contact', ['as' => 'front.contact', 'uses' => 'PagesController@contact']);

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