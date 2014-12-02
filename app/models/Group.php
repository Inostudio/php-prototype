<?php

class Group extends Eloquent {

    protected $table = 'groups'; //Таблица, используемая моделью
    
    protected $guarded = array('id');   //Убирает массовое назначение id
    
    public function permissions() {
        return $this->belongsToMany('Permission');
    }
    
    public function users() {   //Многие ко многим
        return $this->belongsToMany('User');
    }
}
