define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'signature','myworkshell/viewmodels/mywork1'], function (app, ko, router, dialog, jquery, signature,mywork1) {
      return {
            activate: function () {


            },
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
                  xhr.open('POST', 'http://kingofdinner.realsun.me:8081/rispweb/rispservice/SvcUploadFile2.aspx?savepath=c:\\web\\web\\rispweb\\upfiles&httppath=http://kingofdinner.realsun.me:8081/rispweb/upfiles');
                  xhr.onload = function () {
                        var data = JSON.parse(xhr.response);
                        if (xhr.status === 200) {
                              console.log("上传成功");
                              var imgUrl = data.httpfilename;
                              console.log(imgUrl);

                              mywork1.record()['C3_544732637200'] = imgUrl;
                              mywork1.submitClick();
                        } else {
                              // 处理错误
                              alert('error==' + data);
                        }
                  };


                  var fd = new FormData();
                  fd.append("file", blob, 'hello.png');//新建formdata提交，png格式
                  xhr.send(fd);

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