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
    

    protected $rulesAddArticle = [
        'title' => 'required',
        'body' => 'required',
        'category' => 'required|min:0'
    ];
    /**
     * Display a listing of the resource.
     * GET /articles
     *
     * @return Response
     */
    public function getIndex()
    {
        return View::make('front.pages.articles');
    }
    
    public function getArticlesAndCategories(){
        
        $userId = 0;
        if(Auth::check()){
            $userId = Auth::user()->id;
        } 
        //Получение новостей
        return \Response::json([\Category::all(), $this->articles->getArticles(\Input::get('lim')), \Article::count(), $userId, $this->articles->getNewArticles()]);
    }
    
    public function getMoreArticles(){
        return \Response::json([$this->articles->getMoreArticles(\Input::get('lim'), \Input::get('off')), \Article::count()]);
    }
    
    public function getSearchResults(){
        return \Response::json($this->articles->searchResults(\Input::get('lim'), \Input::get('off'), \Input::get('cat'), \Input::get('phr')));
    }
    
    public function getShowArticle(){
        return \Response::json($this->articles->getArticle(\Input::all('articleId')));
    }
    
    public function postRemoveArticle(){
        
        return \Response::json([$this->articles->removeArticle(\Input::get('removeId'))]);
    }
    
    public function getCategory(){
        return \Response::json([\Category::all()]);
    }
    
    public function postCreateArticle(){
        $result = true;
        $message = '';
        $id = 0;
        $validator = \Validator::make(\Input::all(), $this->rulesAddArticle);
        
        if($validator->fails()) {
            $result = false;
            $message = $validator->messages()->first();
        } else {
                $id = $this->articles->createArticle(\Input::get("title"), \Input::get("body"), \Input::get("category"));
        }
        return \Response::json([$result, $message, $id]);
    }
    
    public function postEditArticle(){
        $result = true;
        $message = '';
        $validator = \Validator::make(\Input::all(), $this->rulesAddArticle);
        if($validator->fails()) {
            $result = false;
            $message = $validator->messages()->first();
        } else {
                $this->articles->editArticle(\Input::get("title"), \Input::get("body"), \Input::get("category"), \Input::get("id"));
        }
        
        return \Response::json([$result, $message]);
    }
}
