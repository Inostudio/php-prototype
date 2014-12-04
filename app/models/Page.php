<?php

class Page extends \Eloquent {

    protected $table = 'pages';

	protected $fillable = [];

    public function status()
    {
        return $this->hasOne('Status');
    }
}