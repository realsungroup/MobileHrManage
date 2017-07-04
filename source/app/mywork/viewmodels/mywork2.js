define(['durandal/system',
    'durandal/app',
    'knockout',
    'plugins/router',
    'plugins/dialog',
    'myworkshell/viewmodels/mywork1',
    'durandal/viewEngine',
    'durandal/viewLocator',
    'mobiscroll'],
    function (system, app, ko, router, dialog, mywork1, viewEngine, viewLocator, addSchool, mobiscroll) {
        var record = ko.observable({});
        var allSchoolModelArr = [];
        var schoolModelArr = ko.observable([]), emptySchoolModelArr = [];
        var cerModelArr = ko.observable([]), emptyCerModelArr = [];
        var certificateArr = ['C3_464174073888', 'C3_464174102741', 'C3_464174124614', 'C3_464174135706', 'C3_464174225362'],
            lvArr = ['C3_464174245669', 'C3_464174263309', 'C3_464174274118', 'C3_464174314278', 'C3_464174325345'],
            organArr = ['C3_464174345857', 'C3_464174365244', 'C3_464174394548', 'C3_464174405591', 'C3_464174418555'],
            dataArr = ['C3_464174451732', 'C3_464174461446', 'C3_464174473180', 'C3_464174481889', 'C3_464174491548'];

        var schoolNameArr = ['C3_464173711606', 'C3_464173723045', 'C3_464173733523', 'C3_464173750564', 'C3_464173763887'],
            startTimeArr = ['C3_464173481804', 'C3_464173514735', 'C3_464173524810', 'C3_464173535280', 'C3_464173544689'],
            endTimeArr = ['C3_464173629942', 'C3_464173639392', 'C3_464173646851', 'C3_464173667723', 'C3_464173677006'],
            majorArr = ['C3_464173836290', 'C3_464173847918', 'C3_464173861459', 'C3_464173879808', 'C3_464173890490'],
            eduArr = ['C3_464173912562', 'C3_464173926575', 'C3_464173937460', 'C3_464173949368', 'C3_464173962533'];

        return {
            activate: function () {
                var a = mywork1.record();
                var self = this;
                self.record(a);
            },
            record: record,
            schoolModelArr: schoolModelArr,
            cerModelArr: cerModelArr,
            attached: function () {

                //学校预加载
                var schoolModel = function (schoolName, startTime, endTime, major, edu, index) {
                    this.schoolName = ko.observable(schoolName);
                    this.startTime = ko.observable(startTime);
                    this.endTime = ko.observable(endTime);
                    this.major = ko.observable(major);
                    this.edu = ko.observable(edu);
                    this.index = index;
                }

                var tempArr = [];
                for (var i = 0; i < schoolNameArr.length; i++) {
                    var tempM = new schoolModel(record()[schoolNameArr[i]],
                        record()[startTimeArr[i]],
                        record()[endTimeArr[i]],
                        record()[majorArr[i]],
                        record()[eduArr[i]],
                        i);

                    if (record()[schoolNameArr[i]] != null || record()[startTimeArr[i]] != null || record()[endTimeArr[i]] != null || record()[majorArr[i]] != null) {
                        tempArr.push(tempM);
                    } else {
                        if (i == 0) tempArr.push(tempM);
                        else emptySchoolModelArr.push(tempM);
                    }
                    allSchoolModelArr.push(tempM);
                }
                schoolModelArr(tempArr);


                //证书预加载
                var cerModel = function (cer, lv, organ, data, index) {
                    this.cer = ko.observable(cer);
                    this.lv = ko.observable(lv);
                    this.organ = ko.observable(organ);
                    this.data = ko.observable(data);
                    this.index = index;
                }

                var tempCerArr = [];
                for (var i = 0; i < certificateArr.length; i++) {
                    var tempM = new cerModel(record()[certificateArr[i]],
                        record()[lvArr[i]],
                        record()[organArr[i]],
                        record()[dataArr[i]],
                        i);

                    if (record()[certificateArr[i]] != null || record()[lvArr[i]] != null || record()[organArr[i]] != null || record()[dataArr[i]] != null) {
                        tempCerArr.push(tempM);
                    } else {
                        if (i == 0) tempCerArr.push(tempM);
                        else emptyCerModelArr.push(tempM);
                    }
                }
                cerModelArr(tempCerArr);

                ko.computed(function () {
                    // alert("1" + schoolModelArr()[0].schoolName() +'------'+record().C3_464173723045);
                    for (var i = 0; i < schoolModelArr().concat(emptySchoolModelArr).length; i++) {
                        var tempM = schoolModelArr().concat(emptySchoolModelArr)[i];
                        record()[schoolNameArr[tempM.index]] = tempM.schoolName();
                        record()[startTimeArr[tempM.index]] = tempM.startTime();
                        record()[endTimeArr[tempM.index]] = tempM.endTime();
                        record()[majorArr[tempM.index]] = tempM.major();
                        record()[eduArr[tempM.index]] = tempM.edu();
                    }

                });

                ko.computed(function(){
                    for (var i = 0; i < cerModelArr().concat(emptyCerModelArr).length; i++) {
                        var tempM = cerModelArr().concat(emptyCerModelArr)[i];
                        record()[certificateArr[tempM.index]] = tempM.cer();
                        record()[lvArr[tempM.index]] = tempM.lv();
                        record()[organArr[tempM.index]] = tempM.organ();
                        record()[dataArr[tempM.index]] = tempM.data();
                        console.log("------->" + record()[certificateArr[tempM.index]]);
                    }
                }) 




                var timeC = timeControl.createTimeControl();
                timeC.record = record();
                timeC.initTimeControl();
            },
            changeview: function (strID) {
                var self = this;

                if (strID == "btn1") {//添加证书
                    if (emptyCerModelArr.length) {
                        var tempArr = cerModelArr();
                        tempArr.push(emptyCerModelArr[0]);
                        cerModelArr(tempArr);

                        emptyCerModelArr.splice(0, 1);
                    }
                } else if (strID == "btn2") {//添加学校
                    if (emptySchoolModelArr.length) {
                        var tempSchoolModelArr = schoolModelArr();
                        tempSchoolModelArr.push(emptySchoolModelArr[0]);
                        schoolModelArr(tempSchoolModelArr);

                        emptySchoolModelArr.splice(0, 1);
                    }
                }
                var timeC = timeControl.createTimeControl();
                timeC.record = record();
                timeC.initTimeControl();
            },
            submitClickWork2: function () {//提交
                mywork1.submitClick();
            },
            routeMyWork3: function () {

                var propertyArr = ['C3_464173711606',
                    'C3_464173481804',
                    'C3_464173629942',
                    // 'C3_464173836290',
                    'C3_464173912562', 'C3_464174073888',
                    'C3_464174245669'
                ];

                var propertyStrArr = [
                    "学校名称",
                    "教育开始时间",
                    "教育结束时间",
                    // "专业",
                    "学历",
                    "证书名称",
                    "等级"
                ];
                var containArr = [propertyArr, propertyStrArr];
                var emptyArr = mywork1.valiateForm(containArr);
                if (emptyArr.length == 0) {
                    appConfig.app.myworkshell.router.navigate("#mywork/mywork3");
                } else {
                    dialog.showMessage(emptyArr + "不能为空");
                }


            },
            routeBack: function () {
                appConfig.app.myworkshell.router.navigateBack();
            },
            cellDelete: function (str, index, data, event) {//删除
                if( mywork1.record().C3_471002935941 == "Y"){
                        dialog.showMessage("已提交数据不能删除");
                        return;
                  }
                if (str == 'school') {
                    var tempSchoolM = schoolModelArr()[index()];
                    emptySchoolModelArr.push(tempSchoolM);
                    schoolModelArr().splice(index(), 1);

                    tempSchoolM.schoolName('');
                    tempSchoolM.startTime('');
                    tempSchoolM.endTime('');
                    tempSchoolM.major('');
                    tempSchoolM.edu('');

                    schoolModelArr(schoolModelArr());
                } else if (str == 'cer') {
                    var tempSchoolM = cerModelArr()[index()];
                    emptyCerModelArr.push(tempSchoolM);
                    cerModelArr().splice(index(), 1);
                    tempSchoolM.cer('');
                    tempSchoolM.lv('');
                    tempSchoolM.organ('');
                    tempSchoolM.data('');

                    cerModelArr(cerModelArr());
                }
            }
        };
    });