requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
      
        'signature':'../lib/signature/js/jq-signature',
        'realsun': '../lib/realsun/js',
        'myworkshell':'mywork/',
        'myworkbase':'mywork/',
        'mobiscroll':'../lib/mobiscorll/mobiscroll.custom-3.0.0-beta2.min',
        'editbase':'../lib/realsun/host/editbase',
        'editform':'host/editform',
        "mywork1":'mywork/viewmodels/mywork1',
        "myworkvm":'mywork/viewmodels/',
        "busvm":"mysbus/viewmodels/",
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }
    }
});

//
define(['durandal/system', 'knockout','durandal/app', 'durandal/viewLocator', 'bootstrap','plugins/router','plugins/dialog','wxlogin','realsun/common'],  function (system,ko, app, viewLocator,bootstrap,router,dialog,wxlogin) {
//
//define(['durandal/system', 'knockout','durandal/app', 'durandal/viewLocator', 'bootstrap','plugins/router','plugins/dialog','realsun/common'],  function (system,ko, app, viewLocator,bootstrap,router,dialog) {
//
  
    app.title = '正在进入';
    app.configurePlugins({
        router:true,
        dialog: true
    });
    var udata;
 
     $.getJSON("app.config.json",function(data,textStatus,hr){
         //debugger;
         appConfig=data;
         appConfig.appfunction=appfunctions; 

         //startApp();startWxApp
           system.debug(appConfig.app.debug);
          app.start().then(function() {
                   viewLocator.useConvention();
                  
                 
                   wxlogin.startWxApp(function(lastResult){ 
                       if (lastResult.error==0)
                       {
                           if(getQueryString('action') == 'notificationShell') {
                                app.setRoot('notification/notificationShell');
                                app.title = '政策公告';
                           }else{
                                app.title = '员工入职';
                                   app.setRoot('shell');
                             }

                       }else if(lastResult.error==-2){
                            dialog.showMessage(lastResult.message,'错误');
                       }else{
                           dialog.showMessage(lastResult.message,'用户登入').then(function(e){
                                app.setRoot('weixinauthaccount');

                           })
                       }
                     
                       
                       
                    });
                  
          });

        //  startApp();
         
// 
  
    });
});
