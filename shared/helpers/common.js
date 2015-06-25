import DeepMerge from "deep-merge";
import {assoc, filter, flatten, pipe, prop, keys, map, mapIndexed, range, reduce, reduceIndexed, reverse, slice, sortBy} from "ramda";
import flat from "flat";

// HELPERS =========================================================================================
// Workaround until https://github.com/ramda/ramda/issues/1073 (wait for release) //////////////////
export const mergeDeep = DeepMerge((a, b, key) => {
  return b;
});
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Split array into chunks with predefined chunk length. Useful for pagination.
 * Example:
 *   chunked([1, 2, 3, 4, 5], 2) == [[1, 2], [3, 4], [5]]
 * @pure
 * @curry
 * @param array {Array} - array to be chunked
 * @param n {number} - length of chunk
 * @return {Array} - chunked array
 */
export function chunked(n, array) {
  if (array === undefined) {
    return chunked.bind(null, n);
  } else {
    let l = Math.ceil(array.length / n);
    return mapIndexed(
      (x, i) => array.slice(i * n, i * n + n),
      range(0, l)
    );
  }
}

/**
 * Filter array by `filters` argument
 * @pure
 * @curry
 * @param filters {Object<string, *>} - filters, e.g. {age: 30}
 * @param data {Array<*>} - unsorted data
 * @return {Array<*>} - sorted data
 */
export function filterByAll(filters, data) {
  if (data === undefined) {
    return filterByAll.bind(null, filters);
  } else {
    return reduce((memo, filterKey) => {
      let filterValue = filters[filterKey];
      let filterer = filter(d => d && (d[filterKey] == filterValue));
      return filterer(memo);
    }, data, keys(filters));
  }
}

/**
 * Sort array by `sorts` argument
 * @pure
 * @curry
 * @param sorts {Array<string>} - sorts, e.g. ["+name", "-age"]
 * @param data {Array<*>} - unsorted data
 * @returns {Array<*>} - sorted data
 */
export function sortByAll(sorts, data) {
  if (data === undefined) {
    return sortByAll.bind(null, sorts);
  } else {
    return reduce((memo, sort) => {
      let sorter;
      if (sort.startsWith("-")) {
        sorter = pipe(sortBy(prop(sort.slice(1))), reverse);
      } else if (sort.startsWith("+") || sort.startsWith(" ")) {
        sorter = sortBy(prop(sort.slice(1)));
      } else {
        sorter = sortBy(prop(sort), true);
      }
      return sorter(memo);
    }, data, reverse(sorts));
  }
}

export function flattenArrayObject(object, sorter=(v => v)) {
  let sortedKeys = sortBy(sorter, keys(object));
  return reduce((combinedArray, key) => {
    return combinedArray.concat(object[key]);
  }, [], sortedKeys);
}

export function flattenObject(obj) {
  return flat(obj, {safe: true});
}

export function unflattenObject(obj) {
  return flat.unflatten(obj, {object: false});
}

export function toObject(array, keyProp="id") {
  if (array instanceof Array) {
    return reduce((memo, item) => {
      return assoc(item[keyProp], item, memo);
    }, {}, array);
  } else {
    throw Error(`array must be plain Array, got ${array}`);
  }
}

export function toArray(object, keyProp="id") {
  if (object instanceof Object) {
    return sortBy(
      item => item[keyProp],
      map(key => object[key], keys(object))
    );
  } else {
    throw Error(`object must be a basic Object, got ${object}`);
  }
}

export function normalize(data) {
  if (data instanceof Array) {
    return map(v => normalize(v), data);
  } else if (data instanceof Object) {
    return reduce((obj, k) => {
      if (k.includes(".")) {
        let kk = k.split(".");
        obj[kk[0]] = normalize({[kk.slice(1).join(".")]: data[k]});
      } else {
        obj[k] = normalize(data[k]);
      }
      return obj;
    }, {}, keys(data));
  } else if (typeof data == "string") {
    if (data === "false") {
      return false;
    } else if (data === "true") {
      return true;
    } else if (data === "undefined") {
      return undefined;
    } else if (data === "null") {
      return null;
    } else if (data.match(/^-?\d+\.\d+/)) {
      return parseFloat(data);
    } else if (data.match(/^-?\d+/)) {
      return parseInt(data);
    } else {
      return data;
    }
  } else {
    return data;
  }
}
