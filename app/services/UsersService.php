<?php


/**
 * Class UsersService
 */
class UsersService
{

    /**
     * @var null|PermissionsService
     */
    protected $ps = null;


    /**
     * @param PermissionsService $ps
     */
    public function __construct(PermissionsService $ps) {
        $this->ps = $ps;
    }

    public function facebookUser($facebook_user, $facebook_user_profile){
        // Create the user if not exists or update existing
        $user = User::createOrUpdateFacebookObject($facebook_user);

        $userProfile = UserProfile::where('facebook_user_id', $facebook_user['id'])->first();

        if($userProfile === NULL) {
            UserProfile::createOrUpdateFacebookObject($facebook_user_profile);

            $user = User::where('facebook_user_id', $facebook_user['id'])->first();
            $userProfile = UserProfile::where('facebook_user_id', $facebook_user['id'])->first();

            $userProfile->user_id = $user->id;
            $userProfile->save();
        }


        return $user;
    }
    
    /**
     * @param $email
     * @param $password
     * @return User
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
     * @param $email
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

    /**
     * @param $idUser
     * @param $data
     */
    public function changeProfile($idUser, $data)
    {
        $user = User::find($idUser);
        $user->profile->first_name = $data['first_name'];
        $user->profile->last_name = $data['last_name'];
        $user->profile->phone = $data['phone'];

        $user->profile->save();
    }

    /**
     * @param $offset
     * @param $limit
     * @param $direction
     * @param $field
     * @return mixed
     */
    public function getPageOfUsers($offset, $limit, $direction, $field) {
        
        if(($field == 'first_name') || ($field == 'last_name')) {
            ///Сортировка по Имени, фамилии и телефону
      
            return User::join('user_profile as pr', 'users.id', '=', 'pr.user_id')
                    ->orderBy('pr.'.$field, $direction)
                    ->skip($offset)->take($limit)
                    ->select('users.*')
                    ->with('profile')
                    ->get();       
        } else {
            $users = User::with('profile');
            return $users->skip($offset)->take($limit)->orderBy($field, $direction)->get();
        }
    }

    /**
     * @return mixed
     */
    public function countUsers() {
        return User::all()->count();
    }

    /**
     * @param $id
     */
    public function removeUser($id){
        User::destroy($id);
                 
        return;
    }

    /**
     * @param $id
     * @param $email
     */
    public function editUser($id, $email){
        $user = User::find($id);
        $user->email = $email;
        $user->save();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function groupsToUser($id){
        
        return User::where('id', '=', $id)->with('groups')->get();
    }

    /**
     * @param $groupId
     * @param $userId
     * @param $accept
     */
    public function groupAccept($groupId, $userId, $accept){
        $groupAdm = null;
        if($accept){
            $groupAdm = Group::where('id', '=', $groupId)->first()->isAdmin;
            if($groupAdm){
               $countAdmins = UserToGroups::where('group_id', '=', $groupId)->count();
               if($countAdmins == 1){
                   return [false, trans('validation.remove_all_admins')];
               }
            }
            UserToGroups::destroy(UserToGroups::where('user_id', '=', $userId)->where('group_id', '=', $groupId)->first()->id);
            
        }else {
            $userToGroup = new UserToGroups();
            $userToGroup->user_id = $userId;
            $userToGroup->group_id = $groupId;
            $userToGroup->save();
        }
        return [true, $groupAdm];
    }

    /**
     * @param $text
     * @param $limit
     * @param $offset
     * @param $direction
     * @param $field
     * @return array
     */
    public function searchUsers($text, $limit, $offset, $direction, $field){

        if(($field === 'first_name') || ($field === 'last_name')) {
            $users = User::whereHas('profile', function($query) use($text){
                $query->where('last_name', 'like', '%'.$text.'%');
            })->orWhereHas('profile', function($query) use($text){
                $query->where('first_name', 'like', '%'.$text.'%');
            })->orWhereHas('profile', function($query) use($text){
                $query->where('phone', 'like', '%'.$text.'%');
            })
                ->orWhere('email', 'like', '%'.$text.'%')
                ->orWhere('users.id', 'like', '%'.$text.'%');
            
            $users1 = $users->count();
            
           $users = $users->join('user_profile as pr', 'users.id', '=', 'pr.user_id')
                ->orderBy('pr.'.$field, $direction)
                ->skip($offset)->take($limit)
                ->select('users.*')
                ->with('profile')
                ->get();
            
            return [$users, $users1];
        } else {
            $users = User::whereHas('profile', function($query) use($text){
            $query->where('last_name', 'like', '%'.$text.'%');
            })->orWhereHas('profile', function($query) use($text){
                $query->where('first_name', 'like', '%'.$text.'%');
            })->orWhereHas('profile', function($query) use($text){
                $query->where('phone', 'like', '%'.$text.'%');
            })
                    ->orWhere('email', 'like', '%'.$text.'%')
                    ->orWhere('id', 'like', '%'.$text.'%')
                    ->with('profile');
            $users1 = $users->count();
            
            $users2 = $users->skip($offset)
                ->take($limit)
                ->orderBy($field, $direction)
                ->get();
            
            return [$users2, $users1];
        }
    }
    
    public function getUserBans($id){
        $bans = UserBans::where('user_id', '=', $id)->get();
        $isBaned = UserBans::where('user_id', '=', $id)->where('end', '>', date("Y-m-d H:i:s"))->first();
        
        return [($isBaned == null ? false : $isBaned), $bans];
    }
    
    public function removeBan($id){
        UserBans::destroy($id);
        return true;
    }
    
    public function addBan($userId, $endDate, $reason){
        $ban = new UserBans;
        $ban->user_id = $userId;
        $ban->begin = date("Y-m-d H:i:s");
        $ban->end = $endDate;
        $ban->reason = $reason;
        $ban->save();
        return true;
    }
}