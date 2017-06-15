define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'editbase', 'durandal/system','notification/service/notificationService'],
    function (app, ko, router, dialog, jquery, editbase, system) {
        var self;
        return {
            notificationInfoArray:ko.observable([]),
            activate: function () {
                
            },
            attached: function () {
                self = this;
                notificationService.getNotificationMainData(function(data){
                    self.notificationInfoArray(data);
                });
            },
            notificationDetailClick:function(index){
                index = index();
                notificationScope.notificationDetailModel = self.notificationInfoArray()[index];
                router.navigate("#notificationDetail");
            },
            detached:function(){
                
            }
        }
    }); 
