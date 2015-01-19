<?php

namespace Front;

class LanguageController extends \BaseController
{
    public function postCheckLang(){
        \App::setLocale(\Input::get('language'));
        return \Response::json(["res" => \Input::get('language')]);
    }
}

