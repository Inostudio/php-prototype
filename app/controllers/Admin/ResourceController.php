<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 19.12.2014
 * Time: 15:37
 */

namespace Admin;

use Illuminate\Support\Facades\Input;

class ResourceController extends \BaseController {

    protected $resources = null;

    public function __construct( \ResourceService $rs)
    {
        $this->resources = $rs;
    }

    public function postAddResource()
    {
        $title = Input::get('title');
        $file = Input::get('file');
        return $this->resources->add($title, $file);
    }

    public function postShowResources()
    {
        return \Resource::all();
    }

    public function postDeleteResources()
    {
        return $this->resources->delete(Input::get('id'));
    }
} 