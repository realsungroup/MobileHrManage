define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'myworkshell/viewmodels/mywork1', 'mobiscroll'],
    function (app, ko, router, dialog, mywork1, viewEngine, mobiscroll) {
        var record = ko.observable({}),
            yesSin = ko.observable(),
            falseSin = ko.observable();
        return {
            activate: function () {
                var a = mywork1.record();
                var self = this;
                self.record(a);


            },
            record: record,
            yesSin: yesSin,
            falseSin: falseSin,
            attached: function () {
                yesSin(record().C3_546462266120);
                // yesSin(true);
                falseSin(!yesSin())

                ko.computed(function () {
                    if (yesSin()) {
                        falseSin(!yesSin());
                        record().C3_546462266120 = 'Y';
                    }
                });

                ko.computed(function () {
                    if (falseSin()) {
                        yesSin(!falseSin());
                        record().C3_546462266120 = 'N';
                    }
                })
            },
            submitClickWork5: function () {
                mywork1.submitClick();
            },
            goToMySign: function () {
                appConfig.app.myworkshell.router.navigate("#mywork/myes");

            },
            routeBack: function () {
                appConfig.app.myworkshell.router.navigateBack();
            }
        };
    });