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
        $this->beforeFilter('auth');
        $this->users = $us;
        $this->uploadService = $ups;
    }

    /**
     * @var array
     */
    protected static $changePasswordValidation = [
        'old_password' => 'required|alpha_num',
        'new_password' => 'required|alpha_num|between:6,18|confirmed',
        'new_password_confirmation' => 'required|alpha_num|between:6,18'
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
        'password' => 'required|alpha_num|between:6,18'
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
        if(\App::getLocale() == 'ru') {
            $v->setAttributeNames([
                'old_password' => 'Старый пароль',
                'new_password' => 'Новый пароль',
                'new_password_confirmation' => 'Подтверждение пароля'
            ]);
        }

        if($v->fails()){
            $response = [
                false,
                $v->messages()
            ];
        } else if (!\Hash::check(Input::get('old_password'), Auth::user()->password)) {
            $response = [
                false,
                ["error" => trans('front/profile/change_password.message_old_password_wrong')]
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
        //return Response::json([1]);
        $response = [true, trans('front/profile/profile.message_change_success')];

        $v = Validator::make(Input::all(), self::$changeEmailValidation);
        if(\App::getLocale() == 'ru') {
            $v->setAttributeNames([
                'old_email' => 'Старый e-mail',
                'new_email' => 'E-mail',
                'password' => 'Пароль'
            ]);
        }

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
        }

        return Response::json($response);
    }

    public function getChangeEmailConfirmation($lang, $token)
    {

        $response = [false, ''];
        $email = \Email::where('token', $token)->first();

        if($email) {
            //check expire
            $created_at = $email->created_at;
            $now = \Carbon\Carbon::now();
            $max_diff = \Config::get('auth.email_change.expire') * 60;


            if($max_diff > $now->diffInSeconds($created_at)) {
                $user = \User::where('email', $email->email)->first();

                $new_email_exists = \User::where('email', $email->new_email)->first();

                if(!$new_email_exists && $user) {

                    $user->email = $email->new_email;
                    $response[0] = $user->save();
                    $response[1] = trans('front/profile/change_email.message_change_success_done');

                    \DB::table('email_change')->where('token', $token)->delete();
                } else {
                    \DB::table('email_change')->where('token', $token)->delete();
                    $response[1] = trans('front/profile/change_email.message_change_email_is_busy');
                }

                return View::make('front.pages.static', ['response' => $response]);
            } else {
                \DB::table('email_change')->where('token', $token)->delete();
                throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
            }


        } else {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
        }

        //return Response::json($response);
        //return dd($token, $email->new_email);
    }

    public function postUser(){
        $id = Input::get('id');
        if($id != NULL) {
            $user = \User::find($id);
            if($user) {
                $user = \User::with('profile', 'groups', 'articles.category', 'articles.user')->find($id);
                //return $user;
                return Response::json([$user, $user->getCroppedPhoto()]);
            } else {
                return Response::json([0, 'The user has not found']);
            }

        }

    }


    /**
     * @return mixed
     */
    public function postDeleteImage()
    {
        $result = $this->users->deleteAvatar();
        $response = [
            $result,
            Auth::user()->getCroppedPhoto(),
            $result ? trans('front/profile/profile.message_image_deleted') : trans('front/profile/profile.message_image_not_deleted')
        ];
        return Response::json($response);
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