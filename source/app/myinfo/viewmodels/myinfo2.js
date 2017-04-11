define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
     
    return  {
        activate:function () { 
            
        },
        attached:function(){
            var a=b=1;
            $('#btn2').click(function(){
                var list2=`<tr id="jybtr`+a+`" class="topb">
                                <td colspan="2">
                                    <input type="text" placeholder="学校名称">
                                </td>
                            </tr>
                            <tr>
                                <td width="50%"><input type="text" placeholder="开始日期"></td>
                                <td width="50%"><input type="text" placeholder="结束日期"></td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="专业"></td>
                                <td>
                                    <select>
                                        <option value="高中">高中</option>
                                        <option value="大专">大专</option>
                                        <option value="本科">本科</option>
                                        <option value="硕士">硕士</option>
                                        <option value="博士">博士</option>
                                    </select>
                                </td>
                            </tr>`;
                $('#jyxxtbody').append(list2);
                a++;
            });
            $('#btn1').click(function(){
                var list1=`<tr id="jyftr`+b+`" class="topb">
                                <td><input type="text" placeholder="职业资格证书"></td>
                                <td><input type="text" placeholder="等级"></td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="颁发机构"></td>
                                <td><input type="text" placeholder="获得日期"></td>
                            </tr>`;
                $('#jyxxtfoot').append(list1);
                b++;
            });
        }
    };
});