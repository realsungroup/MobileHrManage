
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
 
appfunctions.system=new function(){
    this.maskLoading=function(msg){
       var loadingText='Loading';
       if(msg){
           loadingText=msg;

       }
        var opts = {
		lines: 13, // The number of lines to draw
		length: 7, // The length of each line
		width: 3, // The line thickness
		radius: 8, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		color: '#FFF', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
        var target = document.getElementById("applicationHost");
        var node=document.createElement("div");
        target.appendChild(node);
        node.setAttribute("class", "newDiv");
        var spinner = new Spinner(opts).spin(target);
        overlay = iosOverlay({
            text: loadingText,
            spinner: spinner
        });

        var w=window.screen.width;
        var h=window.screen.height;
        $('.ui-ios-overlay').css("top",h/2-120+"px");
        $('.ui-ios-overlay').css("left",w/2-50+"px");

    };
    this.maskSuccess=function(msg,callback){
        var loadingText='Success';
       if(msg){
           loadingText=msg;

       }
        overlay.update({
			icon: "/MobileTimeManage/lib/mask/img/check.png",
			text: loadingText
		});
            var self=this;
       setTimeout(function() {
            self.maskHide();
            if (callback)
            { callback();}
           
       }, 1000);
    };
     this.maskError=function(msg,callback){
           var loadingText='Error';
       if(msg){
           loadingText=msg;

       }
       iosOverlay({
		text: loadingText,
		duration: 2e3,
		icon: "/MobileTimeManage/lib/mask/img/cross.png"
	     });
         var self=this;
        setTimeout(function() {
            self.maskHide();
            if (callback)
            { callback();}
           
       }, 1000);
    };
    this.maskHide=function(){
        overlay.hide();
        $('.newDiv').remove();
    };
     this.wxconfig=null;
     this.uploadImage= function (url,localId, fieldNo, imgSeq,callback) {
        var self=this;
      //  alert("3");
      //  alert(url);
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                //   alert(serverId);
                //下载图片到本地
               // alert(url);
                self.downLoadImage(url,serverId, fieldNo, imgSeq,callback);
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    };
    this.downLoadImage=function (url,serverId, fieldNo, imgSeq,callback) {
        $.ajax({
           
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url:url+serverId.toString(),
            data: {},
            success: function (data) {
               
                if (data != null) {

                    callback(data);
                }

            },
            error: function (XMLHttpRequest) {
                alert(XMLHttpRequest.responseText);
            }
        });

    }
     this.SendValidMsg=function(url,callback,openid,telephone,unionid){

                   $.ajax({
                        url: url,
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        data:{"openid":openid,"telephone":telephone,"unionid":unionid},
                        success: function (text) {
                           if (text !== "") {
    
                                    callback(text);
                              }
                            else
                              {
                                    fnError("数据为空");
                              }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        if (fnSyserror != null) {
                              fnError("SendValidMsg:系统错误");
                        }
                        } });

     };
      this.AuthClient=function(url,callback,openid,telephone,unionid,validCode){
                    $.ajax({
                        url: url,
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        data:{"openid":openid,"telephone":telephone,"unionid":unionid,"validCode":validCode},
                        success: function (text) {
                           if (text !== "") {
    
                                    callback(text);
                              }
                            else
                              {
                                    fnError("数据为空");
                              }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        if (fnSyserror != null) {
                              fnError("SendValidMsg:系统错误");
                        }
                        } });

     };

     this.getWxconfig=function(url,callback){
               var self=this;   
               var requesturl=window.location.href;
             
                   $.ajax({
                        url: url,
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        data:{"requesturl":requesturl},
                        success: function (text) {
                           if (text !== "") {
                                    self.wxconfig=text;
                                    callback();
                                  //  alert(JSON.stringify(text));
                                    

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

              };
    this.TryinitWeiCat=function(url){
                    var self=this;
                    this.getWxconfig(url,function(){
                         self.initWeiCat(self.wxconfig.AppId,self.wxconfig.Timestamp,self.wxconfig.NonceStr,self.wxconfig.Signature);
                    });
                   

              };
    this.initWeiCat = function (AppId,Timestamp,NonceStr,Signature) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: AppId, // 必填，公众号的唯一标识
            timestamp: Timestamp, // 必填，生成签名的时间戳
            nonceStr: NonceStr, // 必填，生成签名的随机串
            signature: Signature,// 必填，签名
            jsApiList: ["checkJsApi",
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.error(function (res) {
            console.log(res);
            // alert('验证失败');
        });

        wx.ready(function () {


        });
    }
    this.setFullCalendar=function(dayClickCallback){
        
			    jQuery(document).ready(function() {
	           
				var date = new Date();
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
                var daycallback=dayClickCallback;
				var calendar = jQuery('#calendar').fullCalendar({
					header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,agendaWeek,agendaDay'
					},
					height:400,
					monthNames:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '11月', '12月'],
					dayNamesShort:[ '星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
					buttonText: {
						prev: '上个月',
						next: '下个月',
						prevYear: '&nbsp;&lt;&lt;&nbsp;',
						nextYear: '&nbsp;&gt;&gt;&nbsp;',
						today: '回到今天',
						month: 'month',
						week: 'week',
						day: 'day'
					},
					 
					selectable:true,
					dayClick: function(date) {
						var newDate=date.toString();
						var yyyy=date.getFullYear();
						var mm=date.getMonth();
						var dd=date.getDate();
						$('#calendar').fullCalendar( 'gotoDate', yyyy,mm,dd );
						daycallback(date);
					}
				});
				$('.fc-header-right').empty();
				
			});
				
		 

    }
     this.setUserConfig=function(adata)
    {
        appConfig.app.userConfig=adata;
       
    }
    this.setUserprofile=function(adata)
    
    {
         if (adata.EMP_LOGIN_URL==null|adata.EMP_LOGIN_URL=="")
        {
            adata.EMP_LOGIN_URL=appConfig.app.baseUrl;
        }
        appConfig.app.userProfile=adata;
       
    }
    this.setWeixinOpenid=function(openid)
    {
        appConfig.app.openid=openid;
        localStorage.setItem("wxopenid",openid);
        setCookie('wxopenid',openid,365);
    }
    this.setWeixinUnionId=function(unionid)
    {
        appConfig.app.unionid=unionid;
        localStorage.setItem("wxunionid",unionid);
        setCookie('wxunionid',unionid,365);
    }
    this.getWeixinUnionId=function()
    {
        if (appConfig.app.weixindebug)
           {
              return appConfig.app.debugunionid;
           }
          // debugger;
          if (localStorage.getItem("wxunionid")==undefined||localStorage.getItem("wxunionid")=='')
          {
              return getCookie('wxunionid');
          }
           return  localStorage.getItem("wxunionid");
    }
    this.getWeixinOpenid=function()
    {
        if (appConfig.app.weixindebug)
           {
              return appConfig.app.debugopenid;
           }
       if (localStorage.getItem("wxopenid")==undefined||localStorage.getItem("wxopenid")=='')
          {
              return getCookie('wxopenid');
          }
         
           return  localStorage.getItem("wxopenid");
    }
    this.checkWeixinOpenid=function()
    {
        if (appConfig.app.weixindebug)
           {
              return true;
           }
        var openid=this.getWeixinOpenid();
          if (openid=="null"||openid==null||openid=='')
          {
              return false;
          }
          return true;
          
    }
     this.checkWeixinUnionId=function()
    {
        if (appConfig.app.weixindebug)
           {
              return true
           }
        var unionid=this.getWeixinUnionId();
        if (unionid=="null"||unionid==null||unionid=='')
          {
              return false;
          }
          return true;
          
          
    }
    this.clearAppConfig=function(){
         appConfig.app.dbs=null;
         appConfig.app.userConfig=null;
         appConfig.app.userProfile=null;
        // localStorage.clear();
    }
    this.setAppConfig=function(adata){
         appConfig.app.userConfig=adata;
         appConfig.app.userProfile=adata;
    }
    this.setAppUserdata=function(adata){
       
        localStorage.setItem("userdata",JSON.stringify(adata));
    }
    this.getAppUserdata=function(){
        var userdata=localStorage.getItem("userdata");
        if (userdata!==null&&userdata!==undefined&&userdata!="")
        { 
            return JSON.parse(userdata); 
        }
        else
        {
            return null;
        }
       
    }
    this.setAppDbs=function(dbs){
         appConfig.app.dbs=dbs;
         localStorage.setItem("dbs",JSON.stringify(dbs));
    }
    this.getAppDbs=function(){
        var dbs=localStorage.getItem("dbs");
        if (dbs!==null&&dbs!==undefined&&dbs!="")
        { 
            return JSON.parse(dbs); 
        }
        else
        {
            return null;
        }
       
    }

    this.doWindowlogin=function(text,fnSuccess,fnError){
                   
                    var data;
                    var self =this;   
                    if (typeof(text)=="string")
                    {
                       data=JSON.parse(text);
                    }
                    else
                    {
                       data=text;
                    }
                    if (data.error==undefined)
                    {
                        if (fnError != null) {
                            fnError("登入失败!");
                            return;
                        }
                    }
                   
                     if (data.data==undefined)
                    {
                        if (fnError != null) {
                            fnError("登入失败!");
                            return;
                        }
                    }  
                      if (data.data==null||data.data==undefined)
                    {
                        if (fnError != null) {
                            fnError("登入失败!");
                            return;
                        }
                    }
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data.message);
                            return ;
                        }
                    }
                    var adata = [];
                    var subdata = [];
                    var total=0;
                   
                  
                   
                   adata = data.data;
                 
                     
                   
                    if (fnSuccess != null) {
                        self.setAppConfig(adata);
                        self.setAppUserdata(adata);
                        var dbh=new dbHelper(appConfig.app.baseUrl,appConfig.app.userConfig.LoginID,appConfig.app.userConfig.PassEncrypted);
                        var aRecord=new onerecord(adata.REC_ID,"modified");
                        var records=[];
                        var aUser={"EMP_NAME":""};
                        aUser.EMP_NAME=appConfig.app.userConfig.Name;
                        $.extend(aUser,aRecord);
                        records.push(aUser);
                        var json=JSON.stringify(records);
                        dbh.dbSavedata(appConfig.app.hostwebpos,0,json,fnsaved,fnnosave,fnsyserror);
                        function fnsaved(returnText)
                        {
                            try {
                                  if (typeof(returnText)=='object')
                                  {
                                     self.setUserprofile(returnText.data[0]);
                                  }
                                   if (typeof(returnText)=='string')
                                  {
                                     self.setUserprofile(JSON.parse(returnText).data[0]);
                                  }
                                  
                                  localStorage.setItem('doWindowlogin',JSON.stringify(appConfig.app.userConfig));
                                  fnSuccess("登入成功!");
                                  return;
                                
                            } catch (error) {
                                  
                                    
                               
                                fnError(JSON.stringify(error));
                                self.clearAppConfig();
                                return ;
                            }
                             
                        }
                        function fnnosave(error)
                        {
                             self.clearAppConfig();
                             fnError(error.message);
                             return ;
                        }
                        function fnsyserror(error)
                        {
                             self.clearAppConfig();
                             fnError("系统错误");
                            return ;
                        }
                    }
    }
    this.TryWindowlogin=function(openid,fnSuccess,fnError,fnSyserror)
    {
        var url;
        var cmswhere="C3_511297475786='"+openid+"'";               
        var self=this;
        url = appConfig.app.baseUrl + "&method=" + appConfig.app.getMethod + "&user=" + appConfig.app.hostuser + "&AccessToken=" + appConfig.app.hostucode + "&resid=" + appConfig.app.hostwebpos + "&cmswhere=" + cmswhere;
          $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                   self.doWindowlogin(text,fnSuccess,fnError);
                }
                else
                {
                    fnError("数据为空");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnError("doWindowlogin:系统错误");
                }
            } });
    }
    this.doLoginbyunionid=function(unionid,fnSuccess, fnError, fnSyserror)
    {

                this.doLoginbyopenid(unionid,fnSuccess, fnError, fnSyserror);
    }
    this.doLoginbyopenid=function(openid,fnSuccess, fnError, fnSyserror) {
         var url;
         var self=this;
           url = appConfig.app.loginUrl +"&apitoken=KingOfDinner123456789&clienttype=mobile&openid="+openid;
           $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                    
                    if (data.error !== 0) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    else{  
                        if (fnSuccess != null) {
                          
                            //fnSuccess(data);
                             self.doWindowlogin(text,fnSuccess,fnError);
                          }
                        }
                   }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });

     
    }
    this.doLogin=function(user,upass,fnSuccess, fnError, fnSyserror) {

           var url;
           url = appConfig.app.loginUrl +"&apitoken=KingOfDinner123456789&clienttype=mobile&user="+user+"&upass="+upass;
           $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                    if (data.error !== 0) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    else{  
                        if (fnSuccess != null) {
                          
                            fnSuccess(data);
                          }
                        }
                   }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });

     };
}
appfunctions.uploadFile = new function () {
    var uploadFile = this;
    this.swfFileUpload = function (aappConfig, fileupload) {
        fileupload.setUploadUrl(aappConfig.app.uploadFileUrl + "?savepath=e:\\web\\rispweb\\upfiles&httppath=" + aappConfig.app.httppath);
        fileupload.startUpload();
    };
this.ajaxFileUpload = function (aappConfig, inputFile) {
        mini.parse();
        scriptLoaded();
        function scriptLoaded() {
            alert('scriptLoaded');
            $.ajaxFileUpload({
                url: aappConfig.app.uploadFileUrl,
                fileElementId: inputFile,
                data: { savepath: "e:\\web\\rispweb\\upfiles" },
                dataType: 'json',
                success: function (data, status) {
                    if (data) {
                        alert("上传成功: " + data);
                    }
                    else {
                        alert("上传成功,无返回信息 ");
                    }
                },
                error: function (data, status, e) {
                    alert(e);
                },
                complete: function () {
                    var jq = $("#file1 > input:file");
                    jq.before(inputFile);
                    jq.remove();
                }
            });
        }
    };


};
var onerecord=(function()
{
    function onerecord(id,action)
    {
        this._id=1;
        this._state=action;
        this.REC_ID=id;
    }
    return onerecord;
}());
var dbHelper = (function () {
    function dbHelper(baseurl, user, AccessToken) {

        this.saveMethod = appConfig.app.saveMethod;
        this.getMethod = appConfig.app.getMethod;
        this.getBysqlMethod=appConfig.app.getBysqlMethod;
        this.GetCmsColumnsMethod=appConfig.app.GetCmsColumnsMethod;
        if (baseurl=="")
        {
            this.baseUrl = appConfig.app.baseUrl;
        }
        else
        {
             this.baseUrl = baseurl;
        }
        this.user = user;
        this.AccessToken = AccessToken;
    }
        dbHelper.prototype.dbGetLittleDataBysql = function (resid, f3svc_sql, fnSuccess, fnError, fnSyserror)
    {
        var url;
        url = this.baseUrl + "&method=" + this.getBysqlMethod;
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
             type: 'post',
            data:{AccessToken:this.AccessToken,user:this.user,resid:resid,subresid:subresid,cmswhere:cmswhere,key:key,hostrecid:hostrecid,cmsorder:cmsorder,f3svc_sql:f3svc_sql},
           
            success: function (text) {
                if (text !== "") {
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                   
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    var adata = [];
                   
                    var total=0;
                    adata = data.data;
                    if (data.total)
                    {  total = data.total;}
                  
                    if (fnSuccess != null) {

                        fnSuccess(adata,total);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });

    }
    dbHelper.prototype.dbGetCmsColumns = function (resid, fnSuccess, fnError, fnSyserror,dfd)
    {
        var url;
        url = this.baseUrl + "&method=" +this.GetCmsColumnsMethod;
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            type: 'post',
            data:{AccessToken:this.AccessToken,user:this.user,resid:resid,subresid:subresid,cmswhere:cmswhere,key:key,hostrecid:hostrecid,cmsorder:cmsorder},
           
            success: function (text) {
                if (text !== "") {
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                   
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data,dfd);
                        }
                    }
                    var adata = [];
                   
                    var total=0;
                    adata = data.data;
                    if (data.total)
                    {  total = data.total;}
                  
                    if (fnSuccess != null) {

                        fnSuccess(adata,total,dfd);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown,dfd);
                }
            } });

    }
    dbHelper.prototype.GetRelTableByHostRecord=function(resid,subresid,hostrecid,cmswhere,cmsorder,pageSize,pageIndex,fnSuccess, fnError, fnSyserror,dfd)
    {
        
        var url;
        if (cmswhere==undefined){cmswhere="";}
        if (cmsorder==undefined){cmswhere="";}
        if (pageSize=undefined){pageSize=0;}
        // appConfig.appfunction.system.maskLoading();
        url = this.baseUrl + "&method=ajax_GetRelTableByHostRecord";
        
        if ((pageSize >0))
        {
             url=url+"&pageIndex="+pageIndex+"&pageSize="+pageSize;
        }
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            type: 'post',
            data:{AccessToken:this.AccessToken,user:this.user,resid:resid,subresid:subresid,cmswhere:cmswhere,key:key,hostrecid:hostrecid,cmsorder:cmsorder},
            success: function (text) {
             
                if (text !== "") {
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data,dfd);
                            return;
                        }
                    }
                    var adata = [];
                 
                    var total=0;
                    adata = data.data;
                    if (data.total)
                    {  total = data.total;}
                 
                    
                    if (fnSuccess != null) {
                        
                        fnSuccess(data,dfd);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown,dfd);
                }
            } });
    }
    dbHelper.prototype.dbGetdata = function (resid, subresid, key,cmswhere, fnSuccess, fnError, fnSyserror,pageSize,pageIndex) {
        var url;
        // appConfig.appfunction.system.maskLoading();
        url = this.baseUrl + "&method=" + this.getMethod;
        if ((pageSize >0))
        {
             url=url+"&pageIndex="+pageIndex+"&pageSize="+pageSize;
        }
        
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
             type: 'post',
             data:{AccessToken:this.AccessToken,user:this.user,resid:resid,subresid:subresid,cmswhere:cmswhere,key:key},
            success: function (text) {
               // appConfig.appfunction.system.maskHide();
                if (text !== "") {
                    var data;
                    if (typeof(text)=='object')
                    {
                        data =text;
                    }
                    else
                    {
                        data = JSON.parse(text);
                    }
                   
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data);
                            return;
                        }
                    }
                    var adata = [];
                    var subdata = [];
                    var total=0;
                    adata = data.data;
                    if (data.total)
                    {  total = data.total;}
                 
                    if (data.subdata != null) {
                        subdata = data.subdata.data;
                    }
                    if (fnSuccess != null) {
                        
                        fnSuccess(adata, subdata,total);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });
    };
    dbHelper.prototype.doDbSavedata = function (resid, subresid, json, url,fnSuccess, fnError, fnSyserror,dfd) {
         $.ajax({
            url: url,
            async: false,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            type: 'post',
            data: { data: json, resid: resid,AccessToken:this.AccessToken},
            cache: false,
            success: function (text) {
                if (text.error == "0") {
                    if (fnSuccess != null) {
                        fnSuccess(text,dfd);
                    }
                }
                else {
                    if (fnError != null) {
                        fnError(text,dfd);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown,dfd);
                }
            }
        });

    }

    dbHelper.prototype.dbSavedata = function (resid, subresid, json, fnSuccess, fnError, fnSyserror,dfd) {
        var url;
        url = this.baseUrl + "&method=" + this.saveMethod + "&user=" + this.user;
        dbHelper.prototype.doDbSavedata(resid, subresid, json, url,fnSuccess, fnError, fnSyserror,dfd);
    };
    dbHelper.prototype.dbSavedataWithparm = function (resid, subresid, json,withoutdata,formulalayer,synchronizedat, fnSuccess, fnError, fnSyserror,dfd) {
        var url;
        url = this.baseUrl + "&method=" + this.saveMethod + "&user=" + this.user+"&withoutdata="+withoutdata+"&formulalayer="+formulalayer+"&synchronizedat="+synchronizedat;
        dbHelper.prototype.doDbSavedata(resid, subresid, json, url,fnSuccess, fnError, fnSyserror,dfd);
    };
    dbHelper.prototype.dbSavedataWithparm2 = function (resid, subresid, json,withoutdata,formulalayer,synchronizedat,uniquecolumns, fnSuccess, fnError, fnSyserror,dfd) {
        var url;
        url = this.baseUrl + "&method=" + this.saveMethod + "&user=" + this.user +"&withoutdata="+withoutdata+"&formulalayer="+formulalayer+"&synchronizedat="+synchronizedat+"&uniquecolumns="+uniquecolumns;
        dbHelper.prototype.doDbSavedata(resid, subresid, json, url,fnSuccess, fnError, fnSyserror,dfd);
    };
    return dbHelper;
}());
var miniPanel = (function () {
    function miniPanel(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }
    miniPanel.prototype.start = function () {
        var _this = this;
        var jsonString = '{"messge": "ok","error":"-1"}';
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toLocaleTimeString(); }, 500);
    };
    miniPanel.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    miniPanel.prototype.appendPanel = function (parentelement, panelid, mini, classname, title, url, fnload, expanded, iconCls) {
        this.mini_control = document.createElement('div');
        this.mini_control.id = panelid;
        this.mini_control.className = classname;
        this.mini_control.title = title;
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({ "width": "auto", "height": "800", "iconCls": iconCls, "expanded": expanded, "onbuttonclick": "onbuttonclick" });
        aPanel.load(url, function () {
            var iFrame = aPanel.getIFrameEl();
            fnload(iFrame);
        }, null);
    };
    return miniPanel;
}());
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var str=(window.location.href);
    str=str.substr(str.indexOf("?"));
    var r = str.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function onbuttonclick(e) {
    if (e.name = "collapse") {
        setTimeout(function () {
            if (e.sender.expanded == true) {
                e.sender.set({ "height": "400px" });
            }
        }, 500);
    }
}
function fullScreen(el) {  
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,  
        wscript;  
   
    if(typeof rfs != "undefined" && rfs) {  
        rfs.call(el);  
        return;  
    }  
   
    if(typeof window.ActiveXObject != "undefined") {  
        wscript = new ActiveXObject("WScript.Shell");  
        if(wscript) {  
            wscript.SendKeys("{F11}");  
        }  
    }  
}  
  
function exitFullScreen(el) {  
    var el= document,  
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,  
        wscript;  
   
    if (typeof cfs != "undefined" && cfs) {  
      cfs.call(el);  
      return;  
    }  
   
    if (typeof window.ActiveXObject != "undefined") {  
        wscript = new ActiveXObject("WScript.Shell");  
        if (wscript != null) {  
            wscript.SendKeys("{F11}");  
        }  
  }  
}
Date.prototype.format = function(format)
 {
  var o = {
  "M+" : this.getMonth()+1, //month
  "d+" : this.getDate(),    //day
  "h+" : this.getHours(),   //hour
  "m+" : this.getMinutes(), //minute
  "s+" : this.getSeconds(), //second
  "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
  "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
  (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
  format = format.replace(RegExp.$1,
  RegExp.$1.length==1 ? o[k] :
  ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
 }

 function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
 
//取回cookie
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}
function generateUUID() {
var d = new Date().getTime();
var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = (d + Math.random()*16)%16 | 0;
  d = Math.floor(d/16);
  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
});
return uuid;
};

//设置cookie，有效期为365天
//setCookie('username','123',365);
 
//取回，若cookie失效，将返回空
//getCookie('username');