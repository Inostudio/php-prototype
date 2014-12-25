<?php

namespace Admin;

use Illuminate\Support\Facades\Input;
use Page;

/**
 * Class StaticPageController
 * @package Admin
 */
class StaticPageController extends \BaseController {

    /**
     *
     * @var PagesService
     */
    protected $pages = null;

    /**
     * @param \PagesService $ps
     */
    public function __construct(\PagesService $ps) {
        $this->pages = $ps;
    }

    /**
     * Display a listing of the resource.
     * GET /staticpage
     *
     * @return Response
     */
    public function postShow() {
        $pages = \Page::all();//->get();//where('user_id', '=', \Auth::user()->id)->get();
        $statuses = \Status::all();
        return \Response::json([$pages, $statuses]);
    }

    /**
     * Response information about page by id
     * @var Input::get('id');
     *
     * @return Response
     */
    public function postGet() {
        $page = \Page::find(Input::get('id'));
        return \Response::json($page);
    }

    /**
     * Response status deleting object
     * @var Input::get('id');
     *
     * @return Response
     */
    public function postDelete() {
        $response = ['Success', ''];

        try {
            Page::destroy(Input::get('id'));
        } catch (\Exception $ex) {
            $response[0] = 'Fail';
            $response[1] = $ex->getMessage();
        }

        return \Response::json($response);
    }

    /**
     * @return mixed
     */
    public function postAdd() {
        $page_id = $this->pages->createPage(
            Input::get('title'),
            Input::get('body'),
            Input::get('url'),
            Input::get('status'));
        return \Response::json([$page_id]);
    }

    /**
     * @return mixed
     */
    public function postSave() {
        $page = Page::find(Input::get('id'));
        $page->title = Input::get('title');
        $page->body = Input::get('body');
        $page->url = Input::get('url');
        $page->status_id = Input::get('status');
        $page->title = Input::get('title');
        $page->save();
        return \Response::json(['Success']);
    }

    /**
     * @return mixed
     */
    public function postAllStatuses() {
        $statuses = \Status::all();
        return \Response::json($statuses);
    }
}