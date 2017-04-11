define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog,scanner) {
     var user = ko.observable(),
         upass = ko.observable();
     var getLeaveitems=function(callback){
         // ------------get leaveitems
                         appConfig.app.dbs.dbGetdata( appConfig.app.leavedefineresid,"","","",function(data,subdata,total){
                               if (total==0)
                               {
                                    dialog.showMessage('获取假期定义失败',"新同事");
                                   
                               }
                               appConfig.app.leaveitems=ko.observableArray(data);
                               callback(true);
                               
                         },function(data){
                               dialog.showMessage(data.message,"获取假期定义失败");
                               callback(false);
                         },function(){
                               dialog.showMessage('服务响应错误',"获取假期定义失败");
                               callback(false);
                         },0,0);
     }
  
       return  {
                 user:user,
                 upass:upass,
                 openid:'',
                 unionid:'',
                 activate:function(e){
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
                    
                },
             
                attached:function(){
                  
                    var self=this;
                    
                    
                    if (appConfig.app.dbs==null){
                      
                                appConfig.appfunction.system.doLoginbyunionid(this.unionid,fnSuccess,fnError);
                                function fnSuccess(){
                                     self.user(appConfig.app.userConfig.LoginID);
                                     self.upass(appConfig.app.userConfig.Password);
                                    
                                     self.dologin();
                                      
                                }
                                function fnError(error){

                                    dialog.showMessage(error.message,"新同事");
                                    appConfig.app.dbs=null;
                                   // router.navigate('#');
                                    router.navigate(appConfig.app.approoturl+"/#"+"weixinauthaccount");
                                }
                

                    }
                    else{
                        router.navigate(appConfig.app.approoturl+"/#"+appConfig.app.curRouterHash);
                    }
                   

                },
                dologin:function(){
               
                appConfig.appfunction.system.doLogin(this.user(),this.upass(),fnSuccess, fnError, fnSyserror);
                function fnSuccess(data){
                     var baseUrl=appConfig.app.userProfile.EMP_LOGIN_URL;
                     var dbs=new dbHelper(baseUrl,data.user,data.ucode);
                 
                     appConfig.appfunction.system.setAppDbs(dbs);
                     getLeaveitems(function(result){
                         if (result){
  
                              router.navigate(appConfig.app.approoturl+"/#"+appConfig.app.curRouterHash);

                            }
                            else{
                                  appConfig.appfunction.system.clearAppConfig();
                                  router.navigate('#');
                            }

                     });
                     
                    
                }
                function fnError(data){
                     dialog.showMessage(data.message,"新同事");
                     appConfig.appfunction.system.clearAppConfig();
                     router.navigate('#');
                     
                }
                function fnSyserror(jqXHR, textStatus, errorThrown){
                        alert("error");
                    }
         }
              
        };
}); 