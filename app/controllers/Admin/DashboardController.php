<?php

namespace Admin;

use \Input;
use \Response;

class DashboardController extends \BaseController
{
    
    protected $dashboard = null;
    
    public function __construct(\DashboardService $ds) {
        $this->dashboard = $ds;
    }

    public function getIndex()
    {
        header( 'Location: /');
        return \View::make('admin.layout');
    }

    public function getStatistics(){
        return \Response::json([$this->dashboard->getUsersOfGroup(), $this->dashboard->getArticlesOfCategory()]);
        //return Response::json([true]);
    }

}