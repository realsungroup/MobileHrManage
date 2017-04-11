define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog,scanner) {
        return  {
                
                 openid:'',
                 unionid:'',
                 activate:function(e){
                  
                     }
                    
                ,
             
                attached:function(){
                  
                    var self=this;
                    
                    
                  
                         this.openid=appConfig.appfunction.system.getWeixinOpenid();
                         this.unionid=appConfig.appfunction.system.getWeixinUnionId();
                   
                    
                   if (appConfig.appfunction.system.checkWeixinUnionId()==false){
                       router.navigate(appConfig.app.approoturl);
                       return ;
                   }

                },
                getvalidcode:function(){
                    var telephone=$("#telephone").val();
                    appConfig.appfunction.system.SendValidMsg(appConfig.app.SendValidMsgUrl,
                    function(data){
                        if(data.error==0)
                          {
                               dialog.showMessage('验证码已经发送至您的手机，请在5分钟内输入','用户登入');
                          }
                          else
                          {
                               dialog.showMessage(data.message,"用户登入");
                          }
                    }
                    ,this.openid,telephone,this.unionid);

                },
                validatecode:function(){
                     var telephone=$("#telephone").val();
                     var validCode=$("#validcode").val();
                     appConfig.appfunction.system.AuthClient(appConfig.app.AuthClientUrl,
                     function(data){
                          //alert(JSON.stringify(data));
                          if(data.error==0)
                          {
                               dialog.showMessage('您的微信账号已经绑定成功,','用户登入').then(function(e){
                                  router.navigate(appConfig.app.approoturl);
                               });
                          }
                          else
                          {
                              dialog.showMessage(data.message,"用户登入");
                          }
                          localStorage.clear();
                     },this.openid,telephone,this.unionid,validCode);

                }
                 
        };

})