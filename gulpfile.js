const { src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done){
    //Compilar sass
    //Pasos: 1. Identificar archivo, 2. Compilarla, 3. Guardar el .css

    src('src/scss/app.scss')
        .pipe( sass({outputStyle: 'compressed'}) )
        .pipe( postcss([autoprefixer]) )
        .pipe( dest('build/css') )
    
    done();

}

function dev(){
    watch('src/scss/**/*.scss', css);
    // watch('src/scss/app.scss', css); //Archivo y función

}



exports.css = css;
exports.dev = dev;
exports.default = series( css, dev);
// exports.default = parallel( css, dev);



//series - Se inicia una tarea y has que finaliza, inici la siguiente
//parallel - Todas inician al mismo tiempo




// function tarea( done ) {
//     console.log('DESDE MI PRIEMR TAREA');
//     done();
// }

// exports.primerTarea = tarea;
