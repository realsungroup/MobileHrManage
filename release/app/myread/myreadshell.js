define(['durandal/app','knockout','plugins/router','plugins/dialog',], function (app,ko,router,dialog) {
   
  var childRouter3 = router.createChildRouter()
        .makeRelative({
            moduleId:'myread',
            fromParent:true
        }).map(appConfig.app.myreadRouter).buildNavigationModel();
       appConfig.app.myreadshell=   {
               activate:function () {
                         
                          
                         
               },
                router: childRouter3,  
                attached:function(){
                   
                },
                getCurroute:function(that){
                    var strmoduleid=that.__moduleId__;
                    //根据路由模块id查询当前路由
                    var curRoute=this.router.routes.filter(function(route){return route.moduleId==strmoduleid})[0];
                    
                           
                    return curRoute;
                    
                },
                setSubtitle:function(title)
                {
                    //刷新当前子标题
                    this.subtitle(title);
                },
                subtitle:ko.observable(""),
               
                myreadRouter: ko.computed(function() {
                        return ko.utils.arrayFilter(childRouter3.navigationModel(), function(route) {
                         return route.type == 'myworkpage';
                    });
        })
              
        }; 
       return   appConfig.app.myreadshell;
}); 