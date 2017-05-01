define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'mysbus/viewmodels/mysbus', 'editbase'], function (app, ko, router, dialog, mysbus, editbase) {
    var oList = ko.observable([]),
        timeList = ko.observable([]),
        isApply = ko.observable('申请'),
        personLineM = ko.observable({});
         var personBusLineID = appConfig.app.personBusLineID;

    var sbusid = appConfig.app.mysbusRouter[0].sbusid; sbusid = '540469384880';
    var subid = appConfig.app.mysbusRouter[0].subid; subid = '540469400782';
    return {
        activate: function () {
            appConfig.app.mysbusshell.subtitle(mysbus.selectLineName());
            var self = this;
            self.oChange(mysbus.selectLineName());


            if (mysbus.currentPersonBusLine().C3_546339679211 &&
                mysbus.currentPersonBusLine().C3_546339679211 != '') {
                if (mysbus.currentPersonBusLine().C3_546339679211 == mysbus.selectLineName()) {
                    isApply('取消申请');
                } else {
                    isApply("申请");
                }

            }
        },
        oList: oList,
        timeList: timeList,
        isApply: isApply,
        personLineM: personLineM,
        attached: function () {

        },
        oChange: function (str) {
            var cmswhere = "C3_540473907719 = '" + str + "'";
            var me = this;
            appConfig.app.dbs.dbGetdata(subid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
            function fnSuccess(data, subdata, total) {
                me.timeList(data);
            }
            function fnError(data) {
                console.log("---------->error" + data.message);
            }
            function fnSyserror(jqXHR, textStatus, errorThrown) {
                console.log("---------->Syserror" + jqXHR.message);

            }
        },
        applyClick: function () {//546339659730 546376670052
            var me = this;
           
            if (isApply() == '申请') {
                // if(mysbus.currentPersonBusLine().C3_546339679211 )


                isApply('申请中...');
                var personBusModel = {
                    "C3_546339713510":appConfig.app.userConfig.EmpCode,
                    "C3_546339679211": mysbus.selectLineName(),
                    "C3_546342899469": "N"
                }
                var tempEditBase = new editbase(personBusLineID, 0);
                tempEditBase.editoraddData(personBusModel,'C3_546339713510').then(function (e) {
                    if (e.error == 0) {
                         isApply('取消申请');
                         mysbus.currentPersonBusLine(e.data[0]);
                    } else {
                        alert(e.error.message);
                        isApply('申请');
                    }
                }, function (error) {
                    alert(error.message);
                    isApply('申请');
                });
            } else if (isApply() == '取消申请') {
                mysbus.currentPersonBusLine().C3_546342899469 = "Y";
                var recid = mysbus.currentPersonBusLine().REC_ID;
                var dfd = {};

                var editService = new editbase(personBusLineID, recid);
                editService.saveData(mysbus.currentPersonBusLine()).then(function (e) {
                    if (e.error == 0) {
                        // dialog.showMessage(e.message, '').then(function (dfd) {

                        // });
                        isApply('申请');
                        mysbus.currentPersonBusLine({});
                    } else dialog.showMessage(e.message, '');
                }, function (error) {
                    dialog.showMessage(error, '');
                });
            }

        }

    };
}); 