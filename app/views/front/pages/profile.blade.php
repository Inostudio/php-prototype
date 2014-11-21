@extends('front.layout')

@section('include')


    <script type="text/javascript" src="/front/js/profileApp.js"></script>
    <script type="text/javascript" src="/front/js/controllers/profileControllers.js"></script>
    <script type="text/javascript" src="/front/js/services/profileServices.js"></script>
@stop

@section('content')

<!-- Begin page content -->
<div class="container" ng-app="profileApp">
    <div id="wrapper">

        <!-- Sidebar -->
        <div id="sidebar-wrapper" ng-controller="NavbarCtrl">
            <ul class="sidebar-nav">
                <li class="sidebar-brand active" ng-class="{ 'active' : isActive('/') }">
                    <a href="#/">
                        Профиль
                    </a>
                </li>
                <li ng-class="{ 'active' : isActive('/edit_password') }">
                    <a href="#/edit_password">Смена пароля</a>
                </li>
                <li ng-class="{ 'active' : isActive('/photo') }">
                    <a href="#/photo">Фото в профиле</a>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-9 col-xs-offset-0 col-sm-offset-0 col-md-offset-0 col-lg-offset-0 toppad" ng-view>

                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->

    </div> 
</div>

@stop

