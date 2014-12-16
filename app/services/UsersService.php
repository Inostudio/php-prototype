<?php


class UsersService
{

    protected $ps = null;


    public function __construct(PermissionsService $ps) {        
        $this->ps = $ps;
    }
    
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
    
    public function countUsers() {
        return User::all()->count();
    }
    
    public function removeUser($id){
        User::destroy($id);
                 
        return;
    }
    
    public function editUser($id, $email){
        $user = User::find($id);
        $user->email = $email;
        $user->save();
    } 
    
    public function groupsToUser($id){
        
        return User::where('id', '=', $id)->with('groups')->get();
    }
    
    public function groupAccept($groupId, $userId, $accept){
        if($accept){
            UserToGroups::destroy(UserToGroups::where('user_id', '=', $userId)->where('group_id', '=', $groupId)->first()->id);
        }else {
            $userToGroup = new UserToGroups();
            $userToGroup->user_id = $userId;
            $userToGroup->group_id = $groupId;
            $userToGroup->save();
        }
    }
    
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
    
}