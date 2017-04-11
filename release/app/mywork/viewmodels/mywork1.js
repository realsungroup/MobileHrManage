define(['durandal/app', 'knockout', 'plugins/router', 'plugins/dialog', 'jquery', 'editbase', 'durandal/system', 'editform', 'durandal/binder', 'durandal/viewEngine'],
    function (app, ko, router, dialog, jquery, editbase, system, editform, binder, viewEngine) {
        var record = ko.observable({});
        var resid = appConfig.app.myworkRouter[0].resid;
        resid = "543089753581";
        return {
            
            activate: function () {
                this.getData(function(){});
            },
            record: record,
            attached: function () {

            },

            submitClick: function () {
                var recid = this.record().REC_ID;
                var dfd = {};

                var editService = new editbase(resid, recid);
                editService.saveData(this.record()).then(function (e) {
                    if (e.error == 0) {
                        dialog.showMessage(e.message, '').then(function (dfd) {

                        });
                    } else dialog.showMessage(e.message, '');
                }, function (error) {
                    dialog.showMessage(error, '');
                });
            },
            getData:function(callback){
                var cmswhere = "", cp = {};
                var me = this;
<<<<<<< HEAD
                // console.log("--------------->"+me.record().C3_464172127930);
                if('C3_464172127930' in me.record()){
                if (me.record().C3_464172127930 == null || me.record().C3_464172127930 == undefined) {
                   getPersonData();
                }
            }else{
                getPersonData();
            }

            function getPersonData(){
                appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
=======
                console.log("--------------->"+me.record().C3_464172127930);
                if (me.record().C3_464172127930 == null || me.record().C3_464172127930 == undefined) {
                    appConfig.app.dbs.dbGetdata(resid, 0, "", cmswhere, fnSuccess, fnError, fnSyserror);
>>>>>>> a826b1046f3e561d5c7fd1f94ff46f6486888032
                    function fnSuccess(data, subdata, total) {
                        me.record(data[0]);
                        callback(data[0]);
                    }
                    function fnError(data) {
                        console.log("---------->error" + data.message);
                    }
                    function fnSyserror(jqXHR, textStatus, errorThrown) {
                        console.log("---------->Syserror" + jqXHR.message);
                    }
<<<<<<< HEAD
            }
            }
=======
                }
            }

>>>>>>> a826b1046f3e561d5c7fd1f94ff46f6486888032

        }

    }); 
