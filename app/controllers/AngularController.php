<?php

class AngularController extends Controller 
{

    public function serve()
    {
        return View::make(Input::get('ns') . '.angular.' . Input::get('id'));
    }

}

