<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class PermissionToGroups extends Eloquent {

    use SoftDeletingTrait;

    protected $dates = ['deleted_at'];

    protected $table = 'group_permission';
}
