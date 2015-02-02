<?php
/**
 * Created by PhpStorm.
 * User: nikolay
 * Date: 1/28/15
 * Time: 6:26 PM
 */

class Email extends \Eloquent {

    protected $table = 'email_change';

    static public function change($credentials){
        $token = csrf_token();

        self::removeEmail($token, $credentials['old_email']);

        $email = new Email;
        $email->email = $credentials['old_email'];
        $email->new_email = $credentials['new_email'];
        $email->token = $token;
        $email->save();

        Mail::send(Config::get('auth.email_change.change'), array('token' => $token), function($message) use ($email)
        {
            $message->to($email->email, 'John Smith')->subject('Change email!');
        });

        return true;
    }

    static private function removeEmail($token, $email)
    {
        Email::where('token', $token)->delete();
        Email::where('email', $email)->delete();
    }

    public function setUpdatedAtAttribute($value)
    {
        // Do nothing.
    }

}