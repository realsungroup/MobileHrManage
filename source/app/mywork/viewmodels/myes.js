define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'signature','myworkshell/viewmodels/mywork1','editbase'], function (app, ko, router, dialog, jquery, signature,mywork1,editbase) {
      var record = ko.observable({});
      return {
            activate: function () {
                  record(mywork1.record());

            },
            record:record,
            attached: function () {
                  if ($('.js-signature').length) {
                        $('.js-signature').jqSignature();
                  }

                  $('.js-signature').on('jq.signature.changed', function () {
                        $('#saveBtn').attr('disabled', false);
                  });
            },
            clearCanvas: function () {
                  $('#signature').html('<p><em>Your signature will appear here when you click "Save Signature"</em></p>');
                  $('.js-signature').jqSignature('clearCanvas');
                  $('#saveBtn').attr('disabled', true);
            },

            saveSignature: function () {//上传签名图片
                  $('#signature').empty();
                  var dataUrl = $('.js-signature').jqSignature('getDataURL');//获取dataurl
                  function dataURLtoBlob(dataurl) {//转换成blob对象
                        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                        while (n--) {
                              u8arr[n] = bstr.charCodeAt(n);
                        }
                        return new Blob([u8arr], { type: mime });
                  }
                    var blob = dataURLtoBlob(dataUrl);


                  var xhr = new XMLHttpRequest();
                  var upUrlStr =appConfig.app.uploadFileUrl+ '?savepath=c:\\web\\web\\rispweb\\upfiles&httppath=' + appConfig.app.httppath;//alert(upUrlStr);
                  xhr.open('POST', upUrlStr);
                  xhr.onload = function () {
                        var data = JSON.parse(xhr.response);
                        if (xhr.status === 200) {
                              alert("上传成功");
                              var imgUrl = data.httpfilename;
                              console.log(imgUrl);

                              mywork1.record()['C3_544732637200'] = imgUrl;
                              record(mywork1.record());
                        } else {
                              // 处理错误
                              alert('error==' + data);
                        }
                  };


                  var fd = new FormData();
                  fd.append("file", blob, 'hello.png');//新建formdata提交，png格式
                  xhr.send(fd);

            },
            routeBack: function () {
                appConfig.app.myworkshell.router.navigateBack();
            },
            
            submitClick: function () {
                  if(mywork1.record().C3_544732637200 == undefined && mywork1.record.C3_544732637200 == ''){
                        dialog.showMessage("请重新上传签名");
                        return;
                  }

                  if( mywork1.record().C3_471002935941 == "Y"){
                        dialog.showMessage("已提交");
                        return;
                  }

                var recid = mywork1.record().REC_ID;
                var dfd = {};
                var resid = appConfig.app.myworkRouter[0].resid;
                var editService = new editbase(resid, recid);
                 mywork1.record().C3_471002935941 = "Y";
                editService.saveData(mywork1.record()).then(function (e) {
                    if (e.error == 0) {
                          var tempRecord = mywork1.record(); 
                          tempRecord.C3_471002935941 = "Y";
                          mywork1.record(tempRecord);
                        dialog.showMessage(e.message, '').then(function (dfd) {
                               appConfig.app.myworkshell.router.navigate("#mywork");
                        });
                    } else{
                           mywork1.record().C3_471002935941 = "N";
                           dialog.showMessage(e.message, '');
                    } 
                }, function (error) {
                       mywork1.record().C3_471002935941 = "N";
                    dialog.showMessage(error, '');
                });
            }
      };
});

// define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll','signature'], 
//     function (app,ko,router,dialog,jquery,system,mobiscroll,signature) {
//           var work=new myworkbase();
//       work.clearCanvas=function() {
// 			$('#signature').html('<p><em>Your signature will appear here when you click "Save Signature"</em></p>');
// 			$('.js-signature').jqSignature('clearCanvas');
// 			$('#saveBtn').attr('disabled', true);
// 		}

// 		work.saveSignature=function(){
// 			$('#signature').empty();
// 			var dataUrl = $('.js-signature').jqSignature('getDataURL');
// 			var img = $('<img>').attr('src', dataUrl);
// 			$('#signature').append($('<p>').text("Here's your signature:"));
// 			$('#signature').append(img);
// 		}

//        work.activate=function(action,resid,recid,e){

//               work._activate(action,resid,recid,null,this,e);
//              //appConfig.app.subtitle("");
//        }
//        work.attached=function(){

// 			if ($('.js-signature').length) {
// 				$('.js-signature').jqSignature();
// 			};




// 		$('.js-signature').on('jq.signature.changed', function() {
// 			$('#saveBtn').attr('disabled', false);
// 		});

//        }

//        return work ;
// }); 