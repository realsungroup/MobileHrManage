define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'myworkshell/viewmodels/mywork1',
    'durandal/viewEngine','mobiscroll'], function (app, ko, router, dialog, mywork1, viewEngine,mobiscroll) {
        var record = ko.observable({});
        var haveRelative = ko.observable(false);//是否有亲戚
        var schoolModelArr = ko.observable([]), emptySchoolModelArr = [];
        var schoolNameArr = ['C3_464175119119', 'C3_464175141966', 'C3_464175301544', 'C3_464175313029', 'C3_464175387205'],
            startTimeArr = ['C3_464175402821', 'C3_464175419381', 'C3_464175427954', 'C3_464175436022', 'C3_464175447068'],
            endTimeArr = ['C3_464175464598', 'C3_464175479476', 'C3_464175490285', 'C3_464175539610', 'C3_464175553221'],
            majorArr = ['C3_464175628311', 'C3_464175642417', 'C3_464175653685', 'C3_464175665668', 'C3_464175678813'];


        return {
            activate: function () {
                var a = mywork1.record();
                var self = this;
                self.record(a);

                haveRelative(record().C3_466853434510 == 1 ? true : false);
            },
            record: record,
            schoolModelArr: schoolModelArr,
            haveRelative:haveRelative,
            attached: function () {
                //学校预加载
                var schoolModel = function (schoolName, startTime, endTime, major, index) {
                    this.schoolName = ko.observable(schoolName);
                    this.startTime = ko.observable(startTime);
                    this.endTime = ko.observable(endTime);
                    this.major = ko.observable(major);
                    this.index = index;
                }

                var tempArr = [];
                for (var i = 0; i < schoolNameArr.length; i++) {
                    var tempM = new schoolModel(record()[schoolNameArr[i]],
                        record()[startTimeArr[i]],
                        record()[endTimeArr[i]],
                        record()[majorArr[i]],
                        i);

                    if (record()[schoolNameArr[i]] != null || record()[startTimeArr[i]] != null || record()[endTimeArr[i]] != null || record()[majorArr[i]] != null) {
                        tempArr.push(tempM);
                    } else {
                        if(i == 0)tempArr.push(tempM);
                        else emptySchoolModelArr.push(tempM);
                    }
                }
                schoolModelArr(tempArr);

                ko.computed(function () {
                    for (var i = 0; i < schoolModelArr().concat(emptySchoolModelArr).length; i++) {
                        var tempM = schoolModelArr().concat(emptySchoolModelArr)[i];
                        record()[schoolNameArr[tempM.index]] = tempM.schoolName();
                        record()[startTimeArr[tempM.index]] = tempM.startTime();
                        record()[endTimeArr[tempM.index]] = tempM.endTime();
                        record()[majorArr[tempM.index]] = tempM.major();
                    }
                });

                ko.computed(function () {
                    record().C3_466853434510 = haveRelative() ? 1 : 0;
                    if (record().C3_466853434510 == 0) {
                        record().C3_464276899657 = '';
                        record().C3_464276983864 = '';
                        record().C3_464277008583 = '';
                        record().C3_464277095370 = '';
                        record().C3_464277151777 = '';
                        record().C3_464277179556 = '';
                        record(record());
                    }
                });

                 var timeC = timeControl.createTimeControl();
                    timeC.record = record();
                 timeC.initTimeControl();
            },
            //增加联系人
            addPersonView: function () {

                if (emptySchoolModelArr.length) {
                    var tempSchoolModelArr = schoolModelArr();
                    tempSchoolModelArr.push(emptySchoolModelArr[0]);
                    schoolModelArr(tempSchoolModelArr);

                    emptySchoolModelArr.splice(0, 1);
                    var timeC = timeControl.createTimeControl();
                timeC.record = record();
                timeC.initTimeControl();
                }
            },
            routeMyWork5: function () {
                var propertyArr = ['C3_464175119119',
                    'C3_464175402821',
                    'C3_464175464598',
                    'C3_464175628311',
                    'C3_464175727918',
                    'C3_464175750587',
                    'C3_464175797109',
                    'C3_464175768379'
                ];

                var propertyStrArr = [
                    "姓名",
                    "关系",
                    "联系方式",
                    "工作单位",
                    "紧急联系人姓名",
                    "关系",
                    "手机",
                    "地址",
                ];
                var containArr = [propertyArr, propertyStrArr];
                var emptyArr = mywork1.valiateForm(containArr);
                if (emptyArr.length == 0) {
                    appConfig.app.myworkshell.router.navigate("#mywork/mywork5");
                } else {
                    dialog.showMessage(emptyArr + "不能为空");
                }

            },
            routeBack: function () {
                appConfig.app.myworkshell.router.navigateBack();
            },
            cellDelete: function (index, data, event) {//删除
                var tempSchoolM = schoolModelArr()[index()];
                emptySchoolModelArr.push(tempSchoolM);
                schoolModelArr().splice(index(), 1);

            //    tempSchoolM.schoolName('');
            //     tempSchoolM.startTime('');
            //     tempSchoolM.endTime('');
            //     tempSchoolM.major('');

               record()[schoolNameArr[tempSchoolM.index]] = '';
                    record()[startTimeArr[tempSchoolM.index]] = '';
                    record()[endTimeArr[tempSchoolM.index]] = '';
                    record()[majorArr[tempSchoolM.index]] = '';

                schoolModelArr(schoolModelArr());
            },
        };
    });