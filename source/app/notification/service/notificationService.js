var notificationService = {
    getNotificationMainData: function (callback) {//政策公告获取列表
        var resid = appConfig.app.notificationRouter[0].resid;
        var cmswhere = '';
        appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
        function fnSuccess(data, subdata, total) {
            callback(data);
        }
        function fnError(data) {
            console.log("---------->error" + data.message);
            alert(data.message);
        }
        function fnSyserror(jqXHR, textStatus, errorThrown) {
            console.log("---------->Syserror" + jqXHR.message);
            alert(jqXHR.message);
        }
    },

    getNotificationDetailData:function(resid,callback){//根据政策公告id获取具体的公告内容
        var cmswhere = '';
        appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
        function fnSuccess(data, subdata, total) {
            callback(data);
        }
        function fnError(data) {
            console.log("---------->error" + data.message);
            alert(data.message);
        }
        function fnSyserror(jqXHR, textStatus, errorThrown) {
            console.log("---------->Syserror" + jqXHR.message);
            alert(jqXHR.message);
        }
    }
}

var notificationScope = {//
    notificationDetailModel:null
}
