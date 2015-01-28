<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 21.11.2014
 * Time: 15:53
 */

use SammyK\LaravelFacebookSdk\FacebookableTrait;
use Illuminate\Database\Eloquent\SoftDeletingTrait;

class UserProfile extends Eloquent {
    use FacebookableTrait;
    use SoftDeletingTrait;

    protected $dates = ['deleted_at'];

    protected $table = 'user_profile';

    protected $hidden = ['access_token'];

    protected static $facebook_field_aliases = [
        'id' => 'facebook_user_id',
        'last_name' => 'last_name',
        'first_name' => 'first_name'
    ];
    
    public function user()
    {
        return $this->belongsTo('User');
    }

} 