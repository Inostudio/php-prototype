<?php

    use Illuminate\Support\Str;
    $routeName = Route::getCurrentRoute()->getName();
    if($routeName === NULL) {
        $routeName = "front.home";
    }
    $lang =  App::getLocale();
    $lang = $lang === NULL ? "en" : $lang;
    
    foreach (Section::all() as $key => $value) {
        $result[$value->title] = $value->disable;
    }
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
      <link href="/vendor/font-awesome/font-awesome.min.css" rel="stylesheet">
    <!--@codereview move into a special templatec -->
    <link rel="stylesheet" type="text/css" href="/front/css/sidebar.css">
    <link href="/vendor/loading-bar/css/loading-bar.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/front/css/main.css" rel="stylesheet">
    <link href="/front/css/profileStyle.css" rel="stylesheet">

    <script type="text/javascript" src="/vendor/angular/angular.min.js"></script>
    <script type="text/javascript" src="/vendor/angular-route/angular-route.min.js"></script>
    <script type="text/javascript" src="/vendor/ui-bootstrap/ui-bootstrap-tpls-0.11.2.js"></script>
    <script src="/vendor/loading-bar/js/loading-bar.min.js" type="text/javascript"></script>

    @section('include')

    @show

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
          <script src="/vendor/html5shiv/html5shiv.min.js" type="text/javascript"></script>
          <script src="/vendor/respond/respond.min.js" type="text/javascript"></script>
    <![endif]-->
  </head>

  <body>

    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">

        <ul class="nav navbar-nav pull-right">
            @if(Auth::user() && !$result['articles'] && !$result['auth'])
              <form class="navbar-form" style="float: left" method="post" action="<% action('front.search', ['lang' => $lang]) %>">
                <input name="offer" type="text" class="form-control" placeholder="<%trans('front/navbar.search')%>">
                <input type="hidden" name="search" value="users" />
              </form>
                <li>
                    <a href="/articles#/users/<% Auth::user()->id %>" ><% trans('front/navbar.my_articles') %></a>
                </li>
            @endif
            @if (Auth::user())
                @if(!$result['profile'])
                    <li <?=$routeName=='front.profile' ? 'class="active"' : ''; ?>><a href="<% action('front.profile', ['lang' => $lang]) %>"><i class="fa fa-user"></i> <% trans('front/navbar.profile') %></a></li>
                @endif
                @if(!$result['auth'])
                    <li><a href="<% action('front.logout', ['lang' => $lang]) %>"><i class="fa fa-signout"></i> <% trans('front/navbar.logout') %></a></li>
                @endif
            @else
                @if(!$result['auth'])
                    <li <?=$routeName=='front.signin' ? 'class="active"' : ''; ?>><a href="<% action('front.signin', ['lang' => $lang]) %>"><i class="fa fa-sign-in"></i> <% trans('front/navbar.signin') %></a></li>
                    <li <?=$routeName=='front.signup' ? 'class="active"' : ''; ?>><a href="<% action('front.signup', ['lang' => $lang]) %>"><i class="fa fa-plus-square"></i> <% trans('front/navbar.signup') %></a></li>
                @endif
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
            <li <?=$routeName=='front.about' ? 'class="active"' : ''; ?>><a href="<?=action('front.about', ['lang' => $lang]);?>"><% trans('front/navbar.about') %></a></li>
            <li <?=$routeName=='front.contact' ? 'class="active"' : ''; ?>><a href="<?=action('front.contact', ['lang' => $lang]);?>"><% trans('front/navbar.contact') %></a></li>

            @if(!$result['articles'] && !$result['auth'])
              <li <?=$routeName=='front.articles' ? 'class="active"' : ''; ?>>
                  <a href="<% action('front.articles', ['lang' => $lang]) %>" ><% trans('front/navbar.articles') %></a>
              </li>
            @endif

          </ul>

          <div class="navbar-form navbar-left">
              <a href="javascript:window.location.href = window.location.href.replace('en', 'ru')" class="<% $lang === 'ru' ? 'active-block' : '' %>">RUS</a>
              <a href="javascript:window.location.href = window.location.href.replace('ru', 'en')" class="<% $lang === 'en' ? 'active-block' : '' %>">ENG</a>
          </div>

        </div><!--/.nav-collapse -->


      </div>
    </nav>

    @section('content')
        Here should be a content
    @show

    <div class="footer">
      <div class="container">
        <p class="text-muted">Inostudio &copy; <% date('Y') %></p>
      </div>
    </div>
  </body>
</html>
