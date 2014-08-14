define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    module.exports = {
        log: function(str, type) {
            var D = false; // window.LOG_CONSOLE || false;

            type = type || 'log';
            D && console.log(type + ' || ' + str);
        }
    };
});
