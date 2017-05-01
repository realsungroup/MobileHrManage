define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'myworkshell/viewmodels/mywork1'], function (app, ko, router, dialog, mywork1) {
      var resid = appConfig.app.myreadRouter[0].resid;
      var myread1Record = ko.observable({});
      var myreadPerson = ko.observable({});
      var myreadBool = ko.observable('');
      return {
            activate: function () {
                  var self = this,
                      cmswhere = '';

                  var a = mywork1.record();
                  self.myreadBool(a.C3_544732585319);

                  appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
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
                  mywork1.record()['C3_544732585319'] = self.myreadBool();
                  mywork1.submitClick();
            }
      };
}); 