'use strict';

$(document).ready(function () {
    console.log('page.js');

    var grid = $('#grid').get(0)._obj;

    var bodyRow0 = grid.createBodyRow(0);
    var $view = $(bodyRow0.bodyCells.first_name).children('div');

    $view.addClass('TableFormTextBoxFieldView');
    $view.children('span').text('abc');

    var bodyRow1 = grid.createBodyRow(1);
    var bodyRow2 = grid.createBodyRow(2);
    var bodyRow3 = grid.createBodyRow(3);
    var bodyRow4 = grid.createBodyRow(4);

    console.log('grid', grid);
});