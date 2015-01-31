<?php

namespace Admin;

use \Input;
use \Response;


/**
 * Class ArticleController
 * @package Admin
 */
class ArticleController extends \BaseController
{
    protected $rulesAddCategory = [
        'title' => 'required|unique:categories'
    ];
    protected $rulesEditArticle = [
        'title' => 'required|unique:articles'
    ];
    /**
     *
     * @var \ArticlesService
     */
    protected $article = null;

    /**
     * @param \ArticlesService $art
     */
    public function __construct(\ArticlesService $art)
    {
        $this->article = $art;
    }

    public function getCategory(){
        //return Response::json([\Category::where('title', '<>', 'Other')->get()]);
        return Response::json([\Category::all()]);
    }
    
    public function postRemoveCategory(){
        return Response::json([$this->article->removeCategory(Input::get('categoryId'))]);
    }
    
    public function postAddCategory(){
        $status = true;
        $message = '';
        $id = -1;

        $validator = \Validator::make(\Input::all(), $this->rulesAddCategory);

        if($validator->fails()) {
            $status = false;
            $message = $validator->messages()->first();
        } else {
            $id = $this->article->addCategory(Input::get('title'));
        }
        
        
        return Response::json([$status, $message, Input::get('title'), $id]);
    }
    
    public function postEditCategory(){
        $status = true;
        $message = '';

        $validator = \Validator::make(\Input::all(), $this->rulesAddCategory);

        if($validator->fails()) {
            $status = false;
            $message = $validator->messages()->first();
        } else {
            $this->article->editCategory(Input::get('title'), Input::get('id'));
        }
        return Response::json([$status, $message]);
    }
    
    public function getArticles(){
        
        return Response::json($this->article->getArticlesAndCategory(Input::get('categoryId'), Input::get('lim'), Input::get('off'), Input::get('dir'), Input::get('fiel')));
    }
    
    public function postEditArticle(){
        $status = true;
        $message = '';
        if(Input::get('field') == 'title'){
            $validator = \Validator::make(Input::all(), $this->rulesEditArticle);
            if($validator->fails()) {
                $status = false;
                $message = $validator->messages()->first();
                return Response::json([$status, $message]);
            } else {
                return Response::json([$status, $message, $this->article->editArticleAdm(Input::get('id'), Input::get('title'), Input::get('field'))]);
                
            }
        } else {
            $category = \Category::where('title', '=', Input::get('title'))->first();
            if($category == null){
                return Response::json([false, 'Category with this name does not exist!']);
            } else {
                return Response::json([true, '', $this->article->editArticleAdm(Input::get('id'), Input::get('title'), Input::get('field'))]);
            }
        }
    }
    
    public function getSearchArticles(){
        return Response::json($this->article->searchArticles(Input::get('categoryId'), 
                Input::get('lim'), Input::get('off'), Input::get('dir'), 
                Input::get('fiel'), Input::get('phrase'), Input::get('src')));
    }
    
    public function postRemoveArticle(){
        return Response::json([ $this->article->removeArticle(Input::get('id'))]);
    }
} 