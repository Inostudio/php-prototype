<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 05.12.2014
 * Time: 14:27
 */

class PagesService
{
    public function createPage($title, $body, $url, $status_id)
    {
        $page = new Page;
        $page->title = $title;
        $page->body = $body;
        $page->user_id = Auth::user()->id;
        $page->url = $url;
        $page->status_id = $status_id;
        $page->save();

        return $page->id;
    }

}