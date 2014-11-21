<?php

class Group extends Eloquent {

    protected $table = 'groups'; //Таблица, используемая моделью
    
    protected $guarded = array('id');   //Убирает массовое назначение id
}
