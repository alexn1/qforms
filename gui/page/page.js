'use strict';

$(document).ready(function () {
    var grid = $('#grid').get(0)._obj;
    console.log('grid', grid);

    var bodyRow0 = grid.createBodyRow(0);
    var bodyRow1 = grid.createBodyRow(1);
    var bodyRow2 = grid.createBodyRow(2);
    var bodyRow3 = grid.createBodyRow(3);
    var bodyRow4 = grid.createBodyRow(4);

    $(bodyRow0.bodyCells.first_name).children('div').children('span').text('abc');
});