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
		concat: {
			options: {
				stripBanners: true
			},
			head: {
				src: [
					// '<%= dir.assetdir %>/js/lib/picturefill/dist/picturefill.js',
					// '<%= dir.assetdir %>/lib/modernizr/modernizr.js',
					'<%= dir.preprocess %>/js/_modernizr-custom.js',
					'<%= dir.assetdir %>/lib/picturefill/dist/picturefill.js',
					'<%= dir.assetdir %>/js/comp/_head-*.js'
				],
				dest: '<%= dir.preprocess %>/js/head.js'
			},
			// foot: {
			// 	src: [
			// 		'<%= dir.assetdir %>/js/lib/respond/src/respond.js',
			// 		'<%= dir.assetdir %>/js/component/_foot_*.js'
			// 	],
			// 	dest: '<%= dir.preprocess %>/js/foot.js'
			// },
			ie: {
				src: [
					'<%= dir.assetdir %>/lib/selectivizr/selectivizr.js',
					// '<%= dir.assetdir %>/lib/rem-unit-polyfill/js/rem.js',
				],
				dest: '<%= dir.preprocess %>/js/ie.js'
			}
		},

		uglify: {
			options: {},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= dir.preprocess %>/js/',
					src: ['**/*.js', '!**/_*.js'],
					dest: '<%= dir.assetdir %>/js/min/',
					ext: '.min.js'
				}]
			}
		},

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
			// compass: {
			// 	files: '<%= dir.scssDir %>/**/*.scss',
			// 	tasks: ['compass']
			// },
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
			dev: {
				options: {
					force: true,
					require: 'susy',
					config: 'config.rb',
					// importPath: ['bower_components/foundation/scss'],
					sassDir: '.preprocess/scss',
					cssDir: '<%= dir.assetdir %>/css'
				}
			},
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

		// useminPrepare: {
		// 	html: '<%= dir.build %>/index.html'
		// },

		clean: {
			// images: [
			// 	'<%= dir.build %>/assets/img/*.{png,jpg,gif}',
			// 	'<%= dir.build %>/assets/img/people/**/*',
			// 	'<%= dir.build %>/assets/img/work/**/*',
			// 	// '<%= dir.build %>/assets/img/site/**/*',
			// ],
			// svg: [
			// 	'<%= dir.build %>/assets/icons/*',
			// ],
			interm: [
				//"<%= dir.interm %>/*" 
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
			build 	: {}
		},


		modernizr: {

			dist: {
			    // [REQUIRED] Path to the build you're using for development.
			    "devFile" : "<%= dir.assetdir %>/lib/modernizr/modernizr.js",

			    // [REQUIRED] Path to save out the built file.
			    "outputFile" : "<%= dir.preprocess %>/js/_modernizr-custom.js",

			    // Based on default settings on http://modernizr.com/download/
			    "extra" : {
			        "shiv" : true,
			        "printshiv" : false,
			        "load" : true,
			        "mq" : true,
			        "cssclasses" : true
			    },

			    // Based on default settings on http://modernizr.com/download/
			    "extensibility" : {
			        "addtest" : false,
			        "prefixed" : false,
			        "teststyles" : false,
			        "testprops" : false,
			        "testallprops" : false,
			        "hasevents" : false,
			        "prefixes" : false,
			        "domprefixes" : false
			    },

			    // By default, source is uglified before saving
			    "uglify" : true,

			    // Define any tests you want to implicitly include.
			    "tests" : [],

			    // By default, this task will crawl your project for references to Modernizr tests.
			    // Set to false to disable.
			    // "parseFiles" : true,

			    // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
			    // You can override this by defining a "files" array below.
			    "files" : {
			        "src": [
						'<%= dir.preprocess %>/**/*.*',
						'!<%= dir.preprocess %>/js/*.*',
						'<%= dir.assetdir %>/js/**/*.*',
						'!<%= dir.assetdir %>/js/min/*.*'
			        ]
			    },

			    // When parseFiles = true, matchCommunityTests = true will attempt to
			    // match user-contributed tests.
			    "matchCommunityTests" : true,

			    // Have custom Modernizr tests? Add paths to their location here.
			    "customTests" : []
			}

		}
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

	grunt.loadNpmTasks("grunt-modernizr");

	// svg task
	grunt.registerTask('svg', ['clean:svg' , 'grunticon']);

	
	grunt.registerTask('builddev', ['clean:interm','assemble:interm']);
	//grunt.registerTask('build', ['clean:build','assemble']);

	// grunt.registerTask('build', [
	// 	'useminPrepare',
	// 	'concat',
	// 	'cssmin',
	// 	'uglify',
	// 	'filerev',
	// 	'usemin'
	// ]);

	// htmlconcat task
	// grunt.registerTask('scaffolding', ['includereplace:scaffolding']);

	// images
	// grunt.registerTask('images', ['clean:images', 'responsive_images', 'imagemin', 'svg']);
	grunt.registerTask('images', ['clean:images', 'imagemin', 'responsive_images', 'svg']);
	//grunt.registerTask('imagetest', ['responsive_images']);

	//js concat and uglify
	grunt.registerTask('scripts', ['modernizr', 'concat', 'uglify', 'requirejs']);

	// Default task.
	grunt.registerTask('default', ['watch']);

};
