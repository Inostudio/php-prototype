<!DOCTYPE html>
<html>
    <head>
        <title>Forbidden</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding-top: 15%">
        <div style="width: 500px; margin: auto; height: 30%">
            <img src="/front/img/forbidden.png" style="width: 160px; height: 160px; margin-left: 30%">
            <br>
            <center>
                <p><%trans('front/ban.access_closed')%> <%$ban->end%></p>
                <p><%trans('front/ban.reason')%>: <%$ban->reason%></p>
            </center>
        </div>
    </body>
</html>


