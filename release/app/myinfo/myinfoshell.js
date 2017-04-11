define(['durandal/app','knockout','plugins/router','plugins/dialog',], function (app,ko,router,dialog) {
   
  var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'myinfoshell',
            fromParent:true
        }).map(appConfig.app.myinfoRouter).buildNavigationModel();
       appConfig.app.myinfoshell=   {
               activate:function () {
                         
                          
                         
               },
                router: childRouter,  
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
               
                myinfoRouter: ko.computed(function() {
                        return ko.utils.arrayFilter(childRouter.navigationModel(), function(route) {
                         return route.type == 'minfopage';
                    });
        })
              
        }; 
       return   appConfig.app.myinfoshell;
}); 