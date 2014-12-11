@extends('front.layout')

@section('include')

@stop

@section('content')

<div class="container">
    <span><% $page->title %></span>
    <p><% $page->body %></p>
</div>

@stop