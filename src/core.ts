require("core-js/fn/object");
import * as _ from "lodash";
const _groupBy = require("lodash/groupby");
const _mapKeys = require("lodash/mapkeys");
const _keyBy = require("lodash/keyby");
const _maxBy = require("lodash/maxBy");
const _minBy = require("lodash/minBy");
const _uniq = require("lodash/uniq");
const _sortBy = require("lodash/sortby");
const _find = require("lodash/find");
const _some = require("lodash/some");
const _max = require("lodash/max");
const _range = require("lodash/range");
const _flatten = require("lodash/flatten");
const _debounce = require("lodash/debounce");

export let groupBy = _groupBy as typeof _.groupBy;
export let mapKeys = _mapKeys as typeof _.mapKeys;
export let keyBy = _keyBy as typeof _.keyBy;
export let maxBy = _maxBy as typeof _.maxBy;
export let minBy = _minBy as typeof _.minBy;
export let uniq = _uniq as typeof _.uniq;
export let sortBy = _sortBy as typeof _.sortBy;
export let find = _find as typeof _.find;
export let some = _some as typeof _.some;
export let max = _max as typeof _.max;
export let range = _range as typeof _.range;
export let flatten = _flatten as typeof _.flatten;
export let debounce = _debounce as typeof _.debounce;

export function merge(source: any, source2?: any, source3?: any) {
    return Object.assign({}, source, source2, source3);
}

/** Show the differences between two objects. Shallow Compare Only. */
export function showDifferences(sourcea: any, sourceb: any, ignoreKeys = [] as string[], ignoreCase?: boolean): string[] {
    const differences = [] as string[];
    const keysa = Object.keys(sourcea);
    for (let key of keysa) {
        if (ignoreKeys.indexOf(key) >= 0) continue;
        if (typeof sourcea[key] === "Object") continue;
        if (sourcea[key] !== sourceb[key]) {
            if (ignoreCase
                && typeof sourcea[key] === "string"
                && typeof sourceb[key] === "string"
                && sourcea[key].toUpperCase() === sourceb[key].toUpperCase()) continue;
            differences.push(key);
        }
    }
    for (let key of Object.keys(sourceb)) {
        if (keysa.indexOf(key) >= 0) continue;
        if (ignoreKeys.indexOf(key) >= 0) continue;
        if (typeof sourceb[key] === "Object") continue;
        if (sourcea[key] !== sourceb[key]) {
            if (ignoreCase
                && typeof sourcea[key] === "string"
                && typeof sourceb[key] === "string"
                && sourcea[key].toUpperCase() === sourceb[key].toUpperCase()) continue;
            differences.push(key);
        }
    }
    return differences;
}

/** Compares two arrays of the same type for Equality using shallow comparison.
 *  Returns true only if the order is the same.
 */
export function isArraySame<T>(a: T[], b: T[]): boolean {
    if (a === b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    for (let n = 0; n < a.length; n++) {
        if (a[n] !== b[n]) return false;
    }
    return true;
}

export function similar(a: string, b: string): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    const ignoreChars = /[\'\-\.\/\(\)]/g;
    if (a === b) return true;
    const stra = a.trim().toUpperCase().replace(ignoreChars, "");
    const strb = b.trim().toUpperCase().replace(ignoreChars, "");
    return stra === strb;
}

export function pascalCase(str: string): string {
    if (!str) return str;
    if (str.length === 0) return str;
    return str[0].toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export function values<T>(dict: { [index: string]: T }): T[] {
    if (!dict) { return []; }
    return (Object.values(dict) as T[]);
}

// export function promiseSequence<T>(promises: Promise<T>[]): Promise<T[]> {
//     return promises.reduce(function (p, c) {
//         return p.then(function (retValues) {
//             return c.then(function (retValue) {
//                 return retValues.concat([retValue]);
//             });
//         });
//     }, Promise.resolve([]));
// }

export function promiseFSequence<T>(promises:(() =>  Promise<T>)[]): Promise<T[]> {
    return promises.reduce(function (p, c) {
        return p.then(function (retValues) {
            return c().then(function (retValue) {
                return retValues.concat([retValue]);
            });
        });
    }, Promise.resolve([]));
}