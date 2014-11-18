<?php

class AngularController extends Controller 
{

    public function serve()
    {
        return View::make('angular.angularViews.' . Input::get('id'));
    }

}

