@extends('front.layout')

@section('include')
    <link rel="stylesheet" type="text/css" href="/front/css/entity.css" media="all" />
    <script src="/front/js/articlesApp.module.js" type="text/javascript"></script>
    <script src="/front/js/routes/articles.routes.js" type="text/javascript"></script>
    <script src="/front/js/controllers/articles.controller.js" type="text/javascript"></script>
    <script src="/front/js/services/articles.services.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-resource.min.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-strap.min.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-strap.tpl.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-animate.js" type="text/javascript"></script>
    <link rel="stylesheet" href="//mgcrea.github.io/angular-strap/styles/libraries.min.css"> 
@stop

@section('content')
<div class="container" ng-app="articlesApp" ng-view>
</div>
@stop