var lotteryImg  //旋转图片
	,lotteryBtn  //抽奖按钮
	;

var P = {
	init: function(){
		P.io();
		P.events.init();
	},
	io: function(){
		lotteryImg = document.getElementById('lotteryImg');
		lotteryBtn = document.getElementById('lotteryBtn');
	},
	events: {
		init: function(){
			P.events.startLottery();
		},
		startLottery: function(){
			lotteryBtn.onclick = function(){

/*				alert('请登陆');
				return;*/

				var getDataTime = Math.round(Math.random() * 6)   //模拟获取接口时间s
					,dataId = Math.round(Math.random() * 5)   //模拟奖品ID
					,dataLottery = ['超级红包', '18元', '8元', '6元', '3元', '1元']  //模拟奖品数据
					,dataRotate = [0, 60, 120, 180, 240, 300]  //奖品数量及旋转角度
					;

				// 未获取接口数据前预旋转
				P.utils.addClass(lotteryBtn, 'disabled');
				lotteryImg.style.webkitTransform = 'rotate(172800deg)';
				lotteryImg.style.transform = 'rotate(172800deg)';
				lotteryImg.style.transitionDuration = '60s';
				lotteryImg.style.transitionTimingFunction = 'ease-in';

				// 保持抽奖流畅，接口请求成功低于5s按5s预旋转
				getDataTime = getDataTime < 5 ? 5 : getDataTime;

				// 获取接口数据旋转至奖品
				setTimeout(function(){
					var deg = 1800 + 360 - dataRotate[dataId]
						;
					lotteryImg.style.transitionDuration = '3s';
					lotteryImg.style.transitionTimingFunction = 'ease-out';
					lotteryImg.style.webkitTransform = 'rotate('+ deg +'deg)';
					lotteryImg.style.transform = 'rotate('+ deg +'deg)';

					setTimeout(function(){
						P.utils.removeClass(lotteryBtn, 'disabled');
						alert('恭喜，您中了' + dataLottery[dataId] + '大奖');
					}, 3000);
				}, getDataTime * 1000);

				
			}	
		}
	},
	utils: {
        hasClass: function(obj, cls){
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass: function(obj, cls){
            if (!this.hasClass(obj, cls)) obj.className += " " + cls;
        },
        removeClass: function(obj, cls){
            if (P.utils.hasClass(obj, cls)){
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function(){
	P.init();
}, false);