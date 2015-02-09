// Работа с cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires*1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) { 
          options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for(var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];    
      if (propValue !== true) { 
        updatedCookie += "=" + propValue;
       }
    }

    document.cookie = updatedCookie;
}
//////

if(navigator.cookieEnabled){
    addStyle('sub-header', 'color');
    addStyle('page-header', 'color');
    addStyle('a', 'color');
    addStyle('sidebar', 'background-color');
    addStyle('navbar-inverse', 'background-color');
    addStyle('btn-primary', 'background-color');
    addStyle('active', 'background-color');
}

function addStyle($class, $property){
    var style = document.createElement('style');
    style.type = 'text/css';
    if(getCookie($class) != undefined){
        if($class == 'active'){
            style.innerHTML = '.'+ $class + ' a {background-color: ' + getCookie('active') +' !important}';
        } else if($class == 'a'){
            style.innerHTML = $class + ' {color: ' + getCookie($class) +' !important}';  
        } else{
            style.innerHTML = '.'+ $class +' {'+ $property + ': ' + getCookie($class) +' !important}';
        }
    }
    document.getElementsByTagName('head')[0].appendChild(style);
}

/*
 * Позиции styl-ов
 * .active  last-1
 * .btn-primary last-2
 * navbar-inverse   last-3
 * sidebar  last-4
 * <a>  last-5
 * <h1> last-6
 * sub-header   last-7
 */