<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 19.12.2014
 * Time: 15:37
 */

namespace Admin;

use Illuminate\Support\Facades\Input;

/**
 * Class ResourceController
 * @package Admin
 */
class ResourceController extends \BaseController {

    /**
     * @var null|\ResourceService
     */
    protected $resources = null;

    /**
     * @param \ResourceService $rs
     */
    public function __construct(\ResourceService $rs) {
        $this->resources = $rs;
    }

    /**
     * @return array
     */
    public function postAdd() {
        $title = Input::get('title');
        $file = Input::get('file');
        return $this->resources->add($title, $file);
    }

    /**
     * @return mixed
     */
    public function postShow() {
        return \Resource::all();
    }

    /**
     * @return array
     */
    public function postDelete() {
        return $this->resources->delete(Input::get('id'));
    }
} 