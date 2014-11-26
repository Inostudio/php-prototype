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
     * @param string $email
     * @return bool
    */

    public function existUser($email)
    {
        return isset(User::where('email', '=', $email)->first()->email);
    }

    /**
     *
     * Change user's password
     *
     * @param integer $idUser
     * @param string $password
     * @return void
     */

    public function changePassword($idUser, $password)
    {
        $user = User::find($idUser);
        $user->password = Hash::make($password);
        $user->save();
    }

    public function changeProfile($idUser, $data)
    {
        $user = User::find($idUser);

        $user->profile->first_name = $data['first_name'];
        $user->profile->last_name = $data['last_name'];
        $user->profile->phone = $data['phone'];

        $user->save();
    }
}