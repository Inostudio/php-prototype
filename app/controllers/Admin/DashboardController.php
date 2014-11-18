<?php

namespace Admin;

class DashboardController extends \BaseController
{
    
    public function getIndex()
    {
        
        return \View::make('admin.dashboard');
        
    }    
    
}