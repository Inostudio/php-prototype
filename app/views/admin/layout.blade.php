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

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="//mgcrea.github.io/angular-strap/styles/libraries.min.css">    <!---Эта штука нужна для анимации всплывающих окон-->
    <link href="/admin/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/admin/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/admin/css/main.css" rel="stylesheet">

    <script type="text/javascript" src="/admin/vendors/angular/angular.min.js"></script>
    <script type="text/javascript" src="/admin/vendors/ui-grid/ui-grid.min.js"></script>
    
    <script type="text/javascript" src="/admin/vendors/ui-bootstrap/ui-bootstrap-tpls-0.12.0.min.js"></script>
    <script src="/admin/vendors/angular/angular-route.min.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-resource.min.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-animate.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-strap.min.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/angular-strap.tpl.js" type="text/javascript"></script>
    
    <!--Для grid---->

    <script src="/admin/vendors/angular/pdfmake.js" type="text/javascript"></script>
    <script src="/admin/vendors/angular/vfs_fonts.js"></script>
    <script src="/admin/vendors/angular/ui-grid-unstable.min.js"></script>
    <link href="/admin/vendors/ui-grid/ui-grid-unstable.min.css" rel="stylesheet">
    
    
    
    <script src="/admin/js/app.js" type="text/javascript"></script>
    <script src="/admin/js/controllers.js" type="text/javascript"></script>
    <script src="/admin/js/services.js" type="text/javascript"></script>
    
    @section('include')

    @show

    <style type="text/css">
        .grid {
            width: 600px;
            height: 450px;
        }
        .grid1 {
            width: 600px;
            height: 450px;
        }
        
        .grid2 {
            width: 550px;
            height: 450px;
        }

    </style>
    
  </head>

  <body ng-controller="activCtrl">

    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">ino.prototype.designer</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
            <li><a href="#/settings"><i class="fa fa-gear"></i> Settings</a></li>
            <li><a href="<% action('admin.logout') %>">Logout</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li ng-class="{'active' : isActive('/')}"><a href="#/"><i class="fa fa-dashboard"></i> Dashboard</a></li>
            <li ng-class="{'active' : isActive('/users')}"><a href="#/users"><i class="fa fa-users"></i> Users</a></li>
            <li ng-class="{'active' : isActive('/groups') || isActive('/groupsPermis')}"><a href="#/groups"><i class="fa fa-group"></i> Groups</a></li>
            <li ng-class="{'active' : isActive('/permissions')}"><a href="#/permissions"><i class="fa fa-legal"></i> Permissions</a></li>
            <li ng-class="{'active' : isActive('/pages')}"><a href="#/pages"><i class="fa fa-newspaper-o"></i> Pages</a></li>
            <li ng-class="{'active' : isActive('/products')}"><a href="#/products"><i class="fa fa-list"></i> Products</a></li>
            <li ng-class="{'active' : isActive('/settings')}"><a href="#/settings"><i class="fa fa-gear"></i> Settings</a></li>
          </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" ng-view></div>
      </div>
    </div>
  </body>
</html>
