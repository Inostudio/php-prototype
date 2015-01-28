<?php

namespace Front;

use \Auth;
use \Response;
use \View;
use \Input;
use \Validator;
use Gaufrette\File;
use Gaufrette\Filesystem;
use Gaufrette\Adapter\Local as LocalAdapter;

/**
 * Class ProfileController
 * @package Front
 */
class ProfileController extends \BaseController
{
    /**
     *
     * @var \UsersService
     */
    protected $users = null;
    /**
     * @var null|\UploadFileService
     */
    protected $uploadService = null;

    /**
     * @param \UsersService $us
     * @param \UploadFileService $ups
     */
    public function __construct(\UsersService $us, \UploadFileService $ups)
    {
        $this->users = $us;
        $this->uploadService = $ups;
    }

    /**
     * @var array
     */
    protected static $changePasswordValidation = [
        'old_password' => 'required|alpha_num',
        'new_password' => 'required|alpha_num|between:4,18|confirmed',
        'new_password_confirmation' => 'required|alpha_num|between:4,18'
    ];

    /**
     * @var array
     */
    protected static $changeProfileValidation = [
        'first_name' => 'required|alpha_num|between:2,32',
        'last_name' => 'required|alpha_num|between:2,32',
        'phone' => 'required'
    ];

    /**
     * @var array
     */
    protected static $changeEmailValidation = [
        'old_email' => 'required|email|exists:users,email',
        'new_email' => 'required|email|unique:users,email',
        'password' => 'required|alpha_num|between:4,18'
    ];

    /**
     * Show layout profile page
     *
     * @return \Illuminate\View\View
     */
    public function getShow()
    {
        return View::make('front.pages.profile');
    }

    /**
     * Handle signin form
     *
     * @return \Illuminate\Http\Response
     */
    public function postProfileData()
    {
        return Response::json([]);
    }

    /**
     * Change user's profile data
     *
     * @return \Illuminate\Http\Response
     */
    public function postChangeProfile()
    {
        $response = [true, trans('front/profile/profile.message_change_success')];

        $v = Validator::make(Input::all(), self::$changeProfileValidation);

        if($v->fails()){
            $response = [
                false,
                trans('front/profile/profile.message_data_invalid')
            ];
        } else {
            $this->users->changeProfile(Auth::user()->id, Input::all());
        }

        return Response::json($response);
    }


    /**
     * Change user's password
     *
     * @return \Illuminate\Http\Response
     */
    public function postChangePassword()
    {
        $response = [true, trans('front/profile/profile.message_change_success')];

        $v = Validator::make(Input::all(), self::$changePasswordValidation);

        if($v->fails()){
            $response = [
                false,
                trans('front/profile/change_password.message_data_invalid')
            ];
        } else if (!\Hash::check(Input::get('old_password'), Auth::user()->password)) {
            $response = [
                false,
                trans('front/profile/change_password.message_old_password_wrong')
            ];
        } else {
            $this->users->changePassword(Auth::user()->id, Input::get('new_password'));
        }

        return Response::json($response);
    }

    /**
     * Change user's email
     *
     * @return \Illuminate\Http\Response
     */
    public function postChangeEmail()
    {
        $response = [true, trans('front/profile/profile.message_change_success')];

        $v = Validator::make(Input::all(), self::$changeEmailValidation);

        if($v->fails()){
            $response = [
                false,
                $v->messages()
            ];
        } else if (!\Hash::check(Input::get('password'), Auth::user()->password)) {
            $response = [
                false,
                ["password" => [trans('front/profile/change_email.message_password_wrong')]]
            ];
        } else {
            $credentials = Input::only(
                'old_email', 'new_email'
            );
            //Send email
            \Email::change($credentials);
            return [true, trans('front/profile/change_email.message_change_success_send')];
            $this->users->changePassword(Auth::user()->id, Input::get('new_password'));
        }

        return Response::json($response);
    }

    public function getChangeEmailConfirmation()
    {

    }


    /**
     * @return mixed
     */
    public function postUploadImage()
    {
        $response = [
            $this->uploadService->uploadImage(
                Input::get('sourceImage'),
                'FullImage.jpeg',
                'public/users/'. Auth::user()->id . '/',
                'jpeg'
            ),
            trans('front/profile/profile.message_upload_success')
        ];
        return Response::json($response);
    }

    /**
     * @return mixed
     */
    public function postUploadCropped()
    {
        $response = [
            $this->uploadService->uploadImage(
                Input::get('croppedImage'),
                'CroppedImage.jpeg',
                'public/users/'. Auth::user()->id . '/',
                'jpeg'
            ),
            trans('front/profile/profile.message_select_thumbnail_success')
        ];
        return Response::json($response);
    }
}