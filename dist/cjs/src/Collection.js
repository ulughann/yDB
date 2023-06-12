"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const util_1 = require("./util");
class Collection {
    constructor(values) {
        this.map = new Map(values ? values : []);
    }
    /**
     * @description Returns the size of the collection
     * @returns {"number"}
     */
    size() {
        return this.map.size;
    }
    /**
     * @description Returns all values
     * @returns {IterableIterator<any>}
     */
    values() {
        return this.map.values();
    }
    /**
     * @description Returns all entries
     * @returns {IterableIterator<any>}
     */
    entries() {
        return this.map.entries();
    }
    /**
     * @description Get all keys
     * @returns {IterableIterator<any>}
     */
    keys() {
        return this.map.keys();
    }
    /**
     * @description Makes clear elements of the map
     * @returns {IterableIterator<any>}
     */
    clear() {
        return this.map.clear();
    }
    /**
     * @description Adds an element with an arithmetic operation to the map
     * @returns {void}
     */
    math(key, operator, value, goToNegative = false) {
        if (!/^-?\d+$/.test(`${value}`))
            throw Error((0, util_1.formatErrorMessage)("Invlid Type Value", "Collection", "Method", "math"));
        if (!`${operator}`.match(/(\-|\+|\/|\*)/g))
            throw Error((0, util_1.formatErrorMessage)("Invlid Type Operator", "Collection", "Method", "math"));
        if (typeof goToNegative != "boolean")
            throw Error((0, util_1.formatErrorMessage)("Invlid Type goToNegative", "Collection", "Method", "math"));
        if (!this.has(key)) {
            this.set(key, value);
        }
        else {
            this.set(key, eval(`${this.get(key)}${operator}${value}`));
        }
    }
    /**
     * @returns {any[]}
     */
    toArray() {
        return Array.from(this.map);
    }
    /**
     * @returns {any[]}
     */
    toObject() {
        return Object.fromEntries(this.map);
    }
    /**
     * @returns {any[]}
     */
    isEmpty() {
        return this.map.size == 0 ? true : false;
    }
    /**
     * @returns number
     */
    findIndex(key) {
        return this.toArray().findIndex((o) => o[0] == key) < 0
            ? 0
            : this.toArray().findIndex((o) => o[0] == key);
    }
    /**
     * @returns {any}
     */
    findByIndex(index) {
        return this.toArray()[index];
    }
    /**
     * @returns {any}
     */
    findByValue(value) {
        return this.toArray().find((v) => v[1] == value);
    }
    /**
     * @returns {Map<any, any>}
     */
    reverse() {
        this.map = new Map([...this.map].reverse());
        return this.map;
    }
    /**
     * @returns {"string"}
     */
    toJSON() {
        return JSON.stringify(this.toArray());
    }
    /**
     * @returns {"void"}
     */
    deleteEach(...keys) {
        if (Array.isArray(keys[0])) {
            keys[0].forEach((key) => {
                this.delete(key);
            });
        }
        else {
            keys.forEach((key) => {
                this.delete(key);
            });
        }
    }
    /**
     * @returns {"void"}
     */
    delete(key) {
        if (key instanceof Object) {
            let new_collection = new Map();
            let count = 0;
            this.map.forEach((value, item) => {
                count++;
                if (JSON.stringify(key) != JSON.stringify(item))
                    new_collection.set(value, item);
                if (count == this.map.size) {
                    return new_collection;
                }
            });
            this.map = new_collection;
        }
        else {
            this.map.delete(key);
        }
    }
    /**
     * @returns {"any"}
     */
    set(key, value) {
        if (key instanceof Object) {
            if (this.has(key) == true) {
                this.delete(key);
                this.map.set(key, value);
            }
            else {
                this.map.set(key, value);
            }
        }
        else {
            this.map.set(key, value);
        }
    }
    /**
     * @returns {"any"}
     */
    get(key) {
        if (key instanceof Object) {
            let res;
            let count = 0;
            this.map.forEach((item_value, item) => {
                count++;
                if (JSON.stringify(key) == JSON.stringify(item))
                    res = item_value;
                if (count == this.map.size) {
                    return res;
                }
            });
            return res;
        }
        else {
            return this.map.get(key);
        }
    }
    /**
     * @returns {"boolean"}
     */
    has(key) {
        if (key instanceof Object) {
            let res = false;
            let count = 0;
            this.map.forEach((item_value, item) => {
                count++;
                if (JSON.stringify(key) == JSON.stringify(item))
                    res = true;
                if (count == this.map.size) {
                    return res;
                }
            });
            return res;
        }
        else {
            return this.map.has(key);
        }
    }
}
exports.Collection = Collection;
