'use strict';
var appConfig = window.appConfig || {};
appConfig = {
    is_debug: true,
    home_url_path:'app.home.index'
};

'use strict';
$(function () {
    angular.bootstrap(document, ['app']);
});
'use strict';
angular.module('app', [
    'ui.router'

    ,'portal.home' 
])