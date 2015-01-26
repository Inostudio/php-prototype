<?php

class Article extends \Eloquent
{
    const STATUS_DRAFT = 1;
    const STATUS_PUBLISH = 2;
    const STATUS_DELETED = 3;
    
    protected static $orderOptions = [
        'recently' => 'Recently created',
        'later' => 'Later created',
        'most_viewed' => 'Most viewed first',
        'less_viewed' => 'Less viewed first'
    ];
    
    public static function getOrderOptions()
    {
        return self::$orderOptions;
    }
    
    public function user()
    {
        return $this->belongsTo('User');
    }
    
    public function category()
    {
        return $this->belongsTo('Category');
    }
    
    protected $fillable = [];
}