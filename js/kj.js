var isfirst = true;
var jiaqin = ["牛", "马", "羊", "鸡", "狗", "猪"];
var wuxing = ["金", "木", "水", "火", "土"];
var shengxiao = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
var colors = ["red", "green", "blue"];
setTimeout(function ()
{
    ajaxlhc();
}, 1000);
function ajaxlhc()
{
    var iferror = false;
    $.ajax({
        url: "http://1680660.com/smallSix/findSmallSixInfo.do",
        type: "GET",
        data: {
    }, beforeSend: function ()
    {
        
    },
    success: function (a)
    {
        console.log(a);
        loadlhc(a);
    },
    error: function (a)
    {
        setTimeout(function ()
        {
            ajaxlhc();
        }, 1000);
        if (config.ifdebug)
        {
            console.log("data error");
        }
    },
    complete: function (xmlobj, state)
    {
        xmlobj = null;
        if (!iferror)
        {
            if (state == "timeout")
            {
                setTimeout(function ()
                {
                    ajaxlhc();
                }, 1000);
            }
        }
    }
});
}
//判断值是否是数字
function isRealNum(val)
{
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (val === "" || val == null)
    {
        return false;
    }
    if (!isNaN(val))
    {
        return true;
    } else
    {
        return false;
    }
}
//判断输入框中输入的日期格式为yyyy-mm-dd和正确的日期
function IsDate(mystring)
{
    var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
    var str = mystring;
    var arr = reg.exec(str);
    if (str == "") return true;
    if (!reg.test(str) && RegExp.$2 <= 12 && RegExp.$3 <= 31)
    {
        //alert("请保证输入的日期格式为yyyy-mm-dd或正确的日期!");
        return false;
    }
    
    return true;
}

function loadlhc(a)
{
    var data;
    if (typeof a != "object")
    {
        data = JSON.parse(a);
    } else
    {
        data = JSON.stringify(a);
        data = JSON.parse(a);
    }
    data = data.result.data;
    var preDrawCode = data.preDrawCode.split(",");
    var sumTotal = data.sumTotal;
    var preDrawIssue = data.preDrawIssue;
    var preDrawTime = data.preDrawTime;
    var drawIssue = data.drawIssue;
    var drawTime = data.drawTime;
    var type = data.type;

    if (!isRealNum(type))//判断值是否是数字
        type=6;


    var lhcdiv = $("#kaijiangnum");
    var lhcnum = lhcdiv.find(".mainmiddle ul");
    lhcnum.html("");

    if (isRealNum(preDrawIssue))//判断值是否是数字
        lhcdiv.find(".preDrawIssue").text(preDrawIssue);
    if (isRealNum(drawIssue))//判断值是否是数字
        lhcdiv.find(".nextIssue").text(drawIssue);//下期期号

    if (!IsDate(drawTime))//判断输入框中输入的日期格式
        drawTime = "";
    else
    {
        var drawTime2 = drawTime.substring(0, 10);
        lhcdiv.find(".nextdrawTime").text(drawTime2);//下期时间
    }
    
    if (type == 1 || type == 4 || type == 8)
    {
        var tema = 0;
        var temashengxiao = "";
        var strs = "";
        for (var i = 0; i < preDrawCode.length; i++)
        {
            if (!isRealNum(data.color[i]))//判断值是否是数字
                return;
            numreds = colors[data.color[i] - 1];

            var shengxiaoping = shengxiao[data.chineseZodiac[i] - 1];
            if (i == 6)
            {
                tema = preDrawCode[i];
                temashengxiao = shengxiaoping;
                strs += "<li><font class=\"jiahao\" size=\"+2\">+</font></li>";
            }
            strs += "<li><span class=\"" + numreds + "\">" + preDrawCode[i] + "</span><span>" + shengxiaoping + "</span></li>";
        }
        lhcnum.html(strs);
        if (isRealNum(sumTotal))//判断值是否是数字
        lhcdiv.find(".hezhi").text(sumTotal);
        //lhcdiv.find(".tema").text(tema);
        //lhcdiv.find(".texiao").text(temashengxiao);

        if (type == 1)
        {
            setTimeout(function ()
            {
                ajaxlhc();
            }, 1000);
        } else
        {
            setTimeout(function ()
            {
                ajaxlhc();
            }, 60000);
        }
    }
    else if (type == 6)
    {
        var time = data.drawTime.replace("-", "/");
        var serverTime = data.serverTime.replace("-", "/");
        time = time.replace("-", "/");
        serverTime = serverTime.replace("-", "/");
        var end_time = new Date(time).getTime(); //月份是实际月份-1
        var sys_second = (end_time - new Date(serverTime).getTime()) / 1000;
        var timer = setInterval(function ()
        {
            if (sys_second > 30)
            {
                lhcnum.html("<li><span class=\"red\">与</span><span></span></li><li><span class=\"red\">本</span><span></span></li><li><span class=\"red\">港</span><span></span></li><li><span class=\"red\">台</span><span></span></li><li><span class=\"red\">同</span><span></span></li><li><span class=\"red\">步</span><span></span></li><li><span class=\"red\">中</span><span></span></li><li><span class=\"red\">...</span><span></span></li>");
            }
            else
            {
                lhcnum.html("<li><span class=\"red\">即</span><span></span></li><li><span class=\"red\">将</span><span></span></li><li><span class=\"red\">开</span><span></span></li><li><span class=\"red\">奖</span><span></span></li><li><span class=\"red\">请</span><span></span></li><li><span class=\"red\">稍</span><span></span></li><li><span class=\"red\">候</span><span></span></li><li><span class=\"red\">...</span><span></span></li>");
            }
        });

        setTimeout(function ()
        {
            ajaxlhc();
        }, 10000);
    }
    else if (type == 0)
    {
        lhcnum.append("<li><span class=\"red\">准</span><span></span></li><li><span class=\"red\">备</span><span></span></li><li><span class=\"red\">报</span><span></span></li><li><span class=\"red\">码</span><span></span></li><li><span class=\"red\">请</span><span></span></li><li><span class=\"red\">稍</span><span></span></li><li><span class=\"red\">后</span><span></span></li><li><span class=\"red\">...</span><span></span></li>");
        setTimeout(function ()
        {
            ajaxlhc();
        }, 10000);
    }
    else if (type == 2)
    {
        lhcnum.append("<li><span class=\"red\">节</span><span></span></li><li><span class=\"red\">目</span><span></span></li><li><span class=\"red\">广</span><span></span></li><li><span class=\"red\">告</span><span></span></li><li><span class=\"red\">中</span><span></span></li><li><span class=\"red\">...</span><span></span></li>");
        setTimeout(function ()
        {
            ajaxlhc();
        }, 10000);
    }
    else if (type == 3)
    {
        lhcnum.append("<li><span class=\"red\">主</span><span></span></li><li><span class=\"red\">持</span><span></span></li><li><span class=\"red\">人</span><span></span></li><li><span class=\"red\">解</span><span></span></li><li><span class=\"red\">说</span><span></span></li><li><span class=\"red\">中</span><span></span></li><li><span class=\"red\">...</span><span></span></li>");
        setTimeout(function ()
        {
            ajaxlhc();
        }, 5000);
    }
}