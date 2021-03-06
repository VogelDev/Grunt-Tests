module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // notify_hooks: {
    //   options: {
    //     enable: true,
    //     max_jshint_notifications: 5,
    //     title: "Project Name"
    //   },
    //   uncss: {
    //     optiosn: {
    //       title: "did this work?",
    //       message: "and error somewhere",
    //     }
    //   }
    // },
    //
    // uncss: {
    //   dist: {
    //     files: {
    //       'css/dist/style.css': ['*.html'],
    //     }
    //   }
    // },

    less: {
      development: {
        options: {
          paths: ["less/src/"]
        },
        files: {
          "css/dist/style.full.css": "less/src/style.less"
        }
      }
    },

    concat: {
      options: {
        seperator: ";",
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%=pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      dist: {
        src: ['js/src/script.js', 'js/src/script2.js'],
        dest: 'js/dist/<%= pkg.name %>-<%=pkg.version %>.js'
      }
    },

    uglify: {
      options: {
        mangle: false,
        preserveComments: 'all',
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: {
          'js/dist/<%= pkg.name %>-<%=pkg.version %>.min.js': ['js/dist/<%= pkg.name %>-<%=pkg.version %>.js']
        }
      }
    },

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'css/dist/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/dist/',
          ext: '.min.css'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'index.html'
        }
      }
    },

    clean: {
      dist: ["**/dist/"]
    },

    prettify: {
      options: {
        indent: 2,
        indent_char: ' ',
        wrap_line_length: 78,
        brace_style: 'expand',
        unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
      },
      files: {
        'dist/index.html': ['dist/index.html']
      }
    },

    includeSource: {
      options: {
        basePath: ''
      },
      myTarget: {
        files: {
          'dist/index.html': 'index.html'
        }
      }
    }

  });

  // grunt.loadNpmTasks('grunt-uncss');
  // grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ["clean", "concat", "uglify", "less", "cssmin", "includeSource"]);

  //grunt.task.run('notify_hooks');

}
