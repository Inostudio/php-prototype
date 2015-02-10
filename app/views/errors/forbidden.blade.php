@extends('front.layout')
@section('content')
    <div style="margin: 0; padding-top: 15%">
        <div style="width: 500px; margin: auto; height: 30%">
            <img src="/front/img/forbidden.png" style="width: 160px; height: 160px; margin-left: 32%; margin-bottom: 15px;">
            <br>
            <center>
                <p><%trans('front/ban.access_closed')%> <%$ban->end%></p>
                <p><%trans('front/ban.reason')%>: <%$ban->reason%></p>
            </center>
        </div>
    </div>
@stop

