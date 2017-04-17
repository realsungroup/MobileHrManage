// define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'durandal/binder', 'myworkshell/viewmodels/mywork1'], function (app, ko, router, dialog, binder, mywork1) {
define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'editbase', 'durandal/system', 'editform', 'durandal/binder', 'durandal/viewEngine', 'myworkshell/viewmodels/mywork1'],
    function (app, ko, router, dialog, jquery, editbase, system, editform, binder, viewEngine,mywork1) {

      var myreadOneResid = appConfig.app.myreadRouter[0].resid;

      var myread1Record = ko.observable({});
      var myreadBool = ko.observable('');
      return {

            activate: function () {

                  var self = this,
                        cmswhere = '';
                  self.myreadBool(mywork1.record().C3_544732580995);
                  if (mywork1.record().C3_544732580995 == undefined) {
                        mywork1.getData(function (data) {
                              self.myreadBool(mywork1.record().C3_544732580995);
                        });
                  }

                  appConfig.app.dbs.dbGetdata(myreadOneResid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
                  function fnSuccess(data, subdata, total) { 

                        self.myread1Record(data[0]);
                  }
                  function fnError(data) {
                        console.log("---------->error" + data.message);
                  }
                  function fnSyserror(jqXHR, textStatus, errorThrown) {
                        console.log("---------->Syserror" + jqXHR.message);

                  }
            },
            myread1Record: myread1Record,
            myreadBool: myreadBool,
            attached: function () {

            },
            read: function () {
                  var self = this;
                  if (self.myreadBool() == 'Y') return;
                  self.myreadBool('Y');
                  mywork1.record()['C3_544732580995'] = self.myreadBool();
                  mywork1.submitClick();
            },
      };
}); 