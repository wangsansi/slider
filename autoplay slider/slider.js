
// 1.数据定义（实际生产环境中，应有后台给出）
var data = [
	{img:0},
	{img:1},
	{img:2},
	{img:3},
	{img:4}
];

var timer;
var cur_index;

// 2.定义通用函数
var g = function(id){
	if(id.substr(0,1) == '.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}

// 3.添加幻灯片的操作（所有幻灯片&对应的按钮）
function addSliders(){
	// 3.1获取模板
	var tpl_roll = g('template_roll').innerHTML
					.replace(/^\s*/,'')
					.replace(/\s*$/,'')
	var tpl_ctrl = g('template_ctrl').innerHTML
					.replace(/^\s*/,'')
					.replace(/\s*$/,'')
	// 3.2定义最终输出HTML的变量
	var out_roll = [];
	var out_ctrl = [];
	// 3.3遍历所有数据，构建最终输出的HTML
	for (i in data){
		var _html_roll = tpl_roll
					.replace(/Index/g,data[i].img)
		var _html_ctrl = tpl_ctrl
					.replace(/Index/g,data[i].img)

		out_roll.push(_html_roll);
		out_ctrl.push(_html_ctrl);
	}
	//3.4 把HTML回写到对应的DOM里面
	g('template_roll').innerHTML = out_roll.join('');
	g('template_ctrl').innerHTML = out_ctrl.join('');
}

//5. 幻灯片切换(获得_active当前幻灯片)
function switchSlider(n){
	// 5.1获得要展现的幻灯片&控制按钮
	var roll = g('roll_'+n);
	var ctrl = g('ctrl_'+n);
	// 5.2获得所有的幻灯片以及控制按钮
	var clear_roll = g('.roll-i');
	var clear_ctrl = g('.ctrl-i');

	// 5.3 清除他们的active
	for (var i = 0;i < clear_roll.length;i++){
		clear_roll[i].className = clear_roll[i].className
			.replace(' roll-i_active','');
		clear_ctrl[i].className = clear_ctrl[i].className
			.replace(' ctrl-i_active','');
	}
	// 5.4 增加active
	roll.className += ' roll-i_active';
	ctrl.className += ' ctrl-i_active';
	// 5.5 输出目前index
	cur_index = n;
}
//6. 获得下一张幻灯片
function switchNextSlider() {
	var next_index = (cur_index + 1) % data.length;
	switchSlider(next_index);
}
//7. 定义自动切换到下一张的定时器
function autoSwitch() {
	timer = setInterval("switchNextSlider()", 10000);
}
//8.开启切换到下一张的定时器
function startSwitch(index){
	switchSlider(index);	
	autoSwitch();
}
//8. 清除定时器&开启定时器
function clearTimerswitchSlider(index) {
	clearInterval(timer);
	startSwitch(index);	
}
//9. 上一张
function clearTimerswitchNextSlider(){	
	clearInterval(timer);
	var next_index = (cur_index + 1) % data.length;
	startSwitch(next_index);	
}
//10.下一张
function clearTimerswitchPreSlider(){	
	clearInterval(timer);
	var pre_index = (cur_index + data.length -1) % data.length;
	startSwitch(pre_index);	
}

// 4.定义何时处理幻灯片输出（）
window.onload = function(){
	addSliders();
	startSwitch(0);
}