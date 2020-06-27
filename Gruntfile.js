'use strict';

module.exports = function(grunt){

    require('time-grunt')(grunt);

    require('jit-grunt')(grunt);
    
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
                 watchTask:  true,
                 server:{
                     baseDir:'./'
                 }
               }
           }
       } 
    });

    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync','watch']);
};