define(function(require, exports, module) { // jshint ignore:line
	'use strict';

	var $ = require('jquery');
	var debug = require('debug');

	require('smartresize');
	require('ddslick');
	require('tappy');
	require('js/comp/jquery-bgcover');

	/**
	 * Initial application setup. Runs once upon every page load.
	 *
	 * @class App
	 * @constructor
	 */
	var App = function() {
		this.init();
	};



	/**
	 * Initializes the application and kicks off loading of prerequisites.
	 *
	 * @method init
	 * @private
	 */
	App.prototype.init = function() {

		return; 
		var isInit = false;
		debug.log('init', 'INIT');


		// -----------------------------------------------
		// no-mq test and html class
		!Modernizr.mq('only all') && $('html').addClass('no-mq');
		// Modernizr.cssfilters && $('html').addClass('cssfilters');
		// !Modernizr.cssfilters && $('html').addClass('no-cssfilters');


		// -----------------------------------------------
		// cheap ie9- centering
		if (!Modernizr.csstransforms3d) {
			var cheapCentering = function() {
				$('.center-y').each(function(index, el) {
					var cont = $(this).parent().innerHeight();
					var elh = $(this).height();

					debug.log(cont + ' || '+ elh);
					// console.log('fake center ' + elh +' || '+ -(elh/2) );
					$(this).css({
						'marginTop': -(elh/2)
					});
				});
			};

			cheapCentering();

			$(window).smartresize(function(e){
				cheapCentering();
			});
		}


		// -----------------------------------------------
		// touch hover handler
		var $blinks = $('a.block-link');
		// $blinks.bind('click', function(e) { e.preventDefault(); });
		// if (Modernizr.touch) {

			$blinks.bind('click', function(e) {
				e.preventDefault();
				e.stopPropagation();

				var el = $(this);
				var href = el.attr('href');
					href = href === '#' ? false : href;
				var isHovering = el.hasClass('hovering');
				var isTouch = Modernizr.touch;

				if ( (href && !isTouch ) || (href && isHovering && isTouch) ) {
					window.location = href;
					return;
				}

				if (isTouch) {
					$blinks.not(el).removeClass('hovering');
					el.toggleClass('hovering');
				}
			});

		// }


		// -----------------------------------------------
		// select stuff
		$('.entry-select').click(function(event) {
			var el = $(this);
			var name = el.attr('rel');
			var dd = $('#sel-'+name);

			var win = $(window).innerWidth();
			var room = ( win - dd.offset().left );
			//console.log( room );

			dd
				.toggleClass('open-right', (room <= 300 && win >=640))
				.ddslick('open');


		});


		// -----------------------------------------------
		// Setup Form
		$('select').each(function(index, el) {
			var name = $(this).attr('name');

			var selthis = $(this).ddslick({
				onSelected: function (data) {
	        		//console.log( data );
	        		// console.log( data.original.attr('name') );
	        		// console.log( data.selectedData.value );
	        		// if (isInit) {
		        		var el = $( '#txt-'+data.original.attr('name') );

		        		el
		        			.removeClass('val-error')
		        			.toggleClass('initial', data.selectedIndex === 0)
	        				.text( data.selectedData.value );
    				// }

	        		return;
	    		}
			});
		});


		// -----------------------------------------------
		// Email Form
		function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}

		$('form').on('click', '#submit', function(event) {
			event.preventDefault();

			// validate
			var invalid = [];
			$('form').find('input.dd-selected-value').each(function(index, el) {
				var ele = $(this);
				var id = ele.parents('.dd-container').next('.entry-select');
				var val = ele.val();
				var valid = val.length && !val.match(/\(Select/);

				!valid && invalid.push(1);
				id.toggleClass('val-error', !valid);
			});

			var el_name = $('form').find('input[name="name"]');
			var val_name = el_name.val();
			var valid_name = val_name.length;
				el_name.toggleClass('val-error', !valid_name);
				!valid_name && invalid.push(1);
				// console.log( val_name );

			var el_email = $('form').find('input[name="email"]');
			var val_email = el_email.val();
			var valid_email = val_email.length && IsEmail(val_email);
				el_email.toggleClass('val-error', !valid_email);
				!valid_email && invalid.push(1);
				// console.log( val_email );


			// if any invalid, halt
			if (invalid.length) { return; }


			var formBody = '';
			$('.form-body')
				.contents()
				.filter(function(){
					// remove options
		    		return !$(this).is(".dd-container");
				})
				.each(function(index, el) {
					var txt = $(this).text();
						txt = $.trim(txt);

					if (formBody.length && txt.length && txt.charAt(0) !== '.') {
						formBody += ' '; // prepend a space
					}
					formBody += txt;
				});
			formBody.replace(/(\r\n|\n|\r)/gm,"");

			var formData = {};
				formData.email 			= $('input[name="email"]').val();
				formData.name 			= $('input[name="name"]').val();
				formData.usermessage 	= $('textarea[name="usermessage"]').val();
				formData.message 		= formBody;

			$.ajax({
				url: '/mail.php',
				type: 'POST',
				data: $.param(formData),
			})
			.done(function(e,b,c) {
				if (e === 'success') {
					$('form').parent().css({
						height: $('#success').height()
					});
					$('#success').fadeIn();
					$('form').fadeOut();
				}
			});
		});


		// -----------------------------------------------
		// nav click handler
		var openNav = function(e){
			e.preventDefault();
			$('body').toggleClass('nav-open');
		};
		Modernizr.touch && $('.nav-toggle').bind( 'tap', openNav);
		!Modernizr.touch && $('#globalheader').on( 'click', '.nav-toggle', openNav);


		// -----------------------------------------------
		// add video element
		$('#bg-video').each(function(index) {
			var mmv = Modernizr.video && !Modernizr.touch;
			var mmq = Modernizr.mq('(min-width: 48em)');
			// if ( !Modernizr.video  ) { return; }
			// if ( !Modernizr.mq('(min-width: 45em)') ) { console.log('nope'); return; }

			var el = $(this);
			var createBG = function(el){
				var src = el.attr('data-src');
				var srcArr = src.split(',');

				var fallback = el.attr('data-fallback');
				var classes = el.attr('class');

				var html = '',elString = '';
				if (!mmv && fallback) {
					elString = "img.bg-cover";
					html += '<img class="bg-cover '+classes+'" src="'+fallback+'"/>';
				} else if (src) {
					elString = "video";
					html += '<video class="'+classes+'" preload="auto" autoplay="true" loop="loop" muted="muted" volume="0">';
					html += 	'<source src="'+srcArr[0]+'" type="video/mp4">';
					html += 	'<source src="'+srcArr[1]+'" type="video/webm">';
					html += '</video>';
					debug.log('adding video '+src, 'VIDEO');
				}

				if ($(window).width() >= 800 ) {
					el.before(html);
					el.remove();

					$(elString).imgCover();
				}
			};
			createBG(el);

			$(window).smartresize(function(e){
				createBG(el);
			});
		});


		$('#showReel').click(function(event) {
			event.preventDefault();

			var par = $(this).parent();
			var size = $('#vidStill');
			var h = size.innerHeight();
			var w = size.innerWidth();

			var iframe = $('<iframe src="//player.vimeo.com/video/100941080?title=0&amp;byline=0&amp;autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
				iframe.css({
					height 	: h,
					width 	: w,
					top 	: 0
				});

			par
				.height( par.height() );

			size
				.fadeOut('slow');

			iframe
				.css({
					position: 'absolute'
				})
				.hide()
				.appendTo(par)
				.fadeIn('slow');
		});


		/*
			IMG Tag Cover
		 */
		// $(".js-bgcover").imgCover();
		//

		isInit = true;
	};

	// final export
	module.exports = App;

});
