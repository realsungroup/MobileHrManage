define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog'], function (app, ko, router, dialog) {
    var oList = ko.observable([]),
        timeList = ko.observable([]),
        currentPersonBusLine = ko.observable({});
    var selectLineName = ko.observable('');
    var sbusid = appConfig.app.mysbusRouter[0].sbusid; sbusid = '540469384880';
    var subid = appConfig.app.mysbusRouter[0].subid; subid = '540469400782';
    return {
        activate: function () {
            appConfig.app.mysbusshell.subtitle("班车");
        },
        oList: oList,
        timeList: timeList,
        selectLineName: selectLineName,
        currentPersonBusLine: currentPersonBusLine,
        attached: function () {
            
            var cmswhere = "", cp = {};
            var me = this;
            appConfig.app.dbs.dbGetdata(sbusid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
            function fnSuccess(data, subdata, total) {
                // for(var i = 0 ; i < data['length']; i ++){
                //     data[i].applied = '11';
                // }
                me.oList(data);

                // me.oChange();
                me.personBusLine();
            }
            function fnError(data) {
                console.log("---------->error" + data.message);
            }
            function fnSyserror(jqXHR, textStatus, errorThrown) {
                console.log("---------->Syserror" + jqXHR.message);

            }
        },
        goToBusDetail: function (index) {
            appConfig.app.mysbusshell.router.navigate("#mysbus/busDetail");

            selectLineName(oList()[index()].C3_540472920385);
        },
        oChange: function () {
            var cmswhere = "C3_540473907719 = '" + $('#bs option:selected').text() + "'";
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
        personBusLine: function () {
            var cmswhere = "";
            var me = this;
            appConfig.app.dbs.dbGetdata('546376670052', 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
            function fnSuccess(data, subdata, total) {
                // me.timeList(data);
                for (var i = 0; i < data['length']; i++) {
                    var lineM = data[i];
                    if (lineM.C3_546342899469 == 'N') {
                        currentPersonBusLine(lineM);
                    }
                }

                // var tempOlist = oList();
                // for(var i = 0 ; i <tempOlist.length; i ++){
                //     var tempM = tempOlist[i];
                //     if(tempM.C3_540472920385 == currentPersonBusLine().C3_546339679211){
                //         tempM.applied = '已申请';
                //     }
                // }
                // me.oList(tempOlist);

            }
            function fnError(data) {
                console.log("---------->error" + data.message);
            }
            function fnSyserror(jqXHR, textStatus, errorThrown) {
                console.log("---------->Syserror" + jqXHR.message);

            }
        }
    };
}); 