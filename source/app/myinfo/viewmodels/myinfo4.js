define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
     
    return  {
        activate:function () { 
            
        },
        attached:function(){
            var d=1;
            $('#btn4').click(function(){
                var list4=`<tr id="jtbtr`+d+`" class="topb">
                                <td><input type="text" placeholder="姓名"></td>
                                <td><input type="text" placeholder="关系"></td>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="联系方式"></td>
                                <td><input type="text" placeholder="工作单位"></td>
                            </tr>`;
                $('#jtxxtbody').append(list4);
                d++;
            });
            $('#qy').hide();
            var i=0;
            $('#cbox').click(function(){
                if(i%2==0){
                    $('#qy').show();
                }else{
                    $('#qy').hide();
                }
                i++
            });
        }
    };
});