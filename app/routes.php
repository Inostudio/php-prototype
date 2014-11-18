<?php

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

Route::group(['namespace' => 'Front'], function(){
    
    Route::get('/', ['as' => 'front.home', 'uses' => 'PagesController@home']);
    Route::get('/about', ['as' => 'front.about', 'uses' => 'PagesController@about']);
    Route::get('/contact', ['as' => 'front.contact', 'uses' => 'PagesController@contact']);
    
    Route::controller('auth', 'AuthController', [
        'getSignin' => 'front.signin',
        'getSignup' => 'front.signup',
        'getLogout' => 'front.logout'
    ]);
    
});



Route::group(['namespace' => 'Admin', 'prefix' => 'adm'], function(){

    Route::group(['before' => 'auth.admin'], function(){
        
        Route::get('/', ['as' => 'admin.dashboard', 'uses' => 'DashboardController@getIndex']);
        
    });
            
    Route::controller('auth', 'AuthController', [
        'getSignin' => 'admin.signin',
        'getLogout' => 'admin.logout'
    ]);
});

Route::get('/test', function(){
    
    echo action('admin.signin');
    
});