<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Category extends \Eloquent
{
    use SoftDeletingTrait;

    protected $dates = ['deleted_at'];

    const STATUS_PUBLISH = 1;
    const STATUS_UNPUBLISH = 2;
    
    public $timestamps = false;

    protected $fillable = [];
    
    public function articles()
    {
        return $this->belongsTo('Article');
    }
}
