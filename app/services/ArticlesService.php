<?php

class ArticlesService
{    

    
    public function getArticles($limit){
        
        $articles = Article::with('user', 'user.profile');
        return $articles->with('category')->take($limit)->get();
    }
    
    public function getMoreArticles($limit, $offset){
        
        $articles = Article::with('user', 'user.profile');
        return $articles->with('category')->skip($offset)->take($limit)->get();
    }
    
    public function searchResults($limit, $offset, $category, $phrase){
        $articles = [];
        $countArticles = 0;
        
        if($category === 'All'){
            $articles = Article::where('title', 'like', '%'.$phrase.'%');
            
           $countArticles = $articles->count();
            
           $articles = $articles->with('user', 'user.profile')->with('category')->skip($offset)->take($limit)->get();
        } else {
            
            $articles = Article::where('title', 'like', '%'.$phrase.'%');
            
            $articles = $articles->whereHas('category', function($query) use($category){
                $query->where('title', '=', $category);
            });         
            $countArticles = $articles->count();
            $articles = $articles->with('user', 'user.profile', 'category')->skip($offset)->take($limit)->get();
            
        }
        return [$articles, $countArticles];
    }
    
    public function getArticle($articleId){
        $currentUserId = 0;
        if(Auth::check())
        {
            $currentUserId = Auth::user()->id;
        }
        
        $article = Article::where('id', '=', $articleId)->with('category')->first();
        $user = User::where('id', '=', $article->user_id)->with('profile')->first();
        
        return [$article, $currentUserId, $user];
    }
    
    public function removeArticle($id, $action, $direction, $offset, $limit, $phrase, $src, $category, $field){
        Article::destroy($id);
        $article = null;
        if(!$action){   //Обычная подгрузка
            $article = $this->getArticlesAndCategory($category, 1, ($offset + $limit - 1), $direction, $field);
        } else {    //При поиске
            $article = $this->searchArticles($category, 1, ($offset + $limit - 1), $direction, $field, $phrase, $src);
        }
        return $article;
    }
    
    public function createArticle($title, $body, $category){
        $article = new Article;
        $article->title = $title;
        $article->body = $body;
        $article->category_id = $category;
        $article->user_id = Auth::user()->id;
        $article->save();
        
        return $article->id;
    }
    
    public function getNewArticles(){
        
         return Article::orderBy('created_at', 'desc')->with('category')->limit(3)->get();
    }
    
    public function editArticle($title, $body, $category, $id){
        $article = Article::find($id);
        $article->title = $title;
        $article->body = $body;
        $article->category_id = $category;
        $article->save();
    }
    
    public function removeCategory($id){
        Article::where('category_id', '=', $id)->update(array('category_id' => (Category::where('isDefault', '=', '1')->first()->id)));
        Category::destroy($id);
        return true;
    }
    
    public function addCategory($title){
        $category = new Category;
        $category->title = $title;
        $category->save();
        return $category->id;
    }
    
    public function editCategory($title, $id){
        $category = Category::find($id);
        $category->title = $title;
        $category->save();
        return;
    }
    
    public function getArticlesAndCategory($categoryId, $limit, $offset, $direction, $field){
        if($categoryId == 0){   //Всех катеорий
            $articles = Article::with('category')->with('user');
            $articlesCount = $articles->count();
            $articles = $articles->skip($offset)
                    ->take($limit)
                    ->orderBy($field, $direction)
                    ->get();
            return [$articles, $articlesCount];
        } else {    //Конретной категории
            $articles = Article::whereHas('category', function($query) use($categoryId){
                $query->where('id', '=', $categoryId);
            });
            
            $articlesCount = $articles->count();
            $articles = $articles->with('user')
                    ->skip($offset)
                    ->take($limit)
                    ->orderBy($field, $direction)
                    ->get();
            return [$articles, $articlesCount, Category::where('id', '=', $categoryId)->first()];
        }
    }
    
    public function editArticleAdm($id, $title, $field){
        if($field == 'title') {
            $article = Article::find($id);
            $article->title = $title;
            $article->save();
            return;
        } else {
            $article = Article::find($id);
            $article->category_id = Category::where('title', '=', $title)->first()->id;
            $article->save();
            return;
        }
    }
    
    public function searchArticles($categoryId, $limit, $offset, $direction, $field, $phrase, $src){
        $articles = '';
        $articlesCount = 0;
        if($categoryId == null){    //Поиск во всех категориях
            if($src == 1){  //Поиск по Title
                $articles = Article::where('title', 'like', '%'.$phrase.'%')->with('user')->with('category');
                $articlesCount = $articles->count();
                $articles = $articles->skip($offset)->take($limit)->orderBy($field, $direction)->get();
            } else if ($src == 2){    //Поиск по автору
                $articles = Article::whereHas('user', function($query) use($phrase){
                    $query->where('email', 'like', '%'.$phrase.'%');
                })->with('category')->with('user');
                $articlesCount = $articles->count();
                $articles = $articles->skip($offset)->take($limit)->orderBy($field, $direction)->get();
            }
        } else {    //Поиск в конкретной категории
            if($src == 1){  //Поиск по Title
                $articles = Article::where('title', 'like', '%'.$phrase.'%')->where('category_id', '=', $categoryId)->with('user')->with('category');
                $articlesCount = $articles->count();
                $articles = $articles->skip($offset)->take($limit)->orderBy($field, $direction)->get();
            } else if($src == 2) {    //Поиск по автору
                $articles = Article::where('category_id', '=', $categoryId)->whereHas('user', function($query) use($phrase){
                    $query->where('email', 'like', '%'.$phrase.'%');
                })->with('category')->with('user');
                $articlesCount = $articles->count();
                $articles = $articles->skip($offset)->take($limit)->orderBy($field, $direction)->get();
            }
        }
        return [$articles, $articlesCount];
    }
}