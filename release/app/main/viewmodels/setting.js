define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog,scanner,shell) {
   
  
   
       return  {
              activate:function () { 
                    appConfig.app.subtitle('setting')
                  },
              reload:function(){
                    router.navigate("http://finisar.realsun.me/mobileTimeManage/#setting");


              },
              wxconfig:null,
              rebind:function(){
                         router.navigate(appConfig.app.approoturl+"/#"+"weixinauthaccount");
              },
              clearlocal:function(){ localStorage.clear();},
              getconfig:function(){
               var self=this;
               var requesturl=window.location.href;
               var url="http://finisar.realsun.me/RSAuth/GetSignature"
                   $.ajax({
                        url: url,
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        data:{"requesturl":requesturl},
                        success: function (text) {
                           if (text !== "") {
                                    self.wxconfig=text;
                                    alert(JSON.stringify(text));
                              }
                            else
                              {
                                    fnError("数据为空");
                              }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        if (fnSyserror != null) {
                              fnError("getwxconfig:系统错误");
                        }
                        } });

              },
              initWeiCat:function(){
                    appConfig.appfunction.system.initWeiCat(this.wxconfig.AppId,this.wxconfig.Timestamp,this.wxconfig.NonceStr,this.wxconfig.Signature);

              },
              chooseimage2:function(){
                    $("#input1").val('1');
                       wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                              var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                $("#input1").val('2');
                               $("#input1").val(localIds.toString());
                              appConfig.appfunction.system.uploadImage(appConfig.app.downLoadWxImageUrl,localIds.toString(), "", "",
                                    callback=function(data){
                                           alert("2");

                                          var imageurl=data.Data;
                                           alert(imageurl);
                                          $("#image1")[0].src=imageurl;

                              });
                                
                              }
                  });
              }
              
             
        };
}); 