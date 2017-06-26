define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'myworkshell/viewmodels/mywork1', 'mobiscroll'],
    function (app, ko, router, dialog, mywork1, viewEngine, mobiscroll) {
        var record = ko.observable({});
        var haveSin = ko.observable(false);
        var noSin = ko.observable(false);
        return {
            activate: function () {
                var a = mywork1.record();
                var self = this;
                self.record(a);

                if (record().C3_551806597769 == 'Y') {
                    haveSin(true);
                } else {
                    haveSin(false);
                }
                noSin(!haveSin());
            },
            record: record,
            haveSin: haveSin,
            noSin: noSin,
            attached: function () {

                function setSin() {
                    if (haveSin()) {
                        record().C3_551806597769 = 'Y';
                    } else {
                        record().C3_551806597769 = 'N';
                    }

                    console.log("fanzui----------->"  + record().C3_551806597769);
                }

                ko.computed(function () {
                   noSin(!haveSin());
                    setSin()
                });

                ko.computed(function () {
                    haveSin(!noSin());
                    setSin();
                });


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