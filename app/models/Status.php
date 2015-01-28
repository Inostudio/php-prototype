<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Status extends \Eloquent {
    use SoftDeletingTrait;

    protected $dates = ['deleted_at'];

    protected $table = 'statuses';
}