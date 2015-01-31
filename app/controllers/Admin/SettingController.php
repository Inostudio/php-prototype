<?php namespace Admin;

use \Input;
use \Response;

class SettingController extends \BaseController{
    
    protected $settings = null;
    
    public function __construct(\SettingsService $ss)
    {
        $this->settings = $ss;
    }
    
    public function getSections(){
        return Response::json([\Section::all()]);
    }
    
    public function postChangeSection(){
        return Response::json([$this->settings->changeSection(Input::get('id'), Input::get('disable'))]);
    }
}