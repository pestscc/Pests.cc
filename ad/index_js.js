var renderList = [
	{
	    name:'导航-常用网址',
		data: [
	    	["北京首条磁浮列车线路年底试运营", "http://rbav.cc/zaijuan1/178_2.php", "http://wx3.sinaimg.cn/mw690/006VpR0egy1fsfelys4ktg30dw07d4qp.gif"],
	    	["世界眼中的中国奇迹", "http://rbav.cc/zaijuan1/178_6.php", "http://wx2.sinaimg.cn/mw690/006VpR0egy1fsfdigxms9g30dw07tnpd.gif"],
	    	["宝马与长城合作或存变数", "http://rbav.cc/zaijuan1/178_7.php", "http://wx4.sinaimg.cn/mw690/006VpR0egy1fsfdiflrdcg30b4060e81.gif"],
			["保监会连发五道监管函", "http://rbav.cc/zaijuan2/178_2.php", "http://wx1.sinaimg.cn/mw690/006VpR0egy1fsfdhuw32dg309606snpd.gif"],
			["中国10年期国债收益率突破3.7%", "http://rbav.cc/zaijuan2/178_5.php", "http://wx4.sinaimg.cn/mw690/006VpR0egy1fsfdhcevffg30ce06yqvd.gif"],
			["下半年中国经济增速有望实现7%", "http://rbav.cc/zaijuan2/178_6.php", "http://wx1.sinaimg.cn/mw690/006VpR0egy1fsfdh7u1g5g30b4069x6p.gif"],
			["如何寻找有价值的个股投资", "http://rbav.cc/zaijuan3/178_7.php", "http://wx4.sinaimg.cn/mw690/006VpR0egy1fsfdh5mwq9g30dw07nqv5.gif"],
			["平安人寿的发展与变革之路", "http://rbav.cc/zaijuan3/178_13.php", "http://wx1.sinaimg.cn/mw690/006VpR0egy1fsfdh4fv62g30dw07nkjl.gif"],
			["工程公司遭遇境外税收问题", "http://rbav.cc/zaijuan5/178_8.php", "http://wx1.sinaimg.cn/mw690/006VpR0egy1fsfdh3dqctg308c06bnpd.gif"],
			["众基金再大幅下调乐视网估值", "http://rbav.cc/zaijuan3/178_14.php", "http://wx1.sinaimg.cn/mw690/006VpR0egy1fsfdh2dk0ng30ao060npd.gif"],
			["保监会严厉打击电销违规", "http://rbav.cc/zaijuan3/179_15.php", "http://wx2.sinaimg.cn/mw690/006VpR0egy1fsfd4y4gwag30ao060hcj.gif"],
	    	["'提低、扩中' 收入分配改革再提速", "http://rbav.cc/zaijuan4/179_3.php", "http://wx2.sinaimg.cn/mw690/006VpR0egy1fsfd7hogfpg307s04dx6q.gif"],
	    	["姚振华140亿投新能源项目", "http://rbav.cc/zaijuan4/179_6.php", "http://wx3.sinaimg.cn/mw690/006ZrXHXgy1fsnttyjwa6g30bo06k7wi.gif"],
			["人工智能+传统产业=新产业", "http://rbav.cc/zaijuan4/179_11.php", "http://wx2.sinaimg.cn/mw690/006VpR0egy1fsfd6fciadg30dw07tx0j.gif"],
			["微山为医疗卫生体制改革提供经验", "http://rbav.cc/zaijuan5/179_5.php", "http://wx4.sinaimg.cn/mw690/006VpR0egy1fsfdb6pim8g30as06c4qu.gif"],
			["银监会连续批准筹银行", "http://rbav.cc/zaijuan5/179_6.php", "http://wx2.sinaimg.cn/mw690/006VpR0egy1fsfdb2okwgg30dw07te81.gif"],
			["成都举办2017西部金融论坛", "http://rbav.cc/zaijuan5/179_7.php", "http://wx3.sinaimg.cn/mw690/006VpR0egy1fsfdb8fmjog309x05k4qq.gif"],
			["阿里巴巴对新零售的展望", "http://rbav.cc/zaijuan5/179_11.php", "http://wx4.sinaimg.cn/mw690/006VpR0egy1fsfdbxck70g309c05v7wl.gif"],
			["证金公司连续减持贵州茅台", "http://rbav.cc/zaijuan6/179.php", "http://wx3.sinaimg.cn/mw690/006VpR0egy1fsfdcw9d03g30be07t7wi.gif"],
			["新车融资租赁迎来资本春天", "http://rbav.cc/zaijuan6/179_4.php", "http://wx3.sinaimg.cn/mw690/006VpR0egy1fsfdcx3n55g308w0507we.gif"]
		],
	    id: 'changyong',
	    tpl: '<li><a target="_blank" class="blue" href="#1"> <img src="#2"><p>#0</p></a></li>',
	    len: 16
	},
];
(function () {
//随机获取算法
	var randomOperator = {

//所有记录全部随机取
	    'random': function (data, length) {
	        if (data.length == 0) return [];
	        length = data.length < length ? data.length : length;
	        var tmp = data.slice(0);
	        var result = [];
	        for (var i = 0; i < length; i++) {
	            var r = Math.floor(Math.random() * tmp.length);
	            result[i] = tmp[r];
	            tmp.splice(r, 1);
	        }
	        return result;
	    },

 //分组随机
	    'group': function (data, length) {
	        var groupLen = Math.floor(data.length / length);
	        var r = Math.floor(Math.random() * groupLen);
	        console.log(r * length);
	        return data.slice(r * length, (r + 1) * length);
	    }
	};
	window.renderTpl = function (o) {
	    o = o || { data: [], len: 4 };
	    var op = o.op || 'random';

//随机获取数据
	    var resultData = randomOperator[op](o.data, o.len);

//格式化模板
	    var result = '';
	    var postElementKey = o.id + '_post'
	    result += typeof (o.tpl_header) === 'undefined' ? '<ul>' : o.tpl_header;
	    o.tpl = typeof (o.tpl) === 'undefined' ? "<li><img src='#2' /><a href='#1'>#0</a></li>" : o.tpl;
	    var post = o.post || 'http://www.baidu.com' + encodeURIComponent( o.name || '');
	    for (var i = 0; i < resultData.length; i++) {
	        var raw = resultData[i];
	        var tpl = o["tpl" + (i + 1)] || o.tpl;
	        var fragment = tpl;
	        var realPost = post;
	        for (var j = 0; j < raw.length; j++) {
	            realPost = realPost.replace(new RegExp("#" + j, 'g'), encodeURIComponent(raw[j]));
	            fragment = fragment.replace(new RegExp("#" + j, 'g'), raw[j]);
	        }
	        fragment = fragment.replace('href', 'onclick="try{ document.getElementById(\'' + postElementKey + '\').src=\'' + realPost + '\'}catch(e){}" href');
	        result += fragment;
	    }
	    result += typeof (o.tpl_footer) === 'undefined' ? '</ul>' : o.tpl_footer;
	    result += '<img width="0" height="0" id="' + postElementKey + '" />';
	    var hasjQuery = !!window.jQuery;
	    if (hasjQuery) {
	        $("#" + o.id).html(result);
	    }
	    else {
	        var el = document.getElementById(o.id);
	        if (el) el.innerHTML = result
	    }
	};

	renderList = renderList || [];
	for (var i = 0; i < renderList.length; i++) {
	    renderTpl(renderList[i]);
	}
})();