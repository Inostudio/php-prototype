<?php

class UserBans extends Eloquent {
    
    protected $table = 'users_bans'; 
    
    protected $guarded = array('id'); 
    
    protected $softDelete = true;
}
