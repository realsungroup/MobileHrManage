define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'myworkshell/viewmodels/mywork1','mobiscroll'],
    function (app, ko, router, dialog, mywork1, viewEngine,mobiscroll) {
        var record = ko.observable({});
        return {
            activate: function () {
                var a = mywork1.record();
                var self = this;
                self.record(a);
            },
            record: record,

            attached: function () {

            },
            submitClickWork5: function () {
                mywork1.submitClick();
            },
            goToMySign:function(){
                appConfig.app.myworkshell.router.navigate("#mywork/myes");
            
            },
            routeBack: function () {
                appConfig.app.myworkshell.router.navigateBack();
            }
        };
    });