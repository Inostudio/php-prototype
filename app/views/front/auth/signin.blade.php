@extends('front.layout')

@section('include')
    <link href="/front/vendors/angular-busy/angular-busy.min.css" rel="stylesheet">

    <script type="text/javascript" src="/front/js/signApp.module.js"></script>

    <script type="text/javascript" src="/front/vendors/angular-animate/angular-animate.min.js"></script>
    <script type="text/javascript" src="/front/vendors/angular-busy/angular-busy.min.js"></script>

    <script type="text/javascript" src="/front/js/controllers/sign.controllers.js"></script>
    <script type="text/javascript" src="/front/js/services/sign.services.js"></script>
    <script type="text/javascript" src="/front/js/routes/sign.routes.js"></script>
@stop

@section('content')
<!-- Begin page content -->
<div class="container" data-ng-app="signApp">
    <div data-ng-view>

    </div>

</div>

@stop