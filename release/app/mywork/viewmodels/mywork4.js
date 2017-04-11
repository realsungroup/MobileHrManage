define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'myworkshell/viewmodels/mywork1',
    'durandal/viewEngine'], function (app, ko, router, dialog, mywork1, viewEngine) {
        var record = ko.observable({});
        var d = 0;

<<<<<<< HEAD
        var nameArr = ['C3_464175141966', 'C3_464175301544', 'C3_464175313029', 'C3_464175387205'],
            relationshipArr = ['C3_464175419381', 'C3_464175427954', 'C3_464175436022', 'C3_464175447068'],
            telArr = ['C3_464175479476', 'C3_464175490285', 'C3_464175539610', 'C3_464175553221'],
            workSpaceArr = ['C3_464175642417', 'C3_464175653685', 'C3_464175665668', 'C3_464175678813'];
=======
var nameArr = ['C3_464175141966','C3_464175301544','C3_464175313029','C3_464175387205'],
                relationshipArr=['C3_464175419381','C3_464175427954','C3_464175436022','C3_464175447068'],
                telArr = ['C3_464175479476','C3_464175490285','C3_464175539610','C3_464175553221'],
                workSpaceArr=['C3_464175642417','C3_464175653685','C3_464175665668','C3_464175678813'];
>>>>>>> a826b1046f3e561d5c7fd1f94ff46f6486888032

        return {
            activate: function () {
                var a = mywork1.record();
                var self = this;
                self.record(a);
            },
            record: record,
            attached: function () {
                var oldD = d;
                var self = this;
<<<<<<< HEAD
                for (var i = 0; i < nameArr.length; i++) {

                    if (self.record()[nameArr[i]] != null || self.record()[relationshipArr[i]] != null || self.record()[telArr[i]] != null || self.record()[workSpaceArr[i]] != null) {
                        d = i;
                        var idD = d + 1;
                        var list4 = `<tr id="jtbtr` + idD + `" class="topb">
                                <td><input type="text" data-bind="value:record().`+ nameArr[d] + `" placeholder="姓名"></td>
                                <td><input type="text" data-bind="value:record().`+ relationshipArr[d] + `" placeholder="关系"></td>
                            </tr>
                            <tr>
                                <td><input type="text" data-bind="value:record().`+ telArr[d] + `" placeholder="联系方式"></td>
                                <td><input type="text" data-bind="value:record().`+ workSpaceArr[d] + `" placeholder="工作单位"></td>
                            </tr>`;
                        $('#jtxxtbody').append(list4);
                        ko.applyBindings(self, $("#jtbtr" + idD)[0]);
                        ko.applyBindings(self, $("#jtbtr" + idD).next()[0]);
                        nameArr[i] = '';
                    }
                }
                d = oldD;
            },
            //增加联系人
            addPersonView: function () {
                var self= this;
                while (nameArr[d] == '') {
                    d++;
                    if (d > nameArr.length - 1) break;
                }

                if (d > nameArr.length - 1) return;

                var idD = d + 1;
                var list4 = `<tr id="jtbtr` + idD + `" class="topb">
                                <td><input type="text" data-bind="value:record().`+ nameArr[d] + `" placeholder="姓名"></td>
                                <td><input type="text" data-bind="value:record().`+ relationshipArr[d] + `" placeholder="关系"></td>
                            </tr>
                            <tr>
                                <td><input type="text" data-bind="value:record().`+ telArr[d] + `" placeholder="联系方式"></td>
                                <td><input type="text" data-bind="value:record().`+ workSpaceArr[d] + `" placeholder="工作单位"></td>
                            </tr>`;
                $('#jtxxtbody').append(list4);
                ko.applyBindings(self, $("#jtbtr" + idD)[0]);
                 ko.applyBindings(self, $("#jtbtr" + idD).next()[0]);
=======
                 for (var i = 0; i < nameArr.length; i++) {

                        if (self.record()[nameArr[i]] != null || self.record()[relationshipArr[i]] != null || self.record()[telArr[i]] != null ||self.record()[workSpaceArr[i]] != null) {
                            d = i;
                            var idD = d + 1;
                             var list4 = `<tr id="jtbtr` + idD + `" class="topb">
                                <td><input type="text" data-bind="value:record().`+nameArr[d]+`" placeholder="姓名"></td>
                                <td><input type="text" data-bind="value:record().`+relationshipArr[d]+`" placeholder="关系"></td>
                            </tr>
                            <tr>
                                <td><input type="text" data-bind="value:record().`+telArr[d]+`" placeholder="联系方式"></td>
                                <td><input type="text" data-bind="value:record().`+workSpaceArr[d]+`" placeholder="工作单位"></td>
                            </tr>`;
                $('#jtxxtbody').append(list4);
                 ko.applyBindings(self, $("#jtbtr" + idD)[0]);  
                  ko.applyBindings(self, $("#jtbtr" + idD).next()[0]); 
                             nameArr[i] = '';
                        }
                    }
d = oldD;
            },
            //增加联系人
            addPersonView: function () {

                while (nameArr[d] == '') {d++;
                        if(d > nameArr.length - 1) break;
                    }

                    if(d > nameArr.length - 1) return;
                
                   var idD = d + 1;
                var list4 = `<tr id="jtbtr` + idD + `" class="topb">
                                <td><input type="text" data-bind="value:record().`+nameArr[d]+`" placeholder="姓名"></td>
                                <td><input type="text" data-bind="value:record().`+relationshipArr[d]+`" placeholder="关系"></td>
                            </tr>
                            <tr>
                                <td><input type="text" data-bind="value:record().`+telArr[d]+`" placeholder="联系方式"></td>
                                <td><input type="text" data-bind="value:record().`+workSpaceArr[d]+`" placeholder="工作单位"></td>
                            </tr>`;
                $('#jtxxtbody').append(list4);
                ko.applyBindings(self, $("#jtbtr" + idD)[0]);   ko.applyBindings(self, $("#jtbtr" + idD).next()[0]); 
>>>>>>> a826b1046f3e561d5c7fd1f94ff46f6486888032
                d++;
            },
            //紧急联系人
            checkPerson: function () {

            },
            submitClickWork4: function () {//提交
                var self = this;
<<<<<<< HEAD
                if ($('#sureBox').is(":checked")) {
                    this.record().C3_466853434510 = 1;
                } else {
=======
                if($('#sureBox').is(":checked")) {
                    this.record().C3_466853434510 = 1;
                }else{
>>>>>>> a826b1046f3e561d5c7fd1f94ff46f6486888032
                    this.record().C3_466853434510 = 0;
                }
                mywork1.submitClick();
            }
        };
    });