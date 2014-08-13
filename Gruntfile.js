/*global module:false*/

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		dir: {
			interm 		: 'interm',
			build 		: '../dist',

			assetDir 	: 'assets',

			htmlDir 	: 'html',
			jsDir 		: 'js',
			scssDir 	: 'scss',
			cssDir 		: 'css'
		},

		// Task configuration.
		// concat: {
		// 	options: {
		// 		stripBanners: true
		// 	},
		// 	head: {
		// 		src: [
		// 			// '<%= dir.assetdir %>/js/lib/picturefill/dist/picturefill.js',
		// 			// '<%= dir.assetdir %>/lib/modernizr/modernizr.js',
		// 			'<%= dir.preprocess %>/js/_modernizr-custom.js',
		// 			'<%= dir.assetdir %>/lib/picturefill/dist/picturefill.js',
		// 			'<%= dir.assetdir %>/js/comp/_head-*.js'
		// 		],
		// 		dest: '<%= dir.preprocess %>/js/head.js'
		// 	},
		// 	// foot: {
		// 	// 	src: [
		// 	// 		'<%= dir.assetdir %>/js/lib/respond/src/respond.js',
		// 	// 		'<%= dir.assetdir %>/js/component/_foot_*.js'
		// 	// 	],
		// 	// 	dest: '<%= dir.preprocess %>/js/foot.js'
		// 	// },
		// 	ie: {
		// 		src: [
		// 			'<%= dir.assetdir %>/lib/selectivizr/selectivizr.js',
		// 			// '<%= dir.assetdir %>/lib/rem-unit-polyfill/js/rem.js',
		// 		],
		// 		dest: '<%= dir.preprocess %>/js/ie.js'
		// 	}
		// },

		// uglify: {
		// 	options: {},
		// 	dist: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: '<%= dir.preprocess %>/js/',
		// 			src: ['**/*.js', '!**/_*.js'],
		// 			dest: '<%= dir.assetdir %>/js/min/',
		// 			ext: '.min.js'
		// 		}]
		// 	}
		// },

		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			javascript: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['<%= dir.jsDir %>/**/*.js']
			}
		},

		watch: {
			options: {
                livereload: false
            },
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			// javascript: {
			// 	files: '<%= jshint.javascript.src %>',
			// 	tasks: ['jshint:javascript']
			// },
			compass: {
				files: '<%= dir.scssDir %>/**/*.scss',
				tasks: ['builddev']
			},
			// svg: {
			// 	files: '.preprocess/svg/*',
			// 	tasks: ['svg']
			// },
			html: {
				files: ['<%= dir.htmlDir %>/**/*'],
				tasks: ['builddev']
			},
			// scripts: {
			// 	files: ['<%= dir.assetdir %>/js/*.js', '<%= dir.assetdir %>/js/comp/*.js'],
			// 	tasks: ['scripts']
			// },
			// responsiveimages: {
			// 	files: '.preprocess/images/people/*.*',
			// 	tasks: ['images']
			// }
		},

		compass: {
			interm: {
				options: {
					force: true,
					require: 'susy',
					config: 'config.rb',
					sassDir: '<%= dir.scssDir %>',
					cssDir: '<%= dir.interm %>/<%= dir.assetDir %>/<%= dir.cssDir %>'
				}
			},
			build: {
				options: {
					force: true,
					require: 'susy',
					config: 'config.rb',
					sassDir: '<%= dir.scssDir %>',
					cssDir: '<%= dir.build %>/<%= dir.assetDir %>/<%= dir.cssDir %>'
				}
			}
		},

		requirejs: {
			main: {
	            options: {
	                baseUrl: '<%= dir.assetdir %>/',                         // Path of source scripts, relative to this build file
	                mainConfigFile: '<%= dir.assetdir %>/js/_config.js',         // Path of shared configuration file, relative to this build file
	                name: 'lib/almond/almond', //'App',                                                                    // Name of input script (.js extension inferred)
	                out: '<%= dir.assetdir %>/js/min/app.min.js',                    // Path of built script output
	                include: 'js/_main',

	                fileExclusionRegExp: /.svn/,                                                    // Ignore all files matching this pattern
	                useStrict: true,
	                preserveLicenseComments: false,
	                pragmas: {
	                    debugExclude: true
	                },

	                optimize: 'uglify2',
	                // optimize: 'uglify2',                                                            // Use 'none' If you do not want to uglify.
	                uglify2: {
	                    output: {
	                        beautify: false,
	                        comments: false
	                    },
	                    compress: {
	                        sequences: false,
	                        global_defs: {
	                            DEBUG: false
	                        }
	                    },
	                    warnings: false,
	                    mangle: true
	                },

	                excludeShallow: [
						"logo"
					]
	            }
	        }
		},

		// imagemin: {                          // Task
		// 	dynamic: {                         // Another target
		// 	  files: [{
		// 	    expand: true,
		// 	    cwd: '.preprocess/images/work',
		// 	    src: ['**/*.{png,jpg,gif}'],
		// 	    dest: '<%= dir.assetdir %>/img/work'                  // Destination path prefix
		// 	  }]
		// 	},
		// 	core: {                         // Another target
		// 	  files: [{
		// 	    expand: true,
		// 	    cwd: '.preprocess/images',
		// 	    src: ['*.{png,jpg,gif}'],
		// 	    dest: '<%= dir.assetdir %>/img'                  // Destination path prefix
		// 	  }]
		// 	}
		// },

		// grunticon: {
		// 	dist: {
		// 		options: {
		// 			colors: {
		// 				hypergreen: "#a6ce39",
		// 				white: "#ffffff"
		// 			},
		// 			template: 'icon-template.hbs'
		// 		},
		// 		files: [{
		// 			expand: true,
		// 			// cwd: '.preprocess/svg/min',
		// 			// src: ['*.min.svg', '*.png'],
		// 			cwd: '.preprocess/svg',
		// 			src: ['*.svg', '*.png'],
		// 			dest: "<%= dir.assetdir %>/icons"
		// 		}]
		// 	}
		// },

		clean: {
			interm: [
				"<%= assemble.interm.files[0].dest %>/**/*.html",
				"<%= compass.interm.options.cssDir %>"
			]
		},

		assemble: {
			// Task-level options.
			options: {
				postprocess: require('pretty'),
				flatten: true,
				assets: '<%= dir.interm %>/assets',

				layout: '<%= dir.htmlDir %>/layouts/default.hbs',
				partials: '<%= dir.htmlDir %>/partials/*.hbs',
				helpers: ['<%= dir.htmlDir %>/helpers/helper-*.js', 'handlebars-helpers'],
				data: '<%= dir.htmlDir %>/data/*.{json,yml}',

				// Pattern Lab templates
				patterns: {
					molecules: [ '<%= dir.htmlDir %>/partials/molecules/*.hbs' ],
					organisms: [ '<%= dir.htmlDir %>/partials/organisms/*.hbs' ]
				}
			},
			interm: {
				files: [{
					expand: true,     // Enable dynamic expansion.
					cwd: '<%= dir.htmlDir %>/pages/',      // Src matches are relative to this path.
					src: ['**/*.hbs'], // Actual pattern(s) to match.
					dest: '<%= dir.interm %>/',   // Destination path prefix.
					ext: '.html',   // Dest filepaths will have this extension.
				}]
			},
			build 	: {
				files: [{
					expand: true,     // Enable dynamic expansion.
					cwd: '<%= dir.htmlDir %>/pages/',      // Src matches are relative to this path.
					src: ['**/*.hbs'], // Actual pattern(s) to match.
					dest: '<%= dir.build %>/',   // Destination path prefix.
					ext: '.html',   // Dest filepaths will have this extension.
				}]
			}
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.loadNpmTasks('grunt-grunticon');

	grunt.loadNpmTasks('assemble');


	// svg task
	grunt.registerTask('svg', ['clean:svg' , 'grunticon']);

	
	// INTERM BUILD
	grunt.registerTask('builddev', ['clean:interm','compass:interm','assemble:interm']);
	

	// DIST BUILD
	grunt.registerTask('build', ['assemble:build']);


	// images
	// grunt.registerTask('images', ['clean:images', 'imagemin', 'responsive_images', 'svg']);


	//js concat and uglify
	// grunt.registerTask('scripts', ['modernizr', 'concat', 'uglify', 'requirejs']);


	// Default task.
	grunt.registerTask('default', ['watch']);

};
