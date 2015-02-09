@extends('front.layout')

@section('include')
    <link rel="stylesheet" type="text/css" href="/front/css/entity.css" media="all" />
    <link href="/vendor/loading-bar/css/loading-bar.min.css" rel="stylesheet">
    <link href="/front/css/articlesStyle.css" rel="stylesheet">
    <script src="/front/js/articlesApp.module.js" type="text/javascript"></script>
    <script src="/front/js/routes/articles.routes.js" type="text/javascript"></script>
    <script src="/front/js/controllers/articles.controllers.js" type="text/javascript"></script>
    <script src="/front/js/services/articles.services.js" type="text/javascript"></script>
    <script src="/vendor/angular-resource/angular-resource.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-strap/angular-strap.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-strap/angular-strap.tpl.js" type="text/javascript"></script>
    <script src="/vendor/angular-animate/angular-animate.min.js" type="text/javascript"></script>
    <script src="/vendor/loading-bar/js/loading-bar.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="/vendor/angular-strap/libraries.min.css">
@stop

@section('content')
<div class="container" ng-app="articlesApp" ng-view>
</div>
@stop