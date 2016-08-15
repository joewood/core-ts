"use strict";
require("core-js/fn/object");
// NB - the filenames are case sensitive (even on Windows using React-Native packager)
var _groupBy = require("lodash/groupBy");
var _mapKeys = require("lodash/mapKeys");
var _keyBy = require("lodash/keyBy");
var _maxBy = require("lodash/maxBy");
var _minBy = require("lodash/minBy");
var _uniq = require("lodash/uniq");
var _sortBy = require("lodash/sortBy");
var _find = require("lodash/find");
var _some = require("lodash/some");
var _max = require("lodash/max");
var _range = require("lodash/range");
var _flatten = require("lodash/flatten");
var _debounce = require("lodash/debounce");
exports.groupBy = _groupBy;
exports.mapKeys = _mapKeys;
exports.keyBy = _keyBy;
exports.maxBy = _maxBy;
exports.minBy = _minBy;
exports.uniq = _uniq;
exports.sortBy = _sortBy;
exports.find = _find;
exports.some = _some;
exports.max = _max;
exports.range = _range;
exports.flatten = _flatten;
exports.debounce = _debounce;
function merge(source, source2, source3) {
    return Object.assign({}, source, source2, source3);
}
exports.merge = merge;
/** Show the differences between two objects. Shallow Compare Only. */
function showDifferences(sourcea, sourceb, ignoreKeys, ignoreCase) {
    if (ignoreKeys === void 0) { ignoreKeys = []; }
    var differences = [];
    var keysa = Object.keys(sourcea);
    for (var _i = 0, keysa_1 = keysa; _i < keysa_1.length; _i++) {
        var key = keysa_1[_i];
        if (ignoreKeys.indexOf(key) >= 0)
            continue;
        if (typeof sourcea[key] === "Object")
            continue;
        if (sourcea[key] !== sourceb[key]) {
            if (ignoreCase
                && typeof sourcea[key] === "string"
                && typeof sourceb[key] === "string"
                && sourcea[key].toUpperCase() === sourceb[key].toUpperCase())
                continue;
            differences.push(key);
        }
    }
    for (var _a = 0, _b = Object.keys(sourceb); _a < _b.length; _a++) {
        var key = _b[_a];
        if (keysa.indexOf(key) >= 0)
            continue;
        if (ignoreKeys.indexOf(key) >= 0)
            continue;
        if (typeof sourceb[key] === "Object")
            continue;
        if (sourcea[key] !== sourceb[key]) {
            if (ignoreCase
                && typeof sourcea[key] === "string"
                && typeof sourceb[key] === "string"
                && sourcea[key].toUpperCase() === sourceb[key].toUpperCase())
                continue;
            differences.push(key);
        }
    }
    return differences;
}
exports.showDifferences = showDifferences;
/** Compares two arrays of the same type for Equality using shallow comparison.
 *  Returns true only if the order is the same.
 */
function isArraySame(a, b) {
    if (a === b)
        return true;
    if (!a || !b)
        return false;
    if (a.length !== b.length)
        return false;
    for (var n = 0; n < a.length; n++) {
        if (a[n] !== b[n])
            return false;
    }
    return true;
}
exports.isArraySame = isArraySame;
function similar(a, b) {
    if (!a && !b)
        return true;
    if (!a || !b)
        return false;
    var ignoreChars = /[\'\-\.\/\(\)]/g;
    if (a === b)
        return true;
    var stra = a.trim().toUpperCase().replace(ignoreChars, "");
    var strb = b.trim().toUpperCase().replace(ignoreChars, "");
    return stra === strb;
}
exports.similar = similar;
function pascalCase(str) {
    if (!str)
        return str;
    if (str.length === 0)
        return str;
    return str[0].toUpperCase() + str.slice(1).toLocaleLowerCase();
}
exports.pascalCase = pascalCase;
function camelToUnderscore(str) {
    return splitCamel(str).join("_").toLowerCase();
}
exports.camelToUnderscore = camelToUnderscore;
function splitCamel(str) {
    var target = [];
    var index = 0;
    for (var n = 0; n < str.length; n++) {
        if (n == 0 || (str[n] >= "a" && str[n] <= "z"))
            continue;
        target.push(str.substr(index, n));
        index = n;
    }
    if (index < str.length)
        target.push(str.substr(index));
    return target;
}
exports.splitCamel = splitCamel;
function values(dict) {
    if (!dict) {
        return [];
    }
    return Object.values(dict);
}
exports.values = values;
// export function promiseSequence<T>(promises: Promise<T>[]): Promise<T[]> {
//     return promises.reduce(function (p, c) {
//         return p.then(function (retValues) {
//             return c.then(function (retValue) {
//                 return retValues.concat([retValue]);
//             });
//         });
//     }, Promise.resolve([]));
// }
function promiseFSequence(promises) {
    return promises.reduce(function (p, c) {
        return p.then(function (retValues) {
            return c().then(function (retValue) {
                return retValues.concat([retValue]);
            });
        });
    }, Promise.resolve([]));
}
exports.promiseFSequence = promiseFSequence;
//# sourceMappingURL=core.js.map