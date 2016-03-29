/* imgRotae1 版本:2.0*/

(function($){
$.fn.imgRotae1=function(options){
	$.fn.imgRotae1.defaults ={
		width:'500',       //图片宽度
		height:'313',      //图片高度
		speed:'100',       //图片过度速度
		interval:'3000',   //图片间隔速度
		autoscroll:'true', //是否自动滚动
		around:'left',     //方向"向左"
        dlHeight:'30',     //标题背景高度
		fades:'false',       //图片是否渐隐渐现
		fadeWhite:'false',   //渐隐变白的形式
		liBg:'#000',          //按钮的背景色
		dlSize:'12',           //标题字体大小
		easings:'easeInCubic'    //缓动
	};

options = $.extend($.fn.imgRotae1.defaults,options);
	var widths =options.width;
	var heights =options.height;
	var speed =options.speed;
	var interval =options.interval;
	var as =options.autoscroll;
	var around =options.around;
    var dlHeight =options.dlHeight;
	var fades =options.fades;
	var fadeWhite =options.fadeWhite;
	var liBg =options.liBg;
	var dlSize =options.dlSize;
	var easings =options.easings;
return this.each(function(){
    var $img = $(this).find('ul');
    var $imgLi =$img.find('li');
    var $imgs  =$imgLi.find('img');
    var $ol = $(this).find('ol');
	var $li = $ol.find('li');
    var $dl  = $(this).find('dl');
	var $txt = $dl.find('dt');
    
	$(this).css({width:widths,height:heights,overflow:'hidden',position:'relative'});
    $li.css({color:'#fff',fontFamily:'宋体 Arial',fontSize:'12px'});
    $txt.css({color:'#fff',fontFamily:'宋体 Arial',fontSize:dlSize+'px',letterSpacing:'1px'}).find('a').css({color:'#fff'});
    $img.css({position:'absolute',top:'0px',left:'0px',width:'9999px'});
    $imgLi.css({float:'left',listStyleType:'none',width:widths,height:heights});
    $imgs.css({width:'100%',height:'100%',border:'none'});
	$dl.css({width:'100%',height:dlHeight,background:'url("images/imgRotae1.png") 0 0 repeat',/*background:'#000',opacity:'.5',*/position:'absolute',left:'0px',bottom: '0px'});
    $txt.css({marginLeft:'15px',lineHeight:dlHeight+'px'});
    $ol.css({position:'absolute',bottom:dlHeight+'px',right:'0px'});  //可以用function(){ }
    $li.css({float:'left',width:'18px',height:'18px',lineHeight:'18px',marginRight:'5px',marginBottom:'5px',background:'#563320',opacity:'.6',textAlign:'center',cursor:'pointer',listStyleType:'none'});
    /******判断渐隐形式CSS  start**********/
	if(fades=='true'){
		$imgLi.css({position:'absolute',top:'0px',left:'0px',display:'none'});
	}
	/******判断渐隐形式  end**********/
	var $i=0;
		fun($i);
	$li.mouseover(function(){
		var $in = $li.index($(this));
		$i=$in;
		fun($i);
	});
	function fun(i){
		/******判断渐隐形式JS  start**********/
		if(fades=='true'){
			$imgLi.stop(true,true).fadeOut(parseInt(speed));
			$txt.stop(true,true).fadeOut(parseInt(speed));
			/***渐隐变白的形式JS   start*****/
			if(fadeWhite=='true'){
				$imgLi.stop(true,true).eq(i).fadeIn(parseInt(speed));
				$txt.stop(true,true).eq(i).fadeIn(parseInt(speed));
			}else{
				$imgLi.eq(i).fadeIn(parseInt(speed));
				$txt.eq(i).fadeIn(parseInt(speed));
			}
			/***渐隐变白的形式JS   end*****/
			lifa();
		/******判断渐隐形式  end**********/
		}else{
			$img.stop(true,true).animate({left:'-'+(i*widths)},{duration: parseInt(speed), easing: easings});
			$txt.hide();
			$txt.eq(i).show();/*
			$li.removeClass("cut");
			$li.eq(i).addClass("cut");*/
			lifa();
		}
		function lifa(){
			$li.css({opacity:'.6',background:'#000'});
			$li.eq(i).css({opacity:'1',background:liBg});
		}	
	}
	function timeFun(){
		if(around=='left'){
			$i++;
			if($i>=$imgLi.length){
				$i=0;
			}
		}
		if(around=='right'){
			$i--;
			if($i<0){
				$i=$imgLi.length-1;
			}
		}
		fun($i);
		
	}
	if(as=='true'){
		var Ftime = window.setInterval(function(){
			timeFun();
		},parseInt(interval));
		$(this).mouseenter(function(){
			if(Ftime){ window.clearInterval(Ftime);}
		}).mouseleave(function(){
			 Ftime = window.setInterval(function(){
				timeFun();
			},parseInt(interval));
		});
	}
});

}})(jQuery)