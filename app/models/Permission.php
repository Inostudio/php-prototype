<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Permission extends Eloquent {

    //use UserTrait, RemindableTrait;
    use SoftDeletingTrait;


    protected $dates = ['deleted_at'];

    protected $table = 'permissions'; //Таблица, используемая моделью
    
    protected $guarded = array('id');   //Убирает массовое назначение id
    
    public function groups() {
        return $this->belongsToMany('Group');
    }
    
    public function users() {
        return $this->belongsToMany('User');
    }
}
