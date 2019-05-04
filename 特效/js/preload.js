//图片预加载
(function($){
	function PreLoad(imgs,options){
		this.imgs = (typeof imgs === 'string')?[imgs]:imgs;
		this.opts = $.extend({},PreLoad.DEFAULTS,options);

		if(this.opts.order==='ordered'){
			this._ordered();
		}else{
			this._unordered();
		}
	}
	PreLoad.DEFAULTS = {
		each:null,//每张图片加载完成后执行
		all:null,//所有图片加载完成后执行
		order:'unordered'
	};
	PreLoad.prototype._ordered = function(){
			//有序预加载
		var opts = this.opts,
			count = 0,
			imgs = this.imgs,
			len = imgs.length;
		load();
		function load(){
			var imObj = new Image();
			$(imObj).on('load error',function(){
				opts.each&&opts.each();
				if(count>=len){
					//图片都已加载完毕 
					opts.add&&opts.all();
				}else{
					load();
				}
				count++;
			});
			imObj.src = images[count];
		}
	}
	PreLoad.prototype._unordered = function(){ //无序预加载
		var imgs = this.imgs,
			count = 0,
			opts = this.opts,
			len = imgs.length;

		$.each(imgs,function(i,src){
			if(typeof src!='string')return;
			var imgObj = new Image();
			$(imgObj).on("load error",function(){
				opts.each && opts.each();
				if(count>=len-1){
					opts.all && opts.all();
				}
				count++;
			});
			imgObj.src = src;
		})
	};
	$.extend({
		preload:function(imgs,opts){
			new PreLoad(imgs,opts);
		}
	})
})(jQuery);