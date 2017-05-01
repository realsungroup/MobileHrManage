define(['durandal/system'],function(system,require){
  var editbase = function(resid, recid){
    this.resid = resid;
    this.recid = recid;
    this.dfd={};
     var that=this;
  };
 function fnSuccess(returnText,dfd){
    try {
            
                dfd.resolve(returnText);
                return;
              
          } catch (error) {
               
                dfd.reject(error);
                
              return ;
          }
       
  }
  
   function fnError(returnText,dfd){
    try {
            
                dfd.resolve(returnText);
                return;
              
          } catch (error) {
               
                dfd.reject(error);
                
              return ;
          }
       
  }
  function fnsaved(returnText,dfd){
    try {
            
                dfd.resolve(returnText);
                return;
              
          } catch (error) {
               
                dfd.reject(error);
                
              return ;
          }
       
  }
function fnnosave(error,dfd){
          
          dfd.reject(error.message);
          return ;
       }
function fnsyserror(jqXHR, textStatus, errorThrown,dfd){
          
         dfd.reject("系统错误");
        return ;
}
  editbase.prototype.getData = function(){
  
  };
  editbase.prototype.editoraddData=function(row,uniqueColumns)
  {
      var aRecord=new onerecord(0,"editoradd");
      var records=[];
      var self=this;
      row=$.extend(row,aRecord);
      records.push(row);
      var json=JSON.stringify(records);
      if (uniqueColumns==undefined){
         var uniqueColumns="";
      }

      return system.defer(function(dfd){
         try {
             appConfig.app.dbs.dbSavedataWithparm2(self.resid,0,json,"0","1","1",uniqueColumns, fnSuccess, fnError, fnsyserror,dfd);
             
           
         } catch (error) {
            dfd.reject(error);
           
         }
      }).promise();
  }
  editbase.prototype.addData = function(row){
      var aRecord=new onerecord(0,"added");
      var records=[];
      var self=this;
      row=$.extend(row,aRecord);
      records.push(row);
      var json=JSON.stringify(records);
      return system.defer(function(dfd){
         try {
             appConfig.app.dbs.dbSavedata(self.resid,0,json,fnsaved,fnnosave,fnsyserror,dfd);
           
         } catch (error) {
            dfd.reject(error);
           
         }
      }).promise();
  };
   editbase.prototype.saveBatchData = function(rows){
      var json=JSON.stringify(rows);
        var self=this;
      return system.defer(function(dfd){
         try {
             appConfig.app.dbs.dbSavedata(self.resid,0,json,fnsaved,fnnosave,fnsyserror,dfd);
           
         } catch (error) {
            dfd.reject(error);
           
         }
        
      
      }).promise();
   }
  editbase.prototype.saveData = function(row){
      var aRecord=new onerecord(row.REC_ID,"modified");
      var records=[];
      var self=this;
      row=$.extend(row,aRecord);
      records.push(row);
      var json=JSON.stringify(records);
      return system.defer(function(dfd){
         try {
             appConfig.app.dbs.dbSavedata(self.resid,0,json,fnsaved,fnnosave,fnsyserror,dfd);
           
         } catch (error) {
            dfd.reject(error);
           
         }
        
      
      }).promise();
     
   
  };
  editbase.prototype.getSubData=function(subresid,cmswhere,cmsorder,pageSize,pageIndex,dfd)
  {
    var self=this;
     return system.defer(function(dfd){
         try {
             appConfig.app.dbs.GetRelTableByHostRecord(self.resid,subresid,self.recid,cmswhere,cmsorder,pageSize,pageIndex,fnSuccess, fnError, fnsyserror,dfd)
           
         } catch (error) {
            dfd.reject(error);
           
         }
      
      }).promise();
  }
  editbase.prototype.modifyDataField = function(hash){
    //do some ajax and return a promise
      var aRecord=new onerecord(this.recid,"modified");
      var records=[];
      var self=this;
      var row=$.extend(hash,aRecord);
      records.push(row);
      var json=JSON.stringify(records);
      return system.defer(function(dfd){
         try {
             appConfig.app.dbs.dbSavedata(self.resid,0,json,fnsaved,fnnosave,fnsyserror,dfd);
           
         } catch (error) {
            dfd.reject(error);
           
         }
        
      
      }).promise();
  };
   
   editbase.prototype.deletebyrecid = function(){
    //do some ajax and return a promise
      var aRecord=new onerecord(this.recid,"deleted");
      var records=[];
      var self=this;
     
      records.push(aRecord);
      var json=JSON.stringify(records);
      return system.defer(function(dfd){
         try {
             appConfig.app.dbs.dbSavedata(self.resid,0,json,fnsaved,fnnosave,fnsyserror,dfd);
           
         } catch (error) {
            dfd.reject(error);
           
         }
        
      
      }).promise();
  };
  return editbase;
});