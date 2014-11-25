<?php


class UsersService
{
    /**
     *
     * @var PermissionsService 
     */
    protected $ps = null;


    public function __construct(PermissionsService $ps) {        
        $this->ps = $ps;
    }
    
    
    /**
     * Register user
     * 
     * @param string $email
     * @param string $password
     * @return \User
     */
    public function registerUser($email, $password)
    {
        $user = new User;
        $user->email = $email;
        $user->password = Hash::make($password);
        
        $user->save();

        $userProfile = new UserProfile;
        $userProfile->user_id = $user->id;
        $userProfile->save();

        //$this->ps->addToGroup();
        return $user;
    }
    
    /**
     *
     * Check exist user
     *
     * @param string @email
     * @return bool
    */

    public function existUser($email)
    {
        return isset(User::where('email', '=', $email)->first()->email);
    }
}