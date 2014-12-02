<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

/**
 * User
 *
 * @property integer $id
 * @property string $email
 * @property string $password
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $remember_token
 * @method static \Illuminate\Database\Query\Builder|\User whereId($value) 
 * @method static \Illuminate\Database\Query\Builder|\User whereEmail($value) 
 * @method static \Illuminate\Database\Query\Builder|\User wherePassword($value) 
 * @method static \Illuminate\Database\Query\Builder|\User whereCreatedAt($value) 
 * @method static \Illuminate\Database\Query\Builder|\User whereUpdatedAt($value) 
 * @method static \Illuminate\Database\Query\Builder|\User whereRememberToken($value) 
 */
class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password', 'remember_token');
    
//    public static $passwordAttributes  = array('password');
    
//    public $autoHashPasswordAttributes = true;
//    
//    public $autoPurgeRedundantAttributes = true;
    
     protected $fillable = array('email', 'password');
    
//    public static $rules = array(
//        'email' => 'required|email|unique:users',
//        'password' => 'required|alpha_num|between:4,18|confirmed',
//        'password_confirmation' => 'required|alpha_num|between:4,18',
//    );

    public function getFullName()
    {
        return $this->profile->first_name . " " . $this->profile->last_name;
    }

    public function getCroppedPhoto()
    {
        $path = '/users/' . Auth::user()->id . '/CroppedImage.png';
        return File::exists('public'. $path) ? $path : 'https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=100';
    }

    public function getPhoto()
    {
        $path = '/users/' . Auth::user()->id . '/FullImage.jpg';
        return File::exists('public'. $path) ? $path : '/users/undefined/FullImage.jpg';
    }

    public function profile()
    {
        return $this->hasOne('UserProfile');
    }
    
    public function groups()
    {
        return $this->belongsToMany('Group');
    }
}
