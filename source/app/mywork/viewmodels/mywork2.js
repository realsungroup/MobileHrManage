define(['durandal/system',
    'durandal/app',
    'knockout',
    'plugins/router',
    'plugins/dialog',
    'myworkshell/viewmodels/mywork1',
    'durandal/viewEngine'],
    function (system, app, ko, router, dialog, mywork1, viewEngine) {
        var record = ko.observable({});
        var a = 0, b = 0;
        var certificateArr = ['C3_464174102741', 'C3_464174124614', 'C3_464174135706', 'C3_464174225362'],
            lvArr = ['C3_464174263309', 'C3_464174274118', 'C3_464174314278', 'C3_464174325345'],
            organArr = ['C3_464174365244', 'C3_464174394548', 'C3_464174405591', 'C3_464174418555'],
            dataArr = ['C3_464174461446', 'C3_464174473180', 'C3_464174481889', 'C3_464174491548'];

var schoolNameArr = ['C3_464173723045', 'C3_464173733523', 'C3_464173750564', 'C3_464173763887'],
                        startTimeArr = ['C3_464173514735', 'C3_464173524810', 'C3_464173535280', 'C3_464173544689'],
                        endTimeArr = ['C3_464173639392', 'C3_464173646851', 'C3_464173667723', 'C3_464173677006'],
                        majorArr = ['C3_464173847918', 'C3_464173861459', 'C3_464173879808', 'C3_464173890490'],
                        eduArr = ['C3_464173926575', 'C3_464173937460', 'C3_464173949368', 'C3_464173962533'];

        return {
            activate: function () {
                var a = mywork1.record();
                var self = this;
                self.record(a);

            },
            record: record,
            attached: function () {
                var self = this;
                preLoadView = function () {//预加载
                    var oldA = a;
                    var oldb = b;

                    for (var i = 0; i < certificateArr.length; i++) {

                        if (self.record()[certificateArr[i]] != null||self.record()[lvArr[i]] != null||self.record()[organArr[i]] != null||self.record()[dataArr[i]] != null) {
                            b = i;
                            var idB = b + 1;
                            var listA = `<tr   id="jyftr` + idB + `" class="topb">
                                    <td><input type="text" data-bind="value:record().`+ certificateArr[b] + `" placeholder="职业资格证书"></td>
                                    <td><input type="text" data-bind="value:record().`+ lvArr[b] + `" placeholder="等级"></td>
                                </tr>
                                <tr>
                                    <td><input type="text" data-bind="value:record().`+ organArr[b] + `" placeholder="颁发机构"></td>
                                    <td><input type="text" data-bind="value:record().`+ dataArr[b] + `" placeholder="获得日期"></td>
                                    
                                </tr>`;
                            $(" #jyxxtfoot").append(listA);
                            ko.applyBindings(self, $("#jyftr" + idB)[0]); ko.applyBindings(self, $("#jyftr" + idB).next()[0]);
                            certificateArr[i] = '';
                        }
                    }


                    for (var i = 0; i < schoolNameArr.length; i++) {

                        if (self.record()[schoolNameArr[i]] != null || self.record()[startTimeArr[i]] != null || self.record()[endTimeArr[i]] != null ||self.record()[majorArr[i]] != null) {
                            a = i;
                            var idA = a + 1;
                             var list = `<tr id="jybtr` + idA + `" class="topb">
                                    <td colspan="2">
                                         <input type="text" data-bind="value:record().`+ schoolNameArr[a] + `" placeholder="学校名称">
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><input type="text" data-bind="value:record().`+ startTimeArr[a] + `" placeholder="开始日期:1980-01-01"></td>
                                    <td width="50%"><input type="text" data-bind="value:record().`+ endTimeArr[a] + `" placeholder="结束日期:1980-01-01"></td>
                                </tr>
                                <tr>
                                    <td><input type="text" data-bind="value:record().`+ majorArr[a] + `" placeholder="专业"></td>
                                    <td>
                                        <select data-bind="value:record().`+ eduArr[a] + `">
                                            <option value="高中">高中</option>
                                            <option value="大专">大专</option>
                                            <option value="本科">本科</option>
                                            <option value="硕士">硕士</option>
                                            <option value="博士">博士</option>
                                        </select>
                                    </td>
                                </tr>`;
                            $(" #jyxxtbody").append(list);
                             ko.applyBindings(self, $("#jybtr" + idA)[0]); ko.applyBindings(self, $("#jybtr" + idA).nextAll()[0]);ko.applyBindings(self, $("#jybtr" + idA).nextAll()[1]);
                             schoolNameArr[i] = '';
                        }
                    }

                    a = oldA;
                    b = oldb;
                }

                preLoadView();
            },
            changeview: function (strID) {
                var self = this;

while (certificateArr[b] == '') {b++;
                        if(b > certificateArr.length - 1) break;
                    }

                    if(b > certificateArr.length - 1) return;

                if (strID == "btn1") {//添加证书
                    if (certificateArr[b] == '') b++;

                    var idB = b + 1;
                    var listA = `<tr   id="jyftr` + idB + `" class="topb">
                                    <td><input type="text" data-bind="value:record().`+ certificateArr[b] + `" placeholder="职业资格证书"></td>
                                    <td><input type="text" data-bind="value:record().`+ lvArr[b] + `" placeholder="等级"></td>
                                </tr>
                                <tr>
                                    <td><input type="text" data-bind="value:record().`+ organArr[b] + `" placeholder="颁发机构"></td>
                                    <td><input type="text" data-bind="value:record().`+ dataArr[b] + `" placeholder="获得日期"></td>
                                    
                                </tr>`;


                    $(" #jyxxtfoot").append(listA);
                    ko.applyBindings(self, $("#jyftr" + idB)[0]); ko.applyBindings(self, $("#jyftr" + idB).next()[0]);

                    b++;
                } else if (strID == "btn2") {//添加学校
                     while (schoolNameArr[a] == '') {a++;
                        if(a > schoolNameArr.length - 1) break;
                    }

                    if(a > schoolNameArr.length - 1) return;

var idA = a + 1;
                    var list = `<tr id="jybtr` + idA + `" class="topb">
                                    <td colspan="2">
                                         <input type="text" data-bind="value:record().`+ schoolNameArr[a] + `" placeholder="学校名称">
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%"><input type="text" data-bind="value:record().`+ startTimeArr[a] + `" placeholder="开始日期:1980-01-01"></td>
                                    <td width="50%"><input type="text" data-bind="value:record().`+ endTimeArr[a] + `" placeholder="结束日期:1980-01-01"></td>
                                </tr>
                                <tr>
                                    <td><input type="text" data-bind="value:record().`+ majorArr[a] + `" placeholder="专业"></td>
                                    <td>
                                        <select data-bind="value:record().`+ eduArr[a] + `">
                                            <option value="高中">高中</option>
                                            <option value="大专">大专</option>
                                            <option value="本科">本科</option>
                                            <option value="硕士">硕士</option>
                                            <option value="博士">博士</option>
                                        </select>
                                    </td>
                                </tr>`;
                   
                    $(" #jyxxtbody").append(list);
 ko.applyBindings(self, $("#jybtr" + idA)[0]); ko.applyBindings(self, $("#jybtr" + idA).nextAll()[0]);ko.applyBindings(self, $("#jybtr" + idA).nextAll()[1]);
                     a++;
                }
            },
            submitClickWork2: function () {//提交
                mywork1.submitClick();
            }
        };
    });