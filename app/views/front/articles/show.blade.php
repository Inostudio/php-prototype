@extends('front.layout')

@section('include')
<link rel="stylesheet" type="text/css" href="/front/css/entity.css" media="all" />
@show


@section('content')

<?php /* @var $article Article */ ?>

<div class="container">
    <div class="row">
        
        <div class="col-sm-9">
            <h2><?=$article->title?></h2>
            
            <?=$article->body?>
            
            
        </div>
        <div class="col-sm-3">
            
            
        </div>
        
        
        
        
        
    </div>
</div>



@stop