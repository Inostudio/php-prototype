<?php
    $lang =  App::getLocale();
    $routeName = Route::getCurrentRoute()->getName();
    $lang =  App::getLocale();
?>
<!DOCTYPE html>
<html lang="en" ng-app="adminApp">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>InoPrototypeDesigner</title>


    <link rel="stylesheet" type="text/css" href="/vendor/directives/css/ng-img-crop.css">
    <!-- Bootstrap core CSS -->
    <link href="/vendor/angular-strap/libraries.min.css" rel="stylesheet">
    <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/vendor/loading-bar/css/loading-bar.min.css" rel="stylesheet">
    <link href="/vendor/font-awesome/font-awesome.min.css" rel="stylesheet">

    
    <script type="text/javascript">
        var lang = window.location.pathname.substr(1, 2);
    </script>
    <script type="text/javascript" src="/vendor/angular/angular.min.js"></script>
    <script type="text/javascript" src="/vendor/ui-grid/ui-grid.min.js"></script>
    
    <script src="/vendor/ui-bootstrap/ui-bootstrap-tpls-0.12.0.min.js"  type="text/javascript"></script>
    <script src="/vendor/angular-sanitize/angular-sanitize.js"></script>
    <script src="/vendor/angular-route/angular-route.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-resource/angular-resource.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-animate/angular-animate.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-strap/angular-strap.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-strap/angular-strap.tpl.js" type="text/javascript"></script>
    <script src="/vendor/loading-bar/js/loading-bar.min.js" type="text/javascript"></script>

    <script src="/vendor/directives/js/ng-img-crop.js"></script>
    
    <!--Для grid---->

    <!--<script src="/vendor/angular/pdfmake.js" type="text/javascript"></script>
    <script src="/vendor/angular/vfs_fonts.js"></script>-->
    <script src="/vendor/ui-grid/ui-grid-unstable.min.js"></script>
    <link href="/vendor/ui-grid/ui-grid-unstable.min.css" rel="stylesheet">
    
    <script src="/admin/js/app.js" type="text/javascript"></script>
    <script src="/admin/js/controllers/adminControllers.js" type="text/javascript"></script>
    <script src="/admin/js/services/adminServices.js" type="text/javascript"></script>
    <script src="/admin/js/routes.js" type="text/javascript"></script>
    <script src="/admin/js/directives.js" type="text/javascript"></script>

    <!--Charts-->
    <script type='text/javascript' src='/vendor/angular-charts/d3.min.js'></script>
    <script type='text/javascript' src='/vendor/angular-charts/angular-charts.min.js'></script>
    
    <!--ngClip-->
    <script type='text/javascript' src='/admin/vendors/angular/ZeroClipboard.min.js'></script>
    <script type='text/javascript' src='/admin/vendors/angular/ngClip.js'></script>
    
    
    <!--Toggle-->
    <script type='text/javascript' src='/admin/vendors/angular/ng-toggle.js'></script>
    <link href="/admin/vendors/angular/ng-toggle.css" rel="stylesheet">
    
    <<f></f>
    <script type='text/javascript' src='/admin/vendors/colorpicker/bootstrap-colorpicker-module.min.js'></script>
    <link href="/admin/vendors/colorpicker/colorpicker.min.css" rel="stylesheet">
    
    @section('include')

    @show
    
    <!-- Custom styles for this template -->
    <link href="/admin/css/main.css" rel="stylesheet">
    <script type='text/javascript' src='/admin/vendors/js/cookie.js'></script>
  </head>
  <body ng-controller="activCtrl as vm">
      
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#/">ino.prototype.designer</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#/"><i class="fa fa-dashboard"></i> <%trans('admin/adminMenu.dashboard')%></a></li>
            <li><a href="#/allArticle"><i class="fa fa-file-o"></i> <%trans('admin/adminMenu.articles')%></a></li>
            <li><a href="<% action('admin.logout', ['lang' => $lang]) %>"><i class="fa fa-suitcase"></i> <%trans('admin/adminMenu.logout')%></a></li>
          </ul>
            <div class='lang'>
                <a href="javascript:window.location.href = window.location.href.replace('en', 'ru')" class="<% $lang === 'ru' ? 'active-block' : '' %>">RUS</a>
                <a href="javascript:window.location.href = window.location.href.replace('ru', 'en')" class="<% $lang === 'en' ? 'active-block' : '' %>">ENG</a>
            </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li ng-class="{'active' : vm.isActive('/')}"><a href="#/"><i class="fa fa-dashboard"></i> <%trans('admin/adminMenu.dashboard')%></a></li>
            <li ng-class="{'active' : vm.isActive('/users') || vm.isActive('/userGroups')}"><a href="#/users"><i class="fa fa-users"></i> <%trans('admin/adminMenu.users')%></a></li>
            <li ng-class="{'active' : vm.isActive('/groups') || vm.isActive('/groupsPermis')}"><a href="#/groups"><i class="fa fa-group"></i> <%trans('admin/adminMenu.groups')%></a></li>
            <li ng-class="{'active' : vm.isActive('/permissions')}"><a href="#/permissions"><i class="fa fa-legal"></i> <%trans('admin/adminMenu.permissions')%></a></li>
            <li ng-class="{'active' : vm.isActive('/pages')}"><a href="#/pages"><i class="fa fa-newspaper-o"></i> <%trans('admin/adminMenu.pages')%></a></li>
            <li ng-class="{'active' : vm.isActive('/categories_of_articles') || vm.isActive('/articleCategory')}"><a href="#/categories_of_articles"><i class="fa fa-list"></i> <%trans('admin/adminMenu.categories_of_articles')%></a></li>
            <li ng-class="{'active' : vm.isActive('/allArticle')}"><a href="#/allArticle"><i class="fa fa-file-o"></i> <%trans('admin/adminMenu.articles')%></a></li>
            <li ng-class="{'active' : vm.isActive('/resources')}"><a href="#/resources"><i class="fa fa-file-image-o"></i> <%trans('admin/adminMenu.resources')%></a></li>
            <li ng-class="{'active' : vm.isActive('/languages')}"><a href="#/languages"><i class="fa fa-language"></i> <%trans('admin/adminMenu.languages')%></a></li>
            <li ng-class="{'active' : vm.isActive('/settings')}"><a href="#/settings"><i class="fa fa-gear"></i> <%trans('admin/adminMenu.settings')%></a></li>
            <li ng-class="{'active' : vm.isActive('/personalization')}"><a href="#/personalization"><i class="fa fa-css3"></i> <%trans('admin/adminMenu.personalization')%></a></li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main slide" ng-view></div>
      </div>
    </div>
  </body>
</html>
