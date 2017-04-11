define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
     
    return  {
        activate:function () { 
            
        },
        attached:function(){
            var c=1;
            $('#btn3').click(function(){
                var list3=`<tr id="btr`+c+`" class="topb">
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td colspan="2">
                                                    <input type="text" placeholder="公司名称">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="50%"><input type="text" placeholder="开始日期"></td>
                                                <td width="50%"><input type="text" placeholder="结束日期"></td>
                                            </tr>
                                            <tr>
                                                <td><input type="text" placeholder="职称"></td>
                                                <td><input type="text" placeholder="离职原因"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>`;
                $('#gzjltbody').append(list3);
                c++;
            });
        }
    };
});