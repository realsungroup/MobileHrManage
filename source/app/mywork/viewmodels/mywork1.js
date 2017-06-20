define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'editbase', 'durandal/system', 'editform', 'durandal/binder', 'durandal/viewEngine', 'mobiscroll'],
    function (app, ko, router, dialog, jquery, editbase, system, editform, binder, viewEngine, mobiscroll) {
        var record = ko.observable({});
        var resid = appConfig.app.myworkRouter[0].resid;
        resid = "543089753581";
        return {

            activate: function () {
                this.getData(function () { });

                var timeC = timeControl.createTimeControl();
                timeC.record = this.record();
                timeC.initTimeControl();
            },
            record: record,
            attached: function () {

            },

            getData: function (callback) {
                var cmswhere = "", cp = {};
                var me = this;
                // console.log("--------------->"+me.record().C3_464172127930);
                if ('C3_464172127930' in me.record()) {
                    if (me.record().C3_464172127930 == null || me.record().C3_464172127930 == undefined) {
                        getPersonData();
                    }
                } else {
                    getPersonData();
                }

                function getPersonData() {
                    appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror)
                    console.log("--------------->" + me.record().C3_464172127930);
                    if (me.record().C3_464172127930 == null || me.record().C3_464172127930 == undefined) {
                        appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
                        function fnSuccess(data, subdata, total) {
                            // data[0].C3_471002935941 = 'N';
                            me.record(data[0]);

                            var timeC = timeControl.createTimeControl();
                            timeC.record = me.record();
                            timeC.initTimeControl();

                            appConfig.app.myreadRouter[0].title = record().C3_546344790488;
                            appConfig.app.myreadRouter[0].resid = record().C3_546344916192;
                            callback(data[0]);
                        }
                        function fnError(data) {
                            console.log("---------->error" + data.message);
                        }
                        function fnSyserror(jqXHR, textStatus, errorThrown) {
                            console.log("---------->Syserror" + jqXHR.message);
                        }
                    }
                }
            },
            routeMyWork2: function () {

                var propertyArr = [
                    "C3_464172127930",
                    "C3_464172148589",
                    "C3_464172157606",
                    "C3_464172188709",
                    "C3_464172212871",
                    "C3_464172226868",
                    "C3_464172266942",
                    "C3_464172300168",
                    "C3_464172350271",
                    "C3_464172402553",
                    "C3_546621946191",
                    "C3_464172522558",
                    "C3_464172654284",
                    "C3_464172707004",
                    "C3_464172722124",
                    "C3_464172819253",
                    "C3_464172852423",];

                var propertyStrArr = [
                    "姓名",
                    "英文名",
                    "性别",
                    "国籍",
                    "籍贯",
                    "民族",
                    "证件类型",
                    "证件号码",
                    "文书送达地址",
                    "现居住地址",
                    "手机号码",
                    "公司邮箱",
                    "学历",
                    "政治面貌",
                    "户籍类别",
                    "婚姻状况",
                    "生育状况"
                ];
                var containArr = [propertyArr, propertyStrArr];
                var self = this;
                var emptyArr = self.valiateForm(containArr);
                if (emptyArr.length == 0) {
                    appConfig.app.myworkshell.router.navigate("#mywork/mywork2");
                } else {
                    dialog.showMessage(emptyArr + "不能为空");
                }

            },
            valiateForm: function (containArr) {
                if (record().C3_471002935941 == 'Y') return [];
                var propertyArr = containArr[0];
                var propertyStrArr = containArr[1];
                if (propertyArr.length != propertyStrArr.length) return;

                var emptyArr = [];
                for (var i = 0; i < propertyArr.length; i++) {
                    var tempProp = record()[propertyArr[i]];
                    if (tempProp == undefined || tempProp == '') emptyArr.push(propertyStrArr[i]);
                }
                return emptyArr;
            }


        }

    }); 
