<?php

class Section extends Eloquent {

    protected $table = 'sections'; //Таблица, используемая моделью
    
    protected $guarded = array('id');   //Убирает массовое назначение id
    
}
