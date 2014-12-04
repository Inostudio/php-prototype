<?php

namespace Front;

use \Auth;
use \Response;
use \View;
use \Input;
use \Redirect;
use \Validator;

use Article;


class ArticlesController extends \BaseController
{
    /**
     *
     * @var \ArticlesService
     */
    protected $articles;


    public function __construct(\ArticlesService $articles)
    {
        $this->articles = $articles;
    }
    

    /**
     * Display a listing of the resource.
     * GET /articles
     *
     * @return Response
     */
    public function index()
    {
                
//        \Debugbar::error("Test");
        
        return View::make('front.articles.index', [
                    'faker' => \Faker\Factory::create(),
            
                    'articles' => $this->articles->showPublishedList(
                                            Input::get('phrase'), 
                                            Input::get('category_id'), 
                                            Input::get('order')),
            
                    'categories' => $this->articles->getPublishedCategories(),
            
                    'orderOptions' => Article::getOrderOptions()                    
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * GET /articles/create
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * POST /articles
     *
     * @return Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     * GET /articles/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        
        $article = $this->articles->getPublishedArticle($id);
        
        return View::make('front.articles.show', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * GET /articles/{id}/edit
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
     * PUT /articles/{id}
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
     * DELETE /articles/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

}
