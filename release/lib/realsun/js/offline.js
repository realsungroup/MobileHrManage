 
 var onloadFn = function() {
     colors = {
       progress: "#FFA",
       done: "#AFA",
       error: "#FAA",
       other: "#AAA"
     }
     var displayUpdate = function(message, color) {
           document.getElementById("cache_status").innerHTML = message;
           document.getElementById("cache_status").style.setProperty('background-color', color);
     }
 if (typeof window.applicationCache !== "undefined") {
   var eventList = {
     "cached" : [ "应用更新完成,请关闭窗口重新打开应用", colors.done ],
     "checking" : [ "检查应用更新...", colors.progress ],
     "downloading" : [ "应用下载...", colors.progress ],
     "noupdate" : [ "应用已更新.", colors.done ],
     "obsolete" : [ "缓存过期...", colors.error ],
     "progress" : [ "正在更新程序,请稍候...", colors.progress ],
     "updateready" : [ "准备更新...", colors.other ]};
 function cachedCallback(e) {
    //console.log("Cache event: " + e.type + "(status is " + window.applicationCache.status + ", online is " + navigator.onLine + ")");
   
     if (navigator.onLine) {
       displayUpdate(eventList[e.type][0], eventList[e.type][1]);
        online = navigator.onLine;
	    //console.log('Loaded: ' + (online ? 'Online' : 'Offline'));
        }
     else{
        // displayUpdate("您已离线!", colors.done);
     }
    if (window.applicationCache.status==1||window.applicationCache.status==4){
        
        if (window.location.pathname=="/")
        {
           // alert("goto app");
          //  setTimeout(function() {window.location="app.html";}, 500);
             setTimeout(function() {location.reload(true)}, 500);
        }
     }

 }
  
 var updateReady = function() {
        // window.applicationCache.swapCache();
         setTimeout(function() {location.reload(true)}, 100);} 
         window.applicationCache.addEventListener('cached', cachedCallback, false);
         window.applicationCache.addEventListener('checking', cachedCallback, false);
         window.applicationCache.addEventListener('downloading', cachedCallback, false);
       
         window.applicationCache.addEventListener('noupdate', cachedCallback, false);
         window.applicationCache.addEventListener('obsolete', cachedCallback, false);
         window.applicationCache.addEventListener('progress', cachedCallback, false);
         window.applicationCache.addEventListener('updateready', updateReady, false);}
 else {
  displayUpdate("对不起, 您的浏览器不支持应用缓存...", colors.error);
  }
 };