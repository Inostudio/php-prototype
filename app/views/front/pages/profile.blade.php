@extends('front.layout')

@section('include')
    <link rel="stylesheet" type="text/css" href="/front/css/profile.css">


    <script src="/vendor/directives/js/ng-img-crop.js"></script>
    <script src="/vendor/directives/js/ng-droplet.min.js"></script>

    <!--
    <script type="text/javascript" src="/build/front/js/bundle.js"></script>
    -->

    <script type="text/javascript" src="/front/js/profileApp.module.js"></script>
    <script type="text/javascript" src="/front/js/routes/profile.routes.js"></script>
    <script type="text/javascript" src="/front/js/controllers/profile.controllers.js"></script>
    <script type="text/javascript" src="/front/js/services/profile.services.js"></script>


    <link rel="stylesheet" type="text/css" href="/vendor/directives/css/ng-img-crop.css">

    <script type="text/javascript" src="/vendor/ui-bootstrap/ui-bootstrap-tpls-0.11.2.js"></script>
@stop

@section('content')

<!-- Begin page content -->
<div class="container" data-ng-app="profileApp">
    <div id="wrapper">

        <!-- Sidebar -->
        <div id="sidebar-wrapper" data-ng-controller="NavbarCtrl as vm">
            <ul class="sidebar-nav">
                <li class="sidebar-brand active" data-ng-class="{ 'active' : vm.isActive('/') || vm.isActive('/edit') }">
                    <a href="#/">
                        <% trans('front/profile/navbar.profile') %>
                    </a>
                </li>
                <li data-ng-class="{ 'active' : vm.isActive('/edit_password') }">
                    <a href="#/edit_password/">
                        <% trans('front/profile/navbar.changePassword') %>
                    </a>
                </li>
                <li data-ng-class="{ 'active' : vm.isActive('/change_email') }">
                    <a href="#/change_email/">
                        <% trans('front/profile/navbar.changeEmail') %>
                    </a>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xs-offset-0 col-sm-offset-0 col-md-offset-0 col-lg-offset-0 toppad" data-ng-view>

                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->

    </div> 
</div>

@stop

