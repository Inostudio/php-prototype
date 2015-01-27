<?php

class Category extends \Eloquent
{    
    const STATUS_PUBLISH = 1;
    const STATUS_UNPUBLISH = 2;
    
    public $timestamps = false;

    protected $fillable = [];
    
    public function articles()
    {
        return $this->belongsTo('Article');
    }
}
