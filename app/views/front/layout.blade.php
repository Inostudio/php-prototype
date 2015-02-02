<?php

    use Illuminate\Support\Str;
    $routeName = Route::getCurrentRoute()->getName();
    $lang =  App::getLocale();
    $lang = $lang === NULL ? "en" : $lang;

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Sticky Footer Navbar Template for Bootstrap</title>

    <script type="text/javascript">
        //var lang = window.location.pathname.substr(1, 2);
    </script>
    <!-- Bootstrap core CSS -->
    <!--<link href="/front/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">-->
    <link href="/vendor/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <!--@codereview move into a special templatec -->
    <link rel="stylesheet" type="text/css" href="/front/css/sidebar.css">


    <!-- Custom styles for this template -->
    <link href="/front/css/main.css" rel="stylesheet">

    <!-- Includes angular's scripts -->
    <script src="/vendor/angular/angular.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-route/angular-route.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-resource/angular-resource.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-animate/angular-animate.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-busy/angular-busy.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-strap/angular-strap.min.js" type="text/javascript"></script>
    <script src="/vendor/angular-strap/angular-strap.tpl.js" type="text/javascript"></script>


    <script type="text/javascript" src="/vendor/ui-bootstrap/ui-bootstrap-tpls-0.11.2.js"></script>

    <!-- Include SPA -->
    <script src="/front/js/frontApp.module.js" type="text/javascript"></script>
    <script src="/front/js/controllers/front.controllers.js" type="text/javascript"></script>
    <script src="/front/js/routes/front.routes.js" type="text/javascript"></script>
    <!-- Contact -->
    <script src="/front/js/controllers/contact.controllers.js" type="text/javascript"></script>
    <script src="/front/js/services/contact.services.js" type="text/javascript"></script>
    <!-- Auth -->
    <script src="/front/js/routes/sign.routes.js" type="text/javascript"></script>
    <script src="/front/js/controllers/sign.controllers.js" type="text/javascript"></script>
    <script src="/front/js/services/sign.services.js" type="text/javascript"></script>
    <!-- Articles -->
    <script src="/front/js/routes/articles.routes.js" type="text/javascript"></script>
    <script src="/front/js/controllers/articles.controllers.js" type="text/javascript"></script>
    <script src="/front/js/services/articles.services.js" type="text/javascript"></script>
    <!-- Profile -->
    <script src="/front/js/routes/profile.routes.js" type="text/javascript"></script>
    <script src="/front/js/controllers/profile.controllers.js" type="text/javascript"></script>
    <script src="/front/js/services/profile.services.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="/front/css/profile.css">


    <!-- Include loading bar -->
    <script src="/vendor/loading-bar/js/loading-bar.min.js" type="text/javascript"></script>
    <link href="/vendor/loading-bar/css/loading-bar.min.css" rel="stylesheet">

    <!-- Include waiting indicator -->
    <script type="text/javascript" src="/vendor/angular-busy/angular-busy.min.js"></script>
    <link href="/vendor/angular-busy/angular-busy.min.css" rel="stylesheet">

    <!-- Include for work with image -->
    <script src="/vendor/directives/js/ng-img-crop.js"></script>
    <script src="/vendor/directives/js/ng-droplet.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/vendor/directives/css/ng-img-crop.css">

  </head>

  <body data-ng-app="frontApp" data-ng-controller="MainCtrl as vm">

    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">

        <ul class="nav navbar-nav pull-right">
          <form class="navbar-form" style="float: left" method="get" action="<% action('front.search', ['lang' => $lang]) %>">
            <input name="offer" type="text" class="form-control" placeholder="<%trans('adminMenu.search')%>">
          </form>
            @if (Auth::user())
                <li <?=$routeName=='front.profile' ? 'class="active"' : ''; ?>><a href="#/profile"><i class="fa fa-user"></i> <% Auth::user()->email %></a></li>
                <li><a href="<% action('front.logout', ['lang' => $lang]) %>"><i class="fa fa-signout"></i> <% trans('front/navbar.logout') %></a></li>
            @else
              <li <?=$routeName=='front.signin' ? 'class="active"' : ''; ?>><a href="#/sign_in"><i class="fa fa-sign-in"></i> <% trans('front/navbar.signin') %></a></li>
              <li <?=$routeName=='front.signup' ? 'class="active"' : ''; ?>><a href="#/sign_up"><i class="fa fa-plus-square"></i> <% trans('front/navbar.signup') %></a></li>
            @endif

        </ul>

        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Ino Prototype</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li <?=$routeName=='front.home' ? 'class="active"' : ''; ?> ><a href="<?=action('front.home', ['lang' => $lang]);?>"><% trans('front/navbar.home') %></a></li>
            <li <?=$routeName=='front.about' ? 'class="active"' : ''; ?>><a href="#/about"><% trans('front/navbar.about') %></a></li>
            <li <?=$routeName=='front.contact' ? 'class="active"' : ''; ?>><a href="#/contact"><% trans('front/navbar.contact') %></a></li>
            <li <?=Str::startsWith($routeName, 'front.articles') ? 'class="active"' : ''; ?>><a href="#/articles"><% trans('front/navbar.articles') %></a></li>
          </ul>
          <div class="navbar-form navbar-left">
              <a href="<% action($routeName, ['lang' => 'ru']) %>" class="<% $lang === 'ru' ? 'active-block' : '' %>">RUS</a>
              <a href="<% action($routeName, ['lang' => 'en']) %>" class="<% $lang === 'en' ? 'active-block' : '' %>">ENG</a>
          </div>

        </div><!--/.nav-collapse -->


      </div>
    </nav>
    
    <div data-ng-view class="container">
      Here should be a content4
    </div>

    <div class="footer">
      <div class="container">
        <p class="text-muted">Inostudio &copy; <% date('Y') %></p>
      </div>
    </div>
  </body>
</html>
