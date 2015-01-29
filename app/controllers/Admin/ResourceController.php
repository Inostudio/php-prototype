<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 19.12.2014
 * Time: 15:37
 */

namespace Admin;

use Illuminate\Support\Facades\Input;
use \Response;
/**
 * Class ResourceController
 * @package Admin
 */
class ResourceController extends \BaseController {

    /**
     * @var null|\ResourceService
     */
    protected $resources = null;

    protected $rulesEditResource = [
        'title' => 'required|unique:resources'
    ];
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
        return $this->resources->getResources(Input::get('direction'), Input::get('limit'), Input::get('offset'));
    }

    /**
     * @return array
     */
    public function postDelete() {
        return Response::json([$this->resources->delete(Input::get('id'), Input::get('action'), Input::get('direction'), Input::get('offset'), Input::get('limit'), Input::get('phrase'), Input::get('src'))]);
    }
    
    public function postEditResource(){
        $status = true;
        $message = '';
        $validator = \Validator::make(\Input::all(), $this->rulesEditResource);

        if($validator->fails()) {
            $status = false;
            $message = $validator->messages()->first();
        } else {
            $this->resources->editResource(Input::get('id'), Input::get('title'));
        }
        
        return Response::json([$status, $message]);
    }
    
    public function getSearchResources(){
        return Response::json($this->resources->getSearchResources(Input::get('direction'), Input::get('phrase'), Input::get('src'), Input::get('limit'), Input::get('offset')));
    }
} 