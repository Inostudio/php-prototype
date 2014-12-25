<?php

namespace Admin;

//use \Response;
use Illuminate\Support\Facades\Input;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DashboardController
 * @package Admin
 */
class DashboardController extends \BaseController
{
    /**
     *
     */
    public function __construct()
    {

    }

    /**
     * @return mixed
     */
    public function getIndex()
    {
        return \View::make('admin.layout');
    }


}