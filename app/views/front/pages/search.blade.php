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
@stop

@section('content')

    <style>
        .user-row {
            margin-bottom: 14px;
        }

        .user-row:last-child {
            margin-bottom: 0;
        }

        .dropdown-user {
            margin: 13px 0;
            padding: 5px;
            height: 100%;
        }

        .dropdown-user:hover {
            cursor: pointer;
        }

        .table-user-information > tbody > tr {
            border-top: 1px solid rgb(221, 221, 221);
        }

        .table-user-information > tbody > tr:first-child {
            border-top: 0;
        }


        .table-user-information > tbody > tr > td {
            border-top: 0;
        }
    </style>
    <div class="container" data-ng-app="searchApp">

        <div data-ng-init="search = '<% $search %>'; where = '<% $where %>'" data-ng-view>



        </div>
    </div>

@stop