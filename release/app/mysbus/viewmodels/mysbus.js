define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {  
      var oList =  ko.observable([]),
      timeList = ko.observable([]);
      var sbusid=appConfig.app.mysbusRouter[0].sbusid; sbusid = '540469384880';
      var subid=appConfig.app.mysbusRouter[0].subid;subid = '540469400782';
      return  {
            activate:function () { 

            },
            oList:oList,
            timeList:timeList,
            attached:function(){
            var cmswhere = "", cp = {};
                var me = this;
                    appConfig.app.dbs.dbGetdata(sbusid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
                    function fnSuccess(data, subdata, total) {
                        me.oList(data);

                        me.oChange();
                    }
                    function fnError(data) {
                        console.log("---------->error" + data.message);
                    }
                    function fnSyserror(jqXHR, textStatus, errorThrown) {
                        console.log("---------->Syserror" + jqXHR.message);
                    
                }

                aaaaaa=function(){
                      console.log("sssss");
                }
            },
            oChange:function(){
                  var cmswhere = "C3_540473907719 = '" +$('#bs option:selected').text() + "'";
                  // cmswhere = '';
                var me = this;
                    appConfig.app.dbs.dbGetdata(subid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
                    function fnSuccess(data, subdata, total) {
                        me.timeList(data);
                    }
                    function fnError(data) {
                        console.log("---------->error" + data.message);
                    }
                    function fnSyserror(jqXHR, textStatus, errorThrown) {
                        console.log("---------->Syserror" + jqXHR.message);
                    
                }
                  console.log("---->"+$('#bs option:selected').text());
            }
      };
}); 