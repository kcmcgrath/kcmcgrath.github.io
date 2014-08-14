/* global SETTINGS:true */

/**
 * LOAD ORDER:
 *     Respond.js -> Config.js -> main.js -> App.js
 */

require.config({
	baseUrl: '',
	paths: {
		'requirejs': '',
		jquery: 'lib/jquery/dist/jquery',
		modernizr: 'lib/modernizr/modernizr',
		//selectivizr: 'lib/selectivizr/selectivizr',

		debug: 'js/comp/local-debug',
		smartresize: 'js/comp/jquery-smartresize',
		tappy: 'js/comp/jquery-tappy',
		ddslick :  'js/comp/jquery-ddslick',
		
		mainapp: 'js/comp/app',
	},

	shim: {
		jquery: {
			exports: 'jQuery'
		},
		smartresize: {
			deps: [
				'jquery'
			],
			exports: 'smartresize'
		},
		tappy: {
			deps: [
				'jquery'
			],
			exports: 'tappy'
		},
		respond: {
			exports: 'respond'
		},
		three: {
			exports: 'three'
		},
		ddslick: {
			deps: [
				'jquery'
			],
			exports: 'ddslick'
		}
	},


	waitSeconds: 120
});


// Do this before your first use of jQuery.
/*
var pathToJQuery;
if('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
    pathToJQuery = 'lib/jquery/dist/jquery';
} else {
    pathToJQuery = 'lib/jquery-1.9.1/index';
}

// lock to 1.0 for support
pathToJQuery = 'lib/jquery/dist/jquery';

require.config({'paths':{
	'jquery': pathToJQuery
}});
*/

