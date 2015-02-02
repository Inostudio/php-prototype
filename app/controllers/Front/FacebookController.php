<?php
/**
 * Created by PhpStorm.
 * User: Nikolay
 * Date: 17.01.2015
 * Time: 0:52
 */

namespace Front;

use \Redirect;
use \Facebook;

class FacebookController extends \BaseController {

    /**
     *
     * @var \UsersService
     */
    protected $users = null;

    /**
     * @param \UsersService $us
     * @param \UploadFileService $ups
     */
    public function __construct(\UsersService $us)
    {
        $this->users = $us;
    }

    // Fancy wrapper for login URL
    public function getIndex()
    {
        return Redirect::to(Facebook::getLoginUrl());
    }

    // Endpoint that is redirected to after an authentication attempt
    public function getLogin()
    {
        /**
         * Obtain an access token.
         */
        try
        {
            $token = Facebook::getTokenFromRedirect();

            if ( ! $token)
            {
                return Redirect::to('/')->with('error', 'Unable to obtain access token.');
            }
        }
        catch (FacebookQueryBuilderException $e)
        {
            return Redirect::to('/')->with('error', $e->getPrevious()->getMessage());
        }

        if ( ! $token->isLongLived())
        {
            /**
             * Extend the access token.
             */
            try
            {
                $token = $token->extend();
            }
            catch (FacebookQueryBuilderException $e)
            {
                return Redirect::to('/')->with('error', $e->getPrevious()->getMessage());
            }
        }

        Facebook::setAccessToken($token);

        /**
         * Get basic info on the user from Facebook.
         */
        try
        {
            $facebook_user = Facebook::object('me')->fields('id', 'email')->get();
            $facebook_user_profile = Facebook::object('me')->fields('id','first_name', 'last_name')->get();
        }
        catch (FacebookQueryBuilderException $e)
        {
            return Redirect::to('/')->with('error', $e->getPrevious()->getMessage());
        }

        //return dd($facebook_user, $facebook_user_profile);
        $user = $this->users->facebookUser($facebook_user, $facebook_user_profile);

        // Log the user into Laravel
        Facebook::auth()->login($user);

        return Redirect::to('/')->with('message', 'Successfully logged in with Facebook');
    }

} 