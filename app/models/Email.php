<?php
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 1/28/15
 * Time: 6:26 PM
 */

class Email extends \Eloquent {

    protected $table = 'email_change';

    public $timestamps = false;

    static public function change($credentials){
        $token = csrf_token();

        $email = new Email;
        $email->email = $credentials['old_email'];
        $email->new_email = $credentials['new_email'];
        $email->token = $token;
        $email->save();

        View::make(Config::get('auth.email_change.change'), ['token' => $token]);

        return true;
    }

}