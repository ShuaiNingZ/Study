/*
$('.wrap').click(function(){
    $(this).css({
        backgroundColor: '#cff'
    })
})*/

define(function (require, exports, module) {
    var $ = require('jquery');
    console.log($);
    exports.add = function (a, b) {
        return a + b;
    }
})
