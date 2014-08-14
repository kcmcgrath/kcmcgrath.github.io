define(function(require, exports, module) { // jshint ignore:line
	'use strict';

	var $ = require('jquery');
	var debug = require('debug');

	function elementHasPosition(element) {
	    var $element = $(element);
	    var $checkElements = $element.add( $element );
	    var hasPosition = false;
	    $checkElements.each(function(){
	        if ($(this).css("position") === "fixed" || $(this).css("position") === "absolute" || $(this).css("position") === "relative") {
	            hasPosition = true;
	            return false;
	        }
	    });
	    return hasPosition;
	}

	$.fn.imgCover = function() {
		return this.each(function() {

			var el 		= $(this);
			var par 	= $(this).parent();
			debug.log( 'Found: ' + el, 'BGCOVER'  );

			if ( !elementHasPosition(par) ) {
				par.css({
					position: 'relative',
					overflow: 'hidden'
				});
			}

			var resize = function(el,par) {
				var th = par.innerHeight();//box height
				var tw = par.width();//box width
				var tr = th/tw;

				var im = el; //image
					im.removeClass('ww').removeClass('wh');

				var ih = im.height();//inital image height
				var iw = im.width();//initial image width
				var ir = ih/iw;

				debug.log(ih + ' > '+ iw + ' || '+im.attr('src') +' = '+  ((ih > iw) && (tr > ir)) + ' || '+ tr +'>'+ir);
				if ((ih > iw) || (tr < ir)) {//if portrait
				   im.addClass('ww').removeClass('wh'); //set width 100%
				} else { //if landscape
					im.addClass('wh').removeClass('ww'); //set height 100%
				}

				//set offset
				var nh = im.height();//new image height
				var nw = im.width();//new image width
				var hd = (nh-th)/2;//half dif img/box height
				var wd = (nw-tw)/2;//half dif img/box width

				debug.log(nh +' - '+ th +'/ 2 = ' + hd + '|| '+ ((tr < ir)));
				if ((tr > ir)) {//if portrait
					im.css({marginLeft: '-'+wd+'px', marginTop: 0});//offset left
				} else {//if landscape
					im.css({marginTop: '-'+hd+'px', marginLeft: 0});//offset top
				}
			};


			$(window).smartresize(function(e){
				resize(el, par);
			});


			el
				.css('visibility', 'hidden')
				.css('display', 'block');

			par.addClass('video-init');

			setTimeout(function(){
				resize( el, par );

				el
					.hide()
					.css('visibility', 'visible')
					.fadeIn(2000)
					.css('display', 'block');
			}, 500);

			// init
			// setTimeout(function(){resize( el, par );},1000);

		});
	};
});
