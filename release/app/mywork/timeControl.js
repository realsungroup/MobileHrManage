var timeControl = {
    record:{"C3_471002935941":"N"},
    createTimeControl: function () {
        var timeC = {};
        timeC.initTimeControl = function () {

            var now = new Date();
               max = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());

            var opt = {};
            // opt.date = { preset: 'date' };
            //opt.datetime = { preset: 'datetime' };
            // opt.time = { preset: 'time' };
            opt.default = {
                theme: 'ios', //皮肤样式
                display: 'center', //显示方式
                mode: 'scroller', //日期选择模式
                dateFormat: 'yy-mm-dd',
                timeFormat: '',
                preset: 'datetime',
                lang: 'zh',
                showNow: true,
                nowText: "今天",
                max: max
            };

            if(this.record == undefined) return;
            if (this.record.C3_471002935941 == "Y") {
                $('.appDate').mobiscroll('destroy');
            } else {
                $(".appDate").mobiscroll($.extend(opt['date'], opt['default']));
            }
        }
        return timeC;
    }

}
