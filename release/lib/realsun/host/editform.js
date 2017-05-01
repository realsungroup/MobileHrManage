define(['durandal/app','knockout','plugins/router','plugins/dialog','jquery','durandal/system','mobiscroll','editbase'],function (app,ko,router,dialog,jquery,system,mobiscroll,editbase){
      
       var editform={
           formdata:ko.observable({}),
           subdata:ko.observableArray([]),
           subresid:0,
           originaldata:{},
           editservice:null,
           savebutton:false,
           action:'',
           back:function(){router.navigateBack()},
           saveform:function(dfd,failCallBack){
            var self=this;
           
            
             if (this.action=='edit')

             { 
                appConfig.appfunction.system.maskLoading(" ");
                 this.editservice.saveData(this.formdata()).then(function(e){
                   if (e.error==0)
                   {
                    //    dialog.showMessage(e.message,'').then(function(){ 
                    //        self.formdata(e.data[0]);
                    //        dfd.resolve('');
                    //     });
                       appConfig.appfunction.system.maskSuccess(e.message,function(){
                            self.formdata(e.data[0]);
                            dfd.resolve('');
                       });
                       
                   }
                   else
                   {
                       appConfig.appfunction.system.maskHide();
                       dialog.showMessage(e.message,'');
                       failCallBack();
                   }
              },function(error){
                       appConfig.appfunction.system.maskHide();
                       dialog.showMessage(error,'');
                       failCallBack();
              }) ;}
              else if (this.action=='add'){
                  appConfig.appfunction.system.maskLoading(" ");
                  this.editservice.addData(this.formdata()).then(function(e){
                    if (e.error==0)
                    {
                        // dialog.showMessage(e.message,'').then(function(){
                        //    dfd.resolve(e);
                        // });
                         appConfig.appfunction.system.maskSuccess(e.message,function(){
                           
                            dfd.resolve(e);
                       });
                        
                    }
                    else
                    {
                        appConfig.appfunction.system.maskHide();
                        dialog.showMessage(e.message,'');
                         failCallBack();
                    }
                 },function(error){
                        appConfig.appfunction.system.maskHide();
                        dialog.showMessage(error,'');
                         failCallBack();
                 }) ;

              }
              else
              {
                    dialog.showMessage('浏览状态,无法编辑记录');
              }
            
           },
           cancelform:function(){
                this.formdata(this.originaldata);
                
           },
           getSubData:function(callback){
               var self=this;
               if (this.subresid)
                     {
                         if (this.subresid>0)
                         {
                             var dfd={};
                             var promise=this.editservice.getSubData(this.subresid,"","",0,0,dfd);
                              promise.then(function(data){
                                  self.subdata(data.data);
                                  system.log(self.subdata());
                                  callback();
                              })

                         }
                          callback();
                     }
                      callback();
           
              
           },
           activate:function(resid,recid,json,action,row,subresid)
           {
            if (subresid)
            {
               this.subresid=subresid;
            }
             
             this.action=action;
             var self=this;
             switch (action) {
                 case 'edit':
                     self.editservice=new editbase(resid,recid);
                       self.subdata([]);
                     self.getSubData(function(){
                       
                         self.originaldata=$.extend({},JSON.parse(json));
                  
                         self.formdata(row);
                         self.savebutton=true;
                         self.cancelbutton=true;

                     });
                     
                  
                     break;
                  case 'add':
                      self.editservice=new editbase(resid,0);
                      self.originaldata=$.extend({},JSON.parse(json));
                      self.formdata(JSON.parse(json));
                      self.savebutton=true;
                      self.cancelbutton=false;
                      self.subdata([]);
                     break;
                 
                  case 'browse':
                      self.editservice=new editbase(resid,recid);
                        self.subdata([]);
                      self.getSubData(function(){
                          
                            self.originaldata=$.extend({},JSON.parse(json));
                            self.formdata(JSON.parse(json));
                            self.savebutton=false;
                            self.cancelbutton=true;
                      });
                     break;
                 default:
                     break;
             }
              
           
               
           },
          attached:function (){
              if (this.editservice==null)
              {
                  
              }
              if  (this.action!=='browse'){
                   $(function() {
                            var currYear = (new Date()).getFullYear();
                            var opt = {};
                           // opt.date = { preset: 'date' };
                            //opt.datetime = { preset: 'datetime' };
                            // opt.time = { preset: 'time' };
                            opt.default = {
                                theme: 'bootstrap', //皮肤样式
                                display: 'center', //显示方式
                                mode: 'scroller', //日期选择模式
                                dateFormat: 'yy-mm-dd',
                                timeFormat:'HH:ii',
                                preset: 'datetime',
                                lang: 'zh',
                                showNow: true,
                                steps: { 
                                            minute: 0,
                                            second: 5,
                                            zeroBased: true
                                        },
                                nowText: "今天",
                                startYear: currYear, //开始年份
                                endYear: currYear + 2, //结束年份
                            };
                            // $(".appDate").mobiscroll($.extend(opt['date'], opt['default']));
                            // $('.appSelect').mobiscroll().select({
                            //                 theme: 'ios',      // Specify theme like: theme: 'ios' or omit setting to use default
                            //                 lang: 'zh',   // Specify language like: lang: 'pl' or omit setting to use default
                            //                 display: 'center',  // Specify display mode like: display: 'bottom' or omit setting to use default
                            //                 mode: 'scroller',        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-mode
                            //                 inputClass:'iclass',
                            //                 minWidth: 100                  // More info about minWidth: https://docs.mobiscroll.com/3-0-0_beta2/select#!opt-minWidth
                            //             });
                        });
                    }
             
          }

       };
      
       return editform ;
}); 