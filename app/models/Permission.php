<?php

class Permission extends Eloquent {

    //use UserTrait, RemindableTrait;

    protected $table = 'permissions'; //Таблица, используемая моделью
    
    protected $guarded = array('id');   //Убирает массовое назначение id
    
    public function groups() {
        return $this->belongsToMany('Group');
    }
    
    public function users() {
        return $this->belongsToMany('User');
    }
}
