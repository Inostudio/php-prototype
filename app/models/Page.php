<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Page extends \Eloquent {

    use SoftDeletingTrait;

    protected $dates = ['deleted_at'];

    protected $table = 'pages';

	protected $fillable = [];

    public function status()
    {
        return $this->hasOne('Status');
    }
}