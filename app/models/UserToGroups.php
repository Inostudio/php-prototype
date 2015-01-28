<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class UserToGroups extends Eloquent {

    use SoftDeletingTrait;

    protected $dates = ['deleted_at'];

    protected $table = 'group_user';
}
