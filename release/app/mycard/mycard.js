define(['knockout','plugins/router'], function (ko,router) {
   
  var childRouter4 = router.createChildRouter()
        .makeRelative({
            moduleId:'myes',
            fromParent:true
        }).map(appConfig.app.myCardRouter).buildNavigationModel();
       return   {
             
                router: childRouter4,  
              
                getCurroute:function(that){
                    //var strmoduleid=that.__moduleId__;
                    //根据路由模块id查询当前路由
                   // var curRoute=this.router.routes.filter(function(route){return route.moduleId==strmoduleid})[0];
                    
                           
                   // return curRoute;
                    
                },
                setSubtitle:function(title)
                {
                    //刷新当前子标题
                   // this.subtitle(title);
                },
              //  subtitle:ko.observable(""),
               
                myesRouter: ko.computed(function() {
                        return ko.utils.arrayFilter(childRouter4.navigationModel(), function(route) {
                         return route.type == 'myworkpage';
                    });
        })
              
        }; 
}); 