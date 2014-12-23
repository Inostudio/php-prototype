<?php

namespace Admin;

use Illuminate\Support\Facades\Input;
use Page;

class StaticPageController extends \BaseController {

    /**
     *
     * @var PagesService
     */
    protected $pages = null;

    public function __construct(\PagesService $ps) {
        $this->pages = $ps;
    }

	/**
	 * Display a listing of the resource.
	 * GET /staticpage
	 *
	 * @return Response
	 */
	public function postAllPages()
	{
            $pages = \Page::where('user_id', '=', \Auth::user()->id)->get();
            $statuses = \Status::all();
            return \Response::json([$pages, $statuses]);
	}

    /**
     * Response information about page by id
     * @var Input::get('id');
     *
     * @return Response
     */
    public function postGetPage()
    {
        $page = \Page::find(Input::get('id'));
        return \Response::json($page);
    }

    /**
     * Response status deleting object
     * @var Input::get('id');
     *
     * @return Response
     */
    public function postDeletePage()
    {
        $response = ['Success', ''];

        try {
            Page::destroy(Input::get('id'));
        }
        catch(\Exception $ex) {
            $response[0] = 'Fail';
            $response[1] = $ex->getMessage();
        }

        return \Response::json($response);
    }

    public function postAddPage()
    {
        $page_id = $this->pages->createPage(
            Input::get('title'),
            Input::get('body'),
            Input::get('url'),
            Input::get('status'));
        return \Response::json([$page_id]);
    }

    public function postSavePage()
    {
        $page = Page::find(Input::get('id'));
        $page->title = Input::get('title');
        $page->body = Input::get('body');
        $page->url = Input::get('url');
        $page->status_id = Input::get('status');
        $page->title = Input::get('title');
        $page->save();
        return \Response::json(['Success']);
    }

    public function postAllStatuses()
    {
        $statuses = \Status::all();
        //$status = $pages[0]->status;
        return \Response::json($statuses);
    }
}