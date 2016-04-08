module.exports = function (grunt) {
  'use strict';
  var config = require('./config/gruntConfig.js'),
    mainConfig = require('./config/config.json');

  var jsPattern = config.src.scripts + '**/*';

  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-contrib-*', 'grunt-shell', 'grunt-*']
  });

  grunt.initConfig({
    pkg: config,

    clean: {
      all: [config.paths.prod],
      tpl: [config.src.scripts + 'templates.js']
    },

    jshint: {
      files: ['Gruntfile.js', '<%= pkg.src.scripts%>'],
      options: {
        ignores: []
      }
    },

    concat: {
      options: {
        separator: '\n'
      },
      js: {
        src: [jsPattern + 'module.js',
              jsPattern + 'filter.js',
              jsPattern + 'server.js',
              jsPattern + 'controller.js',
              jsPattern + 'templates.js',
              jsPattern + '*.js'],
        dest: config.output.script
      },
      html: {
        src: config.src.views + 'index.html',
        dest: config.output.view
      },
      scss: {
        src: config.src.styles + '**/*.scss',
        dest: config.output.style
      }
    },

    uglify: {
      dist: {
        src: config.output.script,
        dest: config.output.script
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      css: {
        src: config.output.style,
        dest: config.output.style
      }
    },

    sass: {
      options: {
        sourcemap: 'none'
      },
      dist: {
        files: [{
          expand: true,
          cwd: config.output.style.replace(/[^/]+$/, ''),
          src: ['*.css'],
          dest: config.output.style.replace(/[^/]+$/, ''),
          ext: config.output.styleExt
      }]
      }
    },

    bower_concat: {
      all: {
        dest: config.output.libs,
        dependencies: {
          'jquery-mousewheel': 'jquery'
        },
        bowerOptions: {
          relative: false
        }
      }
    },

    run: {
      start: {
        args: ['./server/index.js']
      }
    },

    open: {
      dev: {
        path: "http://" + mainConfig.host + ':' + mainConfig.port
      }
    },

    watch: {
      all: {
        files: [config.paths.dev + '**/*.*'],
        tasks: ['build', 'writeBody'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    
    ngtemplates: {
      // TODO: need move this name to config
      uProject: {
        cwd: config.src.scripts,
        src: '**/*view.html',
        dest: config.src.scripts + 'templates.js',
        options: {
          htmlmin: {
            collapseWhitespace: true,
            collapseBooleanAttributes: true
          }
        }
      }
    }

  });

  var tasks = ['clean:all', 'jshint', 'ngtemplates',
               'concat', 'sass', 'uglify',
               'cssmin', 'bower_concat'];

  grunt.registerTask('default', tasks);

  grunt.registerTask('build', function (dev) {
    var buildTasks = tasks.concat('clean:tpl'),
        index;
    
    if (dev === 'dev') {
      index = buildTasks.indexOf('uglify');
      buildTasks.splice(index, 1);
    }
    
    grunt.task.run(buildTasks);
  });

  grunt.registerTask('writeBody', function () {
    var reloadScript = '<script src="//localhost:35729/livereload.js"></script>',
      html;

    html = grunt.file.read(config.output.view);
    if (!/localhost:35729/.test(html)) {
      grunt.file.write(config.output.view, html.replace('</body', reloadScript + '</body'));
    }
  });

  grunt.registerTask('server', function(dev) {
    var buildAdd = dev === 'dev' ? ':dev' : '';
    grunt.task.run('build' + buildAdd, 'open', 'run');
  });

};