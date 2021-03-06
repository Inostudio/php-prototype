<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;
use SammyK\LaravelFacebookSdk\FacebookableTrait;
use Illuminate\Database\Eloquent\SoftDeletingTrait;

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
    use FacebookableTrait;
    use SoftDeletingTrait;


    protected $dates = ['deleted_at'];
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
	protected $hidden = array('password', 'remember_token', 'access_token');
    
    protected $fillable = array('email', 'password');

    protected static $facebook_field_aliases = [
        'id' => 'facebook_user_id',
        'email' => 'email'
    ];

    public function IsAdmin() {
        return $this->groups()->where('isAdmin', 1)->first() ? true : false;
    }

    public function getFullName()
    {
        return $this->profile->first_name . " " . $this->profile->last_name;
    }

    public function getCroppedPhoto()
    {
        $path = 'users/' . $this->id . '/CroppedImage.jpeg';
        return File::exists($path) ? ('/'.$path) : '/users/NoName/Image.jpeg';
    }

    public function getPhoto()
    {
        $path = '/users/' . $this->id . '/FullImage.jpeg';
        return $path;
    }

    public function existsPhoto()
    {
        $path = 'users/' . $this->id . '/FullImage.jpeg';
        return File::exists($path);
    }

    public function profile()
    {
        return $this->hasOne('UserProfile');
    }
    
    public function groups()
    {
        return $this->belongsToMany('Group');
    }

    public function articles()
    {
        return $this->hasMany('Article');
    }
}
