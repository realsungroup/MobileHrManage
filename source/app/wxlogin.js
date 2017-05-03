define(['durandal/system', 'knockout','durandal/app', 'durandal/viewLocator', 'bootstrap','plugins/router','plugins/dialog','editbase','realsun/common'],  function (system,ko, app, viewLocator,bootstrap,router,dialog,editbase) {
var lastResult={"error":0,"message":""};
 
 
 
    function loginApp(unionid,callback){
        if (appConfig.app.dbs==null){
                      
            appConfig.appfunction.system.doLoginbyunionid(unionid,
                        function(){
                              var baseUrl=appConfig.app.userProfile.EMP_LOGIN_URL;
                              
                               var dbs=new dbHelper(baseUrl,appConfig.app.userConfig.LoginID,appConfig.app.userConfig.PassEncrypted);
                                 appConfig.appfunction.system.setAppDbs(dbs);
                                  //登记 微信登入到后台 
                                 var openid=appConfig.appfunction.system.getWeixinOpenid();
                                 var unionid=appConfig.appfunction.system.getWeixinUnionId();
                                 var resid=547134975427;
                                 var  wxlogin = new Object();
                                 wxlogin.C3_547135102710 = openid;
                                 wxlogin.C3_547135161630 =unionid;
                                 if (appConfig.app.appname){wxlogin.C3_547135180743=appConfig.app.appname;};
                                   
                                  var tempEditbase = new editbase(resid, 0);
                                  tempEditbase.addData(wxlogin).then(function (e) { 
                                        if (e.error == 0) {callback(true);}else{dialog.showMessage(e.message, '');};
                                        
                                    }, 
                                        function (error) {dialog.showMessage(error, '');
                                    });
                                
                          },
                        function(error){
                                    
                                          appConfig.app.dbs=null;
                                           lastResult.error=-1;
                                           lastResult.message='微信账户登入失败，错误信息：'+error.message;
                                           callback(false)
                                  
                                    
                                     
                                });
                                 
                    }
                    
    }
   
    
    function startLoginApp(unionid,callbackMain){
           loginApp(unionid,function(result){
                   if (result){
                    var self=this;
                    var userdata=appConfig.appfunction.system.getAppUserdata();
                    appConfig.appfunction.system.setAppConfig(userdata);
                    udata=userdata;
                    system.log(appConfig);
                    appConfig.app.ko=ko;
                    appConfig.app.subtitle=ko.observable("");
                    appConfig.app.showback=ko.observable(false);
                    appConfig.app.showaddbutton=ko.observable(false);
                    if (appConfig.app.runmode=="weixin"){
                        
                        appConfig.appfunction.system.TryinitWeiCat(appConfig.app.getWxconfigUrl);
                        
                    }
                    isHave(function(isHave){
                        if(isHave) {//服务端有候选人记录
                               callbackMain(lastResult);
                        }else{//没有记录
                               lastResult.error=-2;
                                           lastResult.message='没有这条数据，请在服务端添加后重新进入！';
                                           callbackMain(lastResult);
                        }
                    });
                  } 
                  else{
                        callbackMain(lastResult);
                  }
            });

            function isHave(callback){
                   var resid = appConfig.app.myworkRouter[0].resid;
                  var cmswhere = "";
                var me = this;
                   appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
                    function fnSuccess(data, subdata, total) {
                          if(data.length != 0)callback(true)
                          else callback(false);
                        
                    }
                    function fnError(data) {
                        console.log("---------->error" + data.message);
                    }
                    function fnSyserror(jqXHR, textStatus, errorThrown) {
                        console.log("---------->Syserror" + jqXHR.message);
                    }
            }
      }
    function startWxApp(callbackMain){
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
                                        if (appConfig.app.localdebug){
                                            router.navigate(appConfig.app.weixinOAuthUrl2);
                                        }
                                        else
                                        {router.navigate(appConfig.app.weixinOAuthUrl);}
                                        
                                        return true;
                                    }
                                    else{
                                        this.openid=aopenid;
                                        this.unionid=aunionid;
                                        appConfig.appfunction.system.setWeixinOpenid(aopenid);
                                        appConfig.appfunction.system.setWeixinUnionId(aunionid);
                                        startLoginApp(this.unionid,callbackMain);
                                      }
                                }
                                else
                                { 
                                      startLoginApp(this.unionid,callbackMain);
                                    }
                        
                     }

       
    }
    return {
        startWxApp:startWxApp
    }
})