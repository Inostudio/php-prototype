@extends('front.layout')

@section('include')
    <link rel="stylesheet" type="text/css" href="/front/css/entity.css" media="all" />
    <link href="/vendor/loading-bar/css/loading-bar.min.css" rel="stylesheet">

    <script src="/front/js/searchApp.module.js" type="text/javascript"></script>
    <script src="/front/js/routes/search.routes.js" type="text/javascript"></script>
    <script src="/front/js/controllers/search.controller.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-resource.min.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-strap.min.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-strap.tpl.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-animate.js" type="text/javascript"></script>
    <script src="/vendor/loading-bar/js/loading-bar.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="//mgcrea.github.io/angular-strap/styles/libraries.min.css">
@stop

@section('content')

    <div class="container" data-ng-app="searchApp">
        <div data-ng-init="$rootScope.search = <% $offer %>">

            <div data-ng-view>
                <% $offer %>
            </div>

        </div>
    </div>

@stop