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
                       alert(JSON.stringify(data));
                    }
                    ,this.openid,telephone,this.unionid);

                },
                validatecode:function(){
                     var telephone=$("#telephone").val();
                     var validCode=$("#validcode").val();
                     appConfig.appfunction.system.AuthClient(appConfig.app.AuthClientUrl,
                     function(data){
                          alert(JSON.stringify(data));
                          localStorage.clear();
                     },this.openid,telephone,this.unionid,validCode);

                }
                 
        };

})