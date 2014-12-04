<?php

class ArticlesService
{    
    
    public function showPublishedList($text, $category, $order)
    {
        return Article::where('status', '=', Article::STATUS_PUBLISH)
                        ->paginate(Config::get('prototype.articles.items_per_page'));
    }
    
    public function getPublishedArticle($id)
    {
        return Article::where('status', '=', Article::STATUS_PUBLISH)
                    ->find($id);
    }
    
    /**
     * 
     * @return array
     */
    public function getPublishedCategories()
    {
        $categories = Category::where('status', Category::STATUS_PUBLISH)
                        ->orderBy('title')
                        ->get(['id', 'title']);
        
        $list = [];

        foreach ($categories as $c){
            $list[$c->id] = $c->title;
        }
        
        return $list;
    }
    
    
    
}