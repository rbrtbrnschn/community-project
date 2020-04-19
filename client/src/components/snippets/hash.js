"use strict";
exports.__esModule = true;
function hash() {
    var id = Math.round(Math.random() * 10000);
    if (id < 1000) {
        return hash();
    }
    else {
        return id;
    }
}
exports.hash = hash;
