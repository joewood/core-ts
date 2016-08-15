/// <reference types="lodash" />
import "core-js/fn/object";
import * as _ from "lodash";
export declare let groupBy: {
    <T, TKey>(collection: _.List<T>, iteratee?: _.ListIterator<T, TKey>): _.Dictionary<T[]>;
    <T>(collection: _.List<any>, iteratee?: _.ListIterator<T, any>): _.Dictionary<T[]>;
    <T, TKey>(collection: _.Dictionary<T>, iteratee?: _.DictionaryIterator<T, TKey>): _.Dictionary<T[]>;
    <T>(collection: _.Dictionary<any>, iteratee?: _.DictionaryIterator<T, any>): _.Dictionary<T[]>;
    <T, TValue>(collection: _.List<T> | _.Dictionary<T>, iteratee?: string): _.Dictionary<T[]>;
    <T>(collection: _.List<T> | _.Dictionary<T>, iteratee?: string): _.Dictionary<T[]>;
    <TWhere, T>(collection: _.List<T> | _.Dictionary<T>, iteratee?: TWhere): _.Dictionary<T[]>;
    <T>(collection: _.List<T> | _.Dictionary<T>, iteratee?: Object): _.Dictionary<T[]>;
};
export declare let mapKeys: {
    <T, TKey>(object: _.List<T>, iteratee?: _.ListIterator<T, TKey>): _.Dictionary<T>;
    <T, TKey>(object: _.Dictionary<T>, iteratee?: _.DictionaryIterator<T, TKey>): _.Dictionary<T>;
    <T, TObject extends {}>(object: _.List<T> | _.Dictionary<T>, iteratee?: TObject): _.Dictionary<T>;
    <T>(object: _.List<T> | _.Dictionary<T>, iteratee?: string): _.Dictionary<T>;
};
export declare let keyBy: {
    <T>(collection: _.List<T>, iteratee?: _.ListIterator<T, any>): _.Dictionary<T>;
    <T>(collection: _.NumericDictionary<T>, iteratee?: _.NumericDictionaryIterator<T, any>): _.Dictionary<T>;
    <T>(collection: _.Dictionary<T>, iteratee?: _.DictionaryIterator<T, any>): _.Dictionary<T>;
    <T>(collection: _.List<T> | _.NumericDictionary<T> | _.Dictionary<T>, iteratee?: string): _.Dictionary<T>;
    <W extends Object, T>(collection: _.List<T> | _.NumericDictionary<T> | _.Dictionary<T>, iteratee?: W): _.Dictionary<T>;
    <T>(collection: _.List<T> | _.NumericDictionary<T> | _.Dictionary<T>, iteratee?: Object): _.Dictionary<T>;
};
export declare let maxBy: {
    <T>(collection: _.List<T>, iteratee?: _.ListIterator<T, any>): T;
    <T>(collection: _.Dictionary<T>, iteratee?: _.DictionaryIterator<T, any>): T;
    <T>(collection: _.List<T> | _.Dictionary<T>, iteratee?: string): T;
    <TObject extends {}, T>(collection: _.List<T> | _.Dictionary<T>, whereValue?: TObject): T;
};
export declare let minBy: {
    <T>(collection: _.List<T>, iteratee?: _.ListIterator<T, any>): T;
    <T>(collection: _.Dictionary<T>, iteratee?: _.DictionaryIterator<T, any>): T;
    <T>(collection: _.List<T> | _.Dictionary<T>, iteratee?: string): T;
    <TObject extends {}, T>(collection: _.List<T> | _.Dictionary<T>, whereValue?: TObject): T;
};
export declare let uniq: {
    <T>(array: _.List<T>): T[];
    <T, TSort>(array: _.List<T>): T[];
};
export declare let sortBy: {
    <T, TSort>(collection: _.List<T>, iteratee?: _.ListIterator<T, TSort>): T[];
    <T, TSort>(collection: _.Dictionary<T>, iteratee?: _.DictionaryIterator<T, TSort>): T[];
    <T>(collection: _.List<T> | _.Dictionary<T>, iteratee: string): T[];
    <W extends {}, T>(collection: _.List<T> | _.Dictionary<T>, whereValue: W): T[];
    <T>(collection: _.List<T> | _.Dictionary<T>): T[];
    <T>(collection: T[] | _.List<T>, iteratees: (_.ListIterator<T, any> | string | Object)[]): T[];
    <T>(collection: T[] | _.List<T>, ...iteratees: (_.ListIterator<T, boolean> | Object | string)[]): T[];
};
export declare let find: {
    <T>(collection: _.List<T>, predicate?: _.ListIterator<T, boolean>): T;
    <T>(collection: _.Dictionary<T>, predicate?: _.DictionaryIterator<T, boolean>): T;
    <T>(collection: _.List<T> | _.Dictionary<T>, predicate?: string): T;
    <TObject extends {}, T>(collection: _.List<T> | _.Dictionary<T>, predicate?: TObject): T;
};
export declare let some: {
    <T>(collection: _.List<T>, predicate?: _.ListIterator<T, boolean>): boolean;
    <T>(collection: _.Dictionary<T>, predicate?: _.DictionaryIterator<T, boolean>): boolean;
    <T>(collection: _.NumericDictionary<T>, predicate?: _.NumericDictionaryIterator<T, boolean>): boolean;
    (collection: Object, predicate?: _.ObjectIterator<any, boolean>): boolean;
    <T>(collection: _.List<T> | _.Dictionary<T> | _.NumericDictionary<T>, predicate?: string | [string, any]): boolean;
    (collection: Object, predicate?: string | [string, any]): boolean;
    <TObject extends {}, T>(collection: _.List<T> | _.Dictionary<T> | _.NumericDictionary<T>, predicate?: TObject): boolean;
    <T>(collection: _.List<T> | _.Dictionary<T> | _.NumericDictionary<T>, predicate?: Object): boolean;
    <TObject extends {}>(collection: Object, predicate?: TObject): boolean;
};
export declare let max: <T>(collection: _.List<T>) => T;
export declare let range: {
    (start: number, end: number, step?: number): number[];
    (end: number, step?: number): number[];
};
export declare let flatten: {
    <T>(array: _.ListOfRecursiveArraysOrValues<T>, isDeep: boolean): T[];
    <T>(array: _.List<T | T[]>): T[];
    <T>(array: _.ListOfRecursiveArraysOrValues<T>): _.RecursiveArray<T>;
};
export declare let debounce: <T extends Function>(func: T, wait?: number, options?: _.DebounceSettings) => T & _.Cancelable;
export declare function merge(source: any, source2?: any, source3?: any): any;
/** Show the differences between two objects. Shallow Compare Only. */
export declare function showDifferences(sourcea: any, sourceb: any, ignoreKeys?: string[], ignoreCase?: boolean): string[];
/** Compares two arrays of the same type for Equality using shallow comparison.
 *  Returns true only if the order is the same.
 */
export declare function isArraySame<T>(a: T[], b: T[]): boolean;
export declare function similar(a: string, b: string): boolean;
export declare function pascalCase(str: string): string;
export declare function camelToUnderscore(str: string): string;
export declare function splitCamel(str: string): string[];
export declare function values<T>(dict: {
    [index: string]: T;
}): T[];
export declare function promiseFSequence<T>(promises: (() => Promise<T>)[]): Promise<T[]>;
