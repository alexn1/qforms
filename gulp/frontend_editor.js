const path      = require('path');
const gulp      = require('gulp');
// const uglify    = require('gulp-uglify');
// const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const hash = require('gulp-hash-filename');
const order = require('gulp-order');

const SRC_PATH   = "./src";
const BUILD_PATH = './build';

function frontend_editor_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.js'))
        // .pipe(sourcemaps.init())
        .pipe(order([
            'EditorFrontHostApp/EditorFrontHostApp.js',
            'FormWizard/FormWizard.js',
            'FormWizard/MySqlFormWizard/MySqlFormWizard.js',
            'FormWizard/PostgreSqlFormWizard/PostgreSqlFormWizard.js',
            'ModalController/ModalController.js',
            'ModalController/ChangeClassController/ChangeClassController.js',
            'ModalController/NewActionController/NewActionController.js',
            'ModalController/NewColumnController/NewColumnController.js',
            'ModalController/NewDatabaseController/NewDatabaseController.js',
            'ModalController/NewDataSourceController/NewDataSourceController.js',
            'ModalController/NewFieldController/NewFieldController.js',
            'ModalController/NewFormController/NewFormController.js',
            'ModalController/NewFormFromTableController/NewFormFromTableController.js',
            'ModalController/NewKeyColumnController/NewKeyColumnController.js',
            'ModalController/NewPageController/NewPageController.js',
            'ModalController/NewParamController/NewParamController.js',
            'ModalController/NewTableController/NewTableController.js',
            'Model/Model.js',
            'Model/Action/Action.js',
            'Model/Application/Application.js',
            'Model/Column/Column.js',
            'Model/Database/Database.js',
            'Model/DataSource/DataSource.js',
            'Model/Field/Field.js',
            'Model/Form/Form.js',
            'Model/KeyColumn/KeyColumn.js',
            'Model/Page/Page.js',
            'Model/PageLink/PageLink.js',
            'Model/Param/Param.js',
            'Model/Table/Table.js',
            'ModelController/ModelController.js',
            'ModelController/ActionController/ActionController.js',
            'ModelController/ColumnController/ColumnController.js',
            'ModelController/DocumentController/DocumentController.js',
            'ModelController/DocumentController/DatabaseController/DatabaseController.js',
            'ModelController/DocumentController/DataSourceController/DataSourceController.js',
            'ModelController/DocumentController/TableController/TableController.js',
            'ModelController/DocumentController/TableController/TableController.js',
            'ModelController/DocumentController/VisualController/VisualController.js',
            'ModelController/DocumentController/VisualController/ApplicationController/ApplicationController.js',
            'ModelController/DocumentController/VisualController/FieldController/FieldController.js',
            'ModelController/DocumentController/VisualController/FormController/FormController.js',
            'ModelController/DocumentController/VisualController/PageController/PageController.js',
            'ModelController/KeyColumnController/KeyColumnController.js',
            'ModelController/PageLinkController/PageLinkController.js',
            'ModelController/ParamController/ParamController.js',
        ]))
        .pipe(concat('editor.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        //.pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/js')));
}

function frontend_editor_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.jsx'))
        .pipe(order([
            'ActionList/ActionList.jsx',
            'EditorFrontHostApp/EditorFrontHostAppView.jsx',
            'ModalController/ModalView.jsx',
            'ModalController/ChangeClassController/ChangeClassView.jsx',
            'ModalController/NewActionController/NewActionController.jsx',
            'ModalController/NewColumnController/NewColumnController.jsx',
            'ModalController/NewDatabaseController/NewDatabaseController.jsx',
            'ModalController/NewDataSourceController/NewDataSourceController.jsx',
            'ModalController/NewFieldController/NewFieldController.jsx',
            'ModalController/NewFormController/NewFormController.jsx',
            'ModalController/NewFormFromTableController/NewFormFromTableController.jsx',
            'ModalController/NewKeyColumnController/NewKeyColumnController.jsx',
            'ModalController/NewPageController/NewPageController.jsx',
            'ModalController/NewParamController/NewParamController.jsx',
            'ModalController/NewTableController/NewTableController.jsx',
            'ModelController/DocumentController/DocumentView.jsx',
            'ModelController/DatabaseController/DatabaseView.jsx',
            'ModelController/DataSourceController/SqlDataSourceView.jsx',
            'ModelController/TableController/TableView.jsx',
            'ModelController/VisualController/VisualView.jsx',
            'PropertyGrid/PropertyGrid.jsx',
            'TreeWidget/TreeItem.jsx',
            'TreeWidget/TreeWidget.jsx',
        ]))
        // .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('editor-jsx.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/js')));
}

function frontend_editor_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.less'))
        // .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(order())
        .pipe(concat('editor.css'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(minifyCss())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/css')));
}

function frontend_editor_img() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/img/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/img')));
}

const frontend_editor = gulp.series(
    frontend_editor_js,
    frontend_editor_jsx,
    frontend_editor_less,
    frontend_editor_img,
);

module.exports = frontend_editor;
