<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DashboardService
 *
 * @author Admin
 */
class DashboardService {
    
    public function getUsersOfGroup() {
        $result = \Group::all(['title', 'id']);
        foreach ($result as $value) {
            $value->countUsers = $value->users([])->count();
        }
        return $result;
    }

    public function getArticlesOfCategory(){
        $result = \Category::all(['title', 'id']);
        foreach ($result as $value) {
            $value->countArticles = Article::where('category_id', '=', $value->id)->count();
        }
        return $result; 
    }
}
