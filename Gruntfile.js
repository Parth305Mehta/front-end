'use strict';

module.exports = function(grunt){

    require('time-grunt')(grunt);

    require('jit-grunt')(grunt,{
        useminPrepare:'grunt-usemin'
    });
    
    grunt.initConfig({
        sass: {
            dist:{
                files:{
                    'CSS/styles.css':'CSS/styles.scss'
                }
            }
        },
       watch: {
           files:'CSS/*.scss',
           tasks: ['sass']
       },
       browserSync:{
           dev:{
               bsFiles:{
                   src:[
                       'CSS/*.css',
                       '*.html',
                       'JS/*.js'
                   ]
               },
               options:{
                 watchTask: true,
                 server:{
                     baseDir:'./'
                 }
               }
           }
       },
       copy:{
           html: {
               files:[{
                   expand:true,
                   dot:true,
                   cwd:'./',
                   src:['*.html'],
                   dest:'dist'
               }]
           },
           fonts:{
               files:[{
                expand:true,
                dot:true,
                cwd:'node_modules/font-awesome',
                src:['fonts/*.*'],
                dest:'dist' 
               }]
           }
       },
       clean:{
           build:{
               src:['dist/']
           }
       },
       imagemin:{
           dynamic:{
               files:[{
                expand:true,
                dot:true,
                cwd:'./',
                src:['img/*.{png,jpeg,jpg,gif}'],
                dest:'dist/'  
               }]
           }
       },
       useminPrepare:{
            foo:{
                dest:'dist',
                src:['index.html']
            },
            options:{
                flow:{
                  steps:{
                      css:['cssmin'],
                      js:['uglify']
                  },
                  post: {
                      css:[{
                          name:'cssmin',
                          createConfig: function(context,block){
                              var generated = context.options.generated;
                              generated.options = {
                                  keepSpecialComments:0, rebase:false
                              };
                          }
                      }]
                  } 
                }
            }
        },
        concat :{
            options:{
                separator:':'
            },
            dist:{}
        },
        uglify:{
            dist:{}
        },
        cssmin:{
            dist:{}
        },
        filerev:{
            options:{
                encoding:'utf8',
                algorithm:'md5',
                length:20
            },
            release:{
                files:[{
                    src:[
                        'dist/JS/*.js',
                        'dist/CSS/*.css'
                    ]
                }]
            }
        },
        usemin:{
            html:['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options:{
                assetsDirs:['dist','dist/CSS','dist/JS']
            }
        },
        htmlmin:{
            dist:{
                options:{
                    collapseWhitespace:true
                },
                files: {                                   
                    'dist/index.html': 'dist/index.html',  
                    'dist/contactus.html': 'dist/contactus.html',
                    'dist/aboutus.html': 'dist/aboutus.html',
                } 
            }
        }
    });

    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync','watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};