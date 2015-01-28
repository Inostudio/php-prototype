<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Group extends Eloquent {

    use SoftDeletingTrait;

    protected $dates = ['deleted_at'];

    protected $table = 'groups'; //Таблица, используемая моделью
    
    protected $guarded = array('id');   //Убирает массовое назначение id
    
    public function permissions() {
        return $this->belongsToMany('Permission');
    }
    
    public function users() {   //Многие ко многим
        return $this->belongsToMany('User');
    }
}
