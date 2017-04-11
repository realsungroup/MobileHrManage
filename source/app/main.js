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
        'editbase':'host/editbase',
        'editform':'host/editform',
        "mywork1":'mywork/viewmodels/mywork1',
        "mywork11":'mywork/viewmodels/',
        
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       }
    }
});

<<<<<<< HEAD
define(['durandal/system', 'knockout','durandal/app', 'durandal/viewLocator', 'bootstrap','plugins/router','plugins/dialog','wxlogin','realsun/common'],  function (system,ko, app, viewLocator,bootstrap,router,dialog,wxlogin) {
=======
define(['durandal/system', 'knockout','durandal/app', 'durandal/viewLocator', 'bootstrap','plugins/router','plugins/dialog','realsun/common'],  function (system,ko, app, viewLocator,bootstrap,router,dialog) {
>>>>>>> a826b1046f3e561d5c7fd1f94ff46f6486888032
  
     app.title = '考勤管理';
    app.configurePlugins({
        router:true,
        dialog: true
    });
    var udata;
<<<<<<< HEAD
      //读取应用配置并登入远程数据库后开始程序
=======
    
    function loginApp(unionid,callback){
        if (appConfig.app.dbs==null){
                      
            appConfig.appfunction.system.doLoginbyunionid(unionid,
                        function(){dologinApp(appConfig.app.userConfig.LoginID,appConfig.app.userConfig.Password,callback);},
                        function(jqXHR){
                                     dialog.showMessage(jqXHR.message,"新同事");
                                     appConfig.app.dbs=null;
                                     router.navigate(appConfig.app.approoturl+"/#"+"weixinauthaccount");

                                });
                                 
                    }
                    
    }
    function dologinApp(user,upass,callback){console.log("-------->"+user);
         appConfig.appfunction.system.doLogin(user,upass,fnSuccess, fnError);
                function fnSuccess(data){
                     var baseUrl=appConfig.app.userProfile.EMP_LOGIN_URL;
                     var dbs=new dbHelper(baseUrl,data.user,data.ucode);
                 
                     appConfig.appfunction.system.setAppDbs(dbs);
                     callback();
                     
                    
                }
                function fnError(data){
                     dialog.showMessage(data.message,"新同事");
                     appConfig.appfunction.system.clearAppConfig();
                     router.navigate('#');
                     
                }
                
    }
    function startApp(){
        //开始程序前微信客户端验证
         if (appConfig.app.runmode=="weixin")
                    {

                         this.openid=appConfig.appfunction.system.getWeixinOpenid();
                         this.unionid=appConfig.appfunction.system.getWeixinUnionId();
                         if (this.openid=="null"||this.openid==null||this.openid==''||this.unionid=='null'||this.unionid==null||this.unionid==''){
                                    var aopenid="";
                                    var hash="";
                                    var aunionid="";
                                    aopenid=getQueryString("openid");
                                    aunionid=getQueryString("unionid");
                                   // aunionid=aopenid;
                                    if  (aopenid==""||aopenid==null||aunionid==""||aunionid==null){
                                        router.navigate(appConfig.app.weixinOAuthUrl);
                                        return true;
                                    }
                                    else{
                                        this.openid=aopenid;
                                        this.unionid=aunionid;
                                        appConfig.appfunction.system.setWeixinOpenid(aopenid);
                                        appConfig.appfunction.system.setWeixinUnionId(aunionid);
                                        
                                      }
                                }
                        
                     }
         loginApp(this.unionid,function(){
               app.start().then(function() {
                   viewLocator.useConvention();
                    
                    var userdata=appConfig.appfunction.system.getAppUserdata();
                    appConfig.appfunction.system.setAppConfig(userdata);
                    udata=userdata;
                    system.debug(appConfig.app.debug);
                    system.log(appConfig);
                    appConfig.app.ko=ko;
                    appConfig.app.subtitle=ko.observable("");
                    appConfig.app.showback=ko.observable(false);
                    appConfig.app.showaddbutton=ko.observable(false);
                    if (appConfig.app.runmode=="weixin"){
                        
                        appConfig.appfunction.system.TryinitWeiCat(appConfig.app.getWxconfigUrl);
                        
                    }
                    $.get("app/mywork/views/mywork1.html",function(data){
                         // appConfig.app.mywork1html=data;
                          app.setRoot('shell');
                   });  
                      
                      
                });
         }) 
       
    }
    //读取应用配置并登入远程数据库后开始程序
>>>>>>> a826b1046f3e561d5c7fd1f94ff46f6486888032
     $.getJSON("app.config.json",function(data,textStatus,hr){
         //debugger;
         appConfig=data;
         appConfig.appfunction=appfunctions; 
<<<<<<< HEAD
         //startApp();startWxApp
           system.debug(appConfig.app.debug);
          app.start().then(function() {
                   viewLocator.useConvention();
                  
                 
                   wxlogin.startWxApp(function(lastResult){ 
                       if (lastResult.error==0)
                       {
                               app.setRoot('shell');
                       }else if(lastResult.error==-2){
                            dialog.showMessage(lastResult.message,'错误');
                       }else{
                           dialog.showMessage(lastResult.message,'用户登入').then(function(e){
                                app.setRoot('weixinauthaccount');

                           })
                       }
                     
                       
                       
                    });
                  
          });
=======
         startApp();
         
>>>>>>> a826b1046f3e561d5c7fd1f94ff46f6486888032
  
    });
});
