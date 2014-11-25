<?php

    $routeName = Route::getCurrentRoute()->getName();

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

    <!-- Bootstrap core CSS -->
    <link href="/front/vendors/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <!--@codereview move into a special templatec -->
    <link rel="stylesheet" type="text/css" href="/front/css/sidebar.css">
 
    <!-- Custom styles for this template -->
    <link href="/front/css/main.css" rel="stylesheet">

    <script type="text/javascript" src="/front/vendors/angular/angular.min.js"></script>
    <script type="text/javascript" src="/front/vendors/angular/angular-route.min.js"></script>
    <script type="text/javascript" src="/front/vendors/ui-bootstrap/ui-bootstrap-tpls-0.11.2.js"></script>

    @section('include')

    @show
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
          
        <ul class="nav navbar-nav pull-right">
            @if (Auth::user())
                <li <?=$routeName=='front.profile' ? 'class="active"' : ''; ?>><a href="<% action('front.profile') %>"><i class="fa fa-user"></i> <% Auth::user()->email %></a></li>
                <li><a href="<% action('front.logout') %>"><i class="fa fa-signout"></i> Logout</a></li>
            @else
                <li <?=$routeName=='front.signin' ? 'class="active"' : ''; ?>><a href="<% action('front.signin') %>"><i class="fa fa-sign-in"></i> Signin</a></li>
                <li <?=$routeName=='front.signup' ? 'class="active"' : ''; ?>><a href="<% action('front.signup') %>"><i class="fa fa-plus-square"></i> Signup</a></li>
            @endif
        </ul>
          
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Ino Prototype</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li <?=$routeName=='front.home' ? 'class="active"' : ''; ?> ><a href="/">Home</a></li>
            <li <?=$routeName=='front.about' ? 'class="active"' : ''; ?>><a href="<?=action('front.about');?>">About</a></li>
            <li <?=$routeName=='front.contact' ? 'class="active"' : ''; ?>><a href="<?=action('front.contact');?>">Contact</a></li>
            <li <?=$routeName=='front.entity.index' ? 'class="active"' : ''; ?>><a href="<?=action('front.entity.index');?>">Entities</a></li>
            <?php if(0){ ?>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
            <?php } ?>
          </ul>
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