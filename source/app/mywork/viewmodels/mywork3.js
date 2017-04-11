define(['durandal/system',
    'durandal/app',
    'knockout',
    'plugins/router',
    'plugins/dialog',
    'myworkshell/viewmodels/mywork1',
    'durandal/viewEngine'],
    function (system, app, ko, router, dialog, mywork1, viewEngine) {
        var record = ko.observable({});
        var c = 0;

         var 
                        companyArr = ['C3_464174984491','C3_464174996449','C3_464175006600','C3_464175018059','C3_464184617666','C3_464184632072' , 'C3_464184646428']// ,'C3_464184667700' ,'C3_464184684084' ],
                        startTimeArr = ['C3_464174545465','C3_464174554658','C3_464174563152','C3_464174573064','C3_464184450091', 'C3_464184471833','C3_464184501566']//,'C3_464184513520' , 'C3_464184524990' ],
                        endTimeArr = ['C3_464174895167','C3_464174904208','C3_464174917676','C3_464174917676','C3_464184549928' , 'C3_464184561329' ,'C3_464184573250']// , 'C3_464184588079' , 'C3_464184598956' ],
                        workArr = ['C3_464175060992','C3_464175072014','C3_464175085490','C3_464175096695','C3_464184700316' ,'C3_464184712050' , 'C3_464184725595' ]//, 'C3_464184738647','C3_464184751863' ],
                        reasonArr = ['C3_464458911775','C3_464458921788', 'C3_464458930539', 'C3_464458948125','C3_464458958829' ,'C3_464458970171','C3_464458979179' ];


        return {
            activate: function () {
                var a = mywork1.record();
                var self = this;
                self.record(a);

                idC = c +　1;
            },
            record: record,
            attached: function () {
                 var oldC = c;
                 var self = this;
                    for (var i = 0; i < companyArr.length; i++) {
 
                        if (self.record()[companyArr[i]] != null||self.record()[workArr[i]] != null||self.record()[startTimeArr[i]] != null||self.record()[endTimeArr[i]] != null
                        ||self.record()[reasonArr[i]] != null
                        ) {
                            c = i;
var idC = c +　1;
 var list = `<tr id="btr` + idC + `" class="topb">
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td colspan="2">
                                                    <input type="text" data-bind="value:record().`+companyArr[c]+`" placeholder="公司名称">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="50%"><input type="text" data-bind="value:record().`+startTimeArr[c]+`" placeholder="开始日期:1980-01-01"></td>
                                                <td width="50%"><input type="text" data-bind="value:record().`+endTimeArr[c]+`" placeholder="结束日期:1980-01-01"></td>
                                            </tr>
                                            <tr>
                                                <td><input type="text" data-bind="value:record().`+workArr[c]+`" placeholder="职称"></td>
                                                <td><input type="text" data-bind="value:record().`+reasonArr[c]+`" placeholder="离职原因"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>`;

                            $(" #gzjltbody").append(list);
                            ko.applyBindings(self, $("#btr" + idC)[0]); 
                            companyArr[i] = '';
                        }
                    }

                    c = oldC

            },
            addWorkView: function () {//添加工作栏目
                while (companyArr[c] == '') {c++;
                        if(c > companyArr.length - 1) break;
                    }

                    if(c > companyArr.length - 1) return;
                   var self = this;
                var idC = c +　1;
 var list = `<tr id="btr` + idC + `" class="topb">
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td colspan="2">
                                                    <input type="text" data-bind="value:record().`+companyArr[c]+`" placeholder="公司名称">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="50%"><input type="text" data-bind="value:record().`+startTimeArr[c]+`" placeholder="开始日期:1980-01-01"></td>
                                                <td width="50%"><input type="text" data-bind="value:record().`+endTimeArr[c]+`" placeholder="结束日期:1980-01-01"></td>
                                            </tr>
                                            <tr>
                                                <td><input type="text" data-bind="value:record().`+workArr[c]+`" placeholder="职称"></td>
                                                <td><input type="text" data-bind="value:record().`+reasonArr[c]+`" placeholder="离职原因"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>`;
                $('#gzjltbody').append(list);

                ko.applyBindings(self, $("#btr" + idC)[0]); 
                c++;
            },
            submitClickWork3: function () {//提交
                mywork1.submitClick();
            }
        };
    });