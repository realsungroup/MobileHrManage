define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'editbase', 'durandal/system','notification/service/notificationService'],
    function (app, ko, router, dialog, jquery, editbase, system) {
        var self;
        return {
            detailInfo:null,
            activate: function () {
                self = this;

                self.detailInfo = ko.observable({});
                var detailID = notificationScope.notificationDetailModel.C3_548337789616;
                notificationService.getNotificationDetailData(detailID,(data) => {
                    self.detailInfo(data[0]);
                })
            },
            attached: function () {

            },
            detached:function(){

            },
            backTop: function(){
              $('.page__content').scrollTop(0);
            }
        }
    }); 
