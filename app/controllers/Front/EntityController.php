<?php

namespace Front;

use \Auth;
use \View;
use \Input;
use \Validator;
use \Redirect;
use \Response;

class EntityController extends \Controller
{

    public function index()
    {
        return View::make('front.entity.index', [
            'faker' => \Faker\Factory::create()
        ]);
    }
    
    public function show($entityId)
    {
        return View::make('front.entity.show');
    }
    
}