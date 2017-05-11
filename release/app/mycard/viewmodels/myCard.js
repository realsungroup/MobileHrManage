define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'signature', 'myworkshell/viewmodels/mywork1', 'editbase'],
      function (app, ko, router, dialog, jquery, signature, mywork1, editbase) {
            var globThis;
            var isAdd = ko.observable(false);
            var btnTitle = ko.observable('添加');
            var cardRecord = ko.observable({
                  'C3_547144148292':'',//账号姓名
                  'C3_547144218383':'',//开户行信息
                  'C3_547032175037': '',//银行卡号
                  'C3_547032183338': ''//银行卡照片地址
            });
            var cardResid = appConfig.app.myCardRouter[0].resid;
            return {
                  activate: function () {
                        globThis = this;
                        var cmswhere = '';
                        appConfig.app.dbs.dbGetdata(cardResid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
                        function fnSuccess(data) {

                              //  data[0].C3_547032183338 = 'http://finisartest.realsun.me//WxImages/20170502135453518.png';
                              if(data['length']) cardRecord(data[0]);
                              isAdd(true);
                              btnTitle('申请');
                        }
                        function fnError(data) {
                              console.log("---------->error" + data.message);
                        }
                        function fnSyserror(jqXHR, textStatus, errorThrown) {
                              console.log("---------->Syserror" + jqXHR.message);

                        }
                  },
                  attached: function () {
                  },
                  btnTitle: btnTitle,
                  isAdd: isAdd,
                  cardRecord: cardRecord,
                  addClick: function () {
                        isAdd(true);
                        btnTitle('申请');
                  },
                  submitClick: function () {
                        var tempEditBase = new editbase(cardResid, 0);
                        tempEditBase.editoraddData(cardRecord(), 'C3_547032175037').then(function (e) {
                              if (e.error == 0) {
                                    alert("提交成功");
                              } else {
                                    alert(e.message);
                              }
                        }, function (error) {
                              alert(error.message);
                        });
                  },
                  carmerClick: function () {
                        var that = this;
                        wx.chooseImage({
                              count: 1, // 默认9
                              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                              success: function (res) {
                                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

                                    appConfig.appfunction.system.uploadImage(appConfig.app.downLoadWxImageUrl, localIds.toString(), "", "",
                                          callback = function (data) {
                                                var imageurl = data.Data;
                                                alert('上传成功');
                                                cardRecord().C3_547032183338 = imageurl;
                                                cardRecord(cardRecord());
                                          });
                              }
                        });
                  }

            };
      });
