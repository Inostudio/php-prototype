@extends('front.layout')

@section('include')

@stop

@section('content')

<div class="container">
    @if(isset($page))
        <span><% $page->title %></span>
        <p><% $page->body %></p>
    @elseif(isset($response) && ($response[0] === true || $response[0] === false))
        <div style="text-align: center; font-size: 16px;" class="alert alert-info" role="alert"><% $response[1] %></div>

    @endif
</div>

@stop