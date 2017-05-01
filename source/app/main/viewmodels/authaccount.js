define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog,scanner) {
        return  {
                 user:user,
                 upass:upass,
                 openid:'',
                 unionid:'',
                 activate:function(e){
                  
                     }
                    
                ,
             
                attached:function(){
                  
                    var self=this;
                    
                    
                    if (appConfig.app.dbs==null){
                      
                                router.navigate(appConfig.app.approoturl);
                                return ;

                    }
                    else{
                         this.openid=appConfig.appfunction.system.getWeixinOpenid();
                         this.unionid=appConfig.appfunction.system.getWeixinUnionId();
                    }
                    
                   

                },
                getvalidcode:function(){

                },
                validatecode:function(){

                }
                 
        };

})