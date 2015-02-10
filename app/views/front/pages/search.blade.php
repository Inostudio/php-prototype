@extends('front.layout')

@section('include')
    <link rel="stylesheet" type="text/css" href="/front/css/entity.css" media="all" />
    <link href="/vendor/loading-bar/css/loading-bar.min.css" rel="stylesheet">

    <script src="/front/js/searchApp.module.js" type="text/javascript"></script>
    <script src="/front/js/routes/search.routes.js" type="text/javascript"></script>
    <script src="/front/js/controllers/search.controllers.js" type="text/javascript"></script>
    <script src="/front/js/controllers/articles.controllers.js" type="text/javascript"></script>
    <script src="/front/js/services/search.services.js" type="text/javascript"></script>
    <script src="/front/js/services/articles.services.js" type="text/javascript"></script>
    <script src="/vendor/angular-resource/angular-resource.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-strap/angular-strap.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-strap/angular-strap.tpl.js" type="text/javascript"></script>
    <script src="/vendor/angular-animate/angular-animate.min.js" type="text/javascript"></script>
    <script src="/vendor/loading-bar/js/loading-bar.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="/vendor/angular-strap/libraries.min.css">
    <link rel="stylesheet" type="text/css" href="/front/css/searchStyle.css" media="all" />
@stop

@section('content')

    <div class="container" data-ng-app="searchApp">

        <div data-ng-init="search = '<% $search %>'; where = '<% $where %>'" data-ng-view>



        </div>
    </div>

@stop