<?php

namespace Admin;

//use \Response;
use Illuminate\Support\Facades\Input;
use Symfony\Component\HttpFoundation\Response;

class DashboardController extends \BaseController
{
    public function __construct()
    {

    }
    
    public function getIndex()
    {
        return \View::make('admin.layout');
    }


}