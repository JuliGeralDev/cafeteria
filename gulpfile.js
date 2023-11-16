const { src, dest, watch, series, parallel} = require('gulp');

//css ssas
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif')

function css(done){
    //Compilar sass
    //Pasos: 1. Identificar archivo, 2. Compilarla, 3. Guardar el .css

    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( postcss([autoprefixer]) )
        .pipe( dest('build/css') )
    
    done();

}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function versionWebp(){
    const opciones={
        quality: 50 
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}

function versionAvif(){
    const opciones={
        quality: 50 
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes); //Archivo y función

}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev);
// exports.default = parallel( css, dev);



//series - Se inicia una tarea y has que finaliza, inici la siguiente
//parallel - Todas inician al mismo tiempo




// function tarea( done ) {
//     console.log('DESDE MI PRIEMR TAREA');
//     done();
// }

// exports.primerTarea = tarea;
