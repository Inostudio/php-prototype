<?php

namespace Admin;

use Illuminate\Support\Facades\Input;

class StaticPageController extends \BaseController {

    /**
     *
     * @var PermissionsService
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
	public function getAllPages()
	{
		$pages = \Page::where('user_id', '=', \Auth::user()->id)->get();
        //$status = $pages[0]->status;
        return \Response::json($pages);
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

    public function getAllStatuses()
    {
        $statuses = \Status::all();
        //$status = $pages[0]->status;
        return \Response::json($statuses);
    }

	/**
	 * Show the form for creating a new resource.
	 * GET /staticpage/create
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /staticpage
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 * GET /staticpage/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /staticpage/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /staticpage/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /staticpage/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}