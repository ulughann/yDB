"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = exports.ElementInData = exports.Database = exports.Collection = void 0;
const util_1 = require("./util");
const Collection_1 = require("./Collection");
Object.defineProperty(exports, "Collection", { enumerable: true, get: function () { return Collection_1.Collection; } });
const events_1 = require("events");
const fs_1 = require("fs");
const string_crypto_1 = __importDefault(require("string-crypto"));
const ElementInData_1 = require("./ElementInData");
Object.defineProperty(exports, "ElementInData", { enumerable: true, get: function () { return ElementInData_1.ElementInData; } });
const Action_1 = require("./Action");
Object.defineProperty(exports, "Action", { enumerable: true, get: function () { return Action_1.Action; } });
class Database extends events_1.EventEmitter {
    constructor(path, options = {}) {
        var _a, _b;
        super();
        if (typeof path != "string")
            throw Error((0, util_1.formatErrorMessage)("The path must be of type string", "Database", "Property", "Path"));
        if (typeof options != "object")
            throw Error((0, util_1.formatErrorMessage)("The options must be of type object", "Database", "Property", "Options"));
        this.inputPath = path;
        this.cPath = options.cPath && options.cPath == true ? true : false;
        this.autoDecrypt =
            options.autoDecrypt && options.autoDecrypt == true ? true : false;
        this.fileExtension = path.endsWith("yml")
            ? "yml"
            : path.endsWith("yaml")
                ? "yaml"
                : "json";
        this.isYML =
            this.fileExtension == "yml" || this.fileExtension == "yaml"
                ? true
                : false;
        this.path = (0, util_1.pathResolve)(path, this.fileExtension, this.cPath);
        this.options = options;
        this.readyInDate = new Date();
        if (options.encryption && options.encryption.password)
            this.encryption = true;
        if ((_a = options.encryption) === null || _a === void 0 ? void 0 : _a.password)
            this.encryptionPassword = options.encryption.password;
        this.crypto = new string_crypto_1.default({
            digest: ((_b = options.encryption) === null || _b === void 0 ? void 0 : _b.digest) || "sha512",
        });
        this.style =
            options.style && typeof options.style == "object"
                ? options.style
                : Database.Style.Object;
        this.file_exists = (0, util_1.file_exists)(this.path);
        this.stringify = options.stringify
            ? options.stringify
            : this.isYML == true
                ? util_1.YAML.stringify
                : util_1.JSON_stringify;
        this.parse = options.parse
            ? options.parse
            : this.isYML == true
                ? util_1.YAML_parse
                : JSON.parse;
        if (this.file_exists != true)
            (0, util_1.createFile)(this.path, this.stringify, this.style);
        setTimeout(() => {
            this.emit("ready");
            this.emit("debug", `[${new Date().toISOString().substring(11, 19)}][ydb][File ${this.path}] The database has been linked successfully`);
        }, 0);
    }
    /**
     * @description Reads the file and returns the data
     * @example <db>.cache
     * @returns {Collection}
     */
    get cache() {
        let readFileData = (0, fs_1.readFileSync)(this.path);
        return readFileData.length <= 1
            ? new Collection_1.Collection()
            : new Collection_1.Collection(this.style.reading_format(this.parse(readFileData)));
    }
    /**
     * @description Sees the raw data
     * @example <db>.raw
     * @returns {Object}
     */
    get raw() {
        let readFileData = (0, fs_1.readFileSync)(this.path);
        return this.parse(readFileData);
    }
    /**
     * @description Writes the data to the file
     * @example <db>.writeFileSync()
     * @param {*} data
     * @returns {Promise<void>}
     */
    writeFileSync(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, fs_1.writeFileSync)(this.path, this.stringify(this.style.writing_format(collection.map)));
        });
    }
    /**
     * @description Sets element in database
     * @example <db>.set({version: "1.0.0"})
     * @param {*} key Types a key for the element
     * @param {*} value Types a value for the element
     * @returns {Promise<ElementInData>}
     */
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.value)
                value = key.value;
            if (key.key)
                key = key.key;
            if ((!value && value != 0) || (!key && key != 0))
                throw Error((0, util_1.formatErrorMessage)("No key or value found", "Database", "Method", "set"));
            let collection = yield this.cache;
            this.emit(collection.has(key) ? "elementEdit" : "elementAdd", new ElementInData_1.ElementInData(key, this), value, collection.has(key) ? collection.get(key) : null);
            this.emit("debug", `[${new Date().toISOString().substring(11, 19)}][ydb][File ${this.path}] An item was registered with name of ${JSON.stringify(key)} and value of ${JSON.stringify(value)}`);
            yield collection.set(key, this.encryption == true ? this.encryptString(value) : value);
            yield this.writeFileSync(collection);
            return new ElementInData_1.ElementInData(key, this);
        });
    }
    /**
     * @description Deletes an element from database
     * @example <db>.delete({key:`version`})
     * @param {*} key Types a key for the element
     * @returns {Promise<boolean>}
     */
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.delete(key);
        });
    }
    /**
     * @description Deletes an element from database
     * @example <db>.delete({key:`version`})
     * @param {*} key Types a key for the element
     * @returns Promise<boolean>
     */
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.key)
                key = key.key;
            if (!key && key != 0)
                throw Error((0, util_1.formatErrorMessage)("No key found", "Database", "Method", "delete"));
            let data_collection = this.cache;
            if (data_collection.has(key) == false)
                return false;
            data_collection.delete(key);
            yield this.writeFileSync(data_collection);
            this.emit("debug", `[${new Date().toISOString().substring(11, 19)}][ydb][File ${this.path}] An item has been deleted with name ${JSON.stringify(key)}`);
            return true;
        });
    }
    /**
     * @description Returns all elements in the Database
     * @example <db>.all()
     * @param {*} limit default = 0
     * @returns {ElementInData[]}
     */
    all(limit = 0) {
        let arr = [];
        this.cache.map.forEach((data, ID, map) => {
            arr.push(new ElementInData_1.ElementInData(ID, this));
        });
        this.emit("debug", `[${new Date().toISOString().substring(11, 19)}][ydb][File ${this.path}] All items have been read`);
        return limit > 0 ? arr.splice(0, limit) : arr;
    }
    /**
     * @description Returns all elements in the Database
     * @example <db>.fetchAll()
     * @param {*} limit default = 0
     * @returns {ElementInData[]}
     */
    fetchAll(limit = 0) {
        return this.all(limit);
    }
    /**
     * @description Get all the elements in the database of value
     * @param {*} value
     * @example <db>.getByValue({value:`v6`})
     */
    getByValue(value) {
        if (value.value)
            value = value.value;
        if (!value && value != 0)
            throw Error((0, util_1.formatErrorMessage)("No key found", "Database", "Method", "get"));
        let result = this.filter((element) => JSON.stringify(element.data) === JSON.stringify(value));
        return result[0] ? result : false;
    }
    /**
     * @description Get the value of a key
     * @example <db>.get({key:`version`})
     * @param {*} key Type a key for the element
     * @returns Boolean
     */
    get(key, value) {
        if (key.value)
            value = key.value;
        if (key.key)
            key = key.key;
        if (!key && key != 0)
            throw Error((0, util_1.formatErrorMessage)("No key found", "Database", "Method", "get"));
        let data_collection = this.cache;
        if (value && !data_collection.has(key))
            return this.getByValue(value);
        if (!data_collection.has(key))
            return;
        this.emit("debug", `[${new Date().toISOString().substring(11, 19)}][ydb][File ${this.path}] Item read with name of ${JSON.stringify(key)}`);
        return this.autoDecrypt
            ? this.decryptString(data_collection.get(key))
            : data_collection.get(key);
    }
    /**
     * @description To fetch the value of a specific key element
     * @example <db>.fetch({key:`version`})
     * @param {*} key Type a key for the element
     * @returns {"boolean"}
     */
    fetch(key) {
        return this.get(key);
    }
    /**
     * @description Returns the number of items in the database
     */
    get length() {
        return this.cache.size;
    }
    /**
     * @description To get the file size
     * @example <db>.fileSize
     * @returns {"object"}
     */
    get fileSize() {
        let stats = (0, fs_1.statSync)(`${this.path}`);
        return {
            byte: stats.size,
            megaBytes: stats.size / (1024 * 1024),
            kiloBytes: stats.size / 1024,
        };
    }
    /**
     * @description Removes the first element of the array
     * @example <db>.shift({key:`hello`})
     * @param key
     * @returns {Promise<ElementInData>}
     */
    shift(key) {
        if (key.key)
            key = key.key;
        if (!key && key != 0)
            throw Error((0, util_1.formatErrorMessage)("No key found", "Database", "Method", "shift"));
        if (this.has(key) == false)
            return this.set(key, []);
        else {
            let value = this.get(key);
            if (Array.isArray(value)) {
                value.shift();
                return this.set(key, value);
            }
            else
                return this.set(key, []);
        }
    }
    /**
     * @description
     * @example <db>.pop({key:`hello`})
     * @param key
     * @returns {"any"}
     */
    pop(key) {
        if (key.key)
            key = key.key;
        if (!key && key != 0)
            throw Error((0, util_1.formatErrorMessage)("No key found", "Database", "Method", "shift"));
        if (this.has(key) == false)
            return this.set(key, []);
        else {
            let value = this.get(key);
            if (Array.isArray(value)) {
                value.pop();
                return this.set(key, value);
            }
            else
                return this.set(key, []);
        }
    }
    /**
     * @description To pull an element from an array into data
     * @example <db>.pull({key:`version`,value:"v6"})
     * @param {*} key Type a key for the element
     * @returns {Promise<ElementInData>}
     */
    pull(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.value)
                value = key.value;
            if (key.key)
                key = key.key;
            if ((!value && value != 0) || (!key && key != 0))
                throw Error((0, util_1.formatErrorMessage)("No key or value found", "Database", "Method", "pull"));
            if (this.has({ key }) == false)
                throw Error((0, util_1.formatErrorMessage)("There is no data to execute on it", "Database", "Method", "pull"));
            return this.set(key, this.get({ key }).filter((v) => v !== value));
        });
    }
    /**
     * @description To push an element to an array into data
     * @example <db>.push({key:`version`,value:"v6"})
     * @param {*} key Type a key for the element
     * @returns {Promise<void>}
     */
    push(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.value)
                value = key.value;
            if (key.key)
                key = key.key;
            if ((!value && value != 0) || (!key && key != 0))
                throw Error((0, util_1.formatErrorMessage)("No key or value found", "Database", "Method", "push"));
            let collection = this.cache;
            let new_values = collection.has(key) && Array.isArray(collection.get(key))
                ? collection.get(key)
                : [];
            if (Array.isArray(value))
                value.forEach((v) => new_values.push(v));
            else
                new_values.push(value);
            yield collection.set(key, new_values);
            this.writeFileSync(collection);
        });
    }
    /**
     * @description To unshift an element to an array into data
     * @example <db>.unshift({key:`version`,value:["v6"]})
     * @param {*} key Type a key for the element
     * @returns {"boolean"}
     */
    unshift(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.value)
                value = key.value;
            if (key.key)
                key = key.key;
            if ((!value && value != 0) || (!key && key != 0))
                throw Error((0, util_1.formatErrorMessage)("No key or value found", "Database", "Method", "push"));
            let collection = this.cache;
            if (collection.has(key)) {
                let old_values = collection.get(key);
                let new_values = Array.isArray(old_values) ? old_values : [];
                new_values.unshift(value);
                yield collection.set(key, new_values);
                this.writeFileSync(collection);
            }
            else {
                yield collection.set(key, [value]);
                this.writeFileSync(collection);
            }
        });
    }
    /**
     * @description To get the value type of a given key element
     * @example <db>.type({key:`ydb`})
     * @param {*} key Type a key for the element
     * @returns {"symbol" | "array" | "undefined" | "string" | "number" | "bigint" | "boolean" | "object"}
     */
    type(key) {
        if (key.key)
            key = key.key;
        if (!key && key != 0)
            throw Error((0, util_1.formatErrorMessage)("No key found", "Database", "Method", "type"));
        return Array.isArray(this.get(key)) || this.get(key) instanceof Array
            ? "array"
            : typeof this.get(key);
    }
    /**
     * @description Checking an item from the database if it exists or not
     * @example <db>.has({key:`version`})
     * @param {*} key Type a key for the element
     * @returns {"boolean"}
     */
    has(key) {
        if (key.key)
            key = key.key;
        if (!key && key != 0)
            throw Error((0, util_1.formatErrorMessage)("No key found", "Database", "Method", "has"));
        let data_collection = this.cache;
        return data_collection.has(key);
    }
    /**
     * @param {*} value
     * @returns {"string"}
     */
    encryptString(value) {
        return this.crypto.encryptString(JSON.stringify(value), this.encryptionPassword);
    }
    /**
     * @description Returns database connection uptime!
     * @return {"number"}
     * @example console.log(`Database is up for ${db.uptime} ms.`);
     */
    get uptime() {
        if (!this.readyInDate)
            return 0;
        else
            return Date.now() - this.readyInDate.getTime();
    }
    /**
     * @example <db>.valuesAll()
     * @returns {"any[]"}
     */
    valuesAll() {
        return this.all().map((element) => element.data);
    }
    /**
     * @example <db>.keysAll()
     * @returns {"any[]"}
     */
    keysAll() {
        return this.all().map((element) => element.ID);
    }
    /**
     * @param {*} value
     * @returns {"number","string"}
     */
    decryptString(value) {
        try {
            const resolve = JSON.parse(this.crypto.decryptString(value, this.encryptionPassword));
            return Database.isNumeric(resolve) == true ? +resolve : resolve;
        }
        catch (_a) {
            return value;
        }
    }
    /**
     * @param {*} value
     * @returns {"boolean"}
     */
    isEncryptString(value) {
        return this.crypto.isEncryptString(value, this.encryptionPassword);
    }
    /**
     * @description Reload the database
     * @example <db>.reload(200)
     * @param {*} timeout Data relord working period
     * @returns {Promise<void>}
     */
    reload(timeout = 200) {
        return __awaiter(this, void 0, void 0, function* () {
            let collection_data = this.cache;
            yield this.clear();
            setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield this.writeFileSync(collection_data); }), timeout);
        });
    }
    /**
     * @description Clean all data
     * @example <db>.clear()
     * @returns {Promise<void>}
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.writeFileSync(new Collection_1.Collection());
            this.emit("debug", `[${new Date().toISOString().substring(11, 19)}][ydb][File ${this.path}] All items have been deleted`);
            return;
        });
    }
    /**
     * @description Delete all data
     * @example <db>.deleteAll()
     * @returns {Promise<void>}
     */
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clear();
        });
    }
    /**
     * @description Destroy the database
     * @example  <db>.destroy()
     * @returns {Promise<void>}
     */
    destroy() {
        this.emit("debug", `[${new Date().toISOString().substring(11, 19)}][ydb][File ${this.path}] The Database file has been destroyed`);
        try {
            (0, fs_1.unlinkSync)(`${this.path}`);
        }
        catch (err) {
            throw Error((0, util_1.formatErrorMessage)("The data has been destroyed before!", "Database", "Method", "destroy"));
        }
    }
    /**
     * @description Check if the key starts with the key in the database
     * @example <db>.startsWith({key:`ydb`})
     * @param {*} key
     * @returns {Promise<{ ID: any, typeof: { ID: string, data: string }, data: any }[]>}
     */
    startsWith(key) {
        return key.key
            ? this.filter((element) => element.ID.startsWith(key.key))
            : this.filter((element) => element.ID.startsWith(key));
    }
    /**
     * @description Check if the key ends with the key in the database
     * @example <db>.endsWith({key:`ydb`})
     * @param {*} key
     * @returns {Promise<{ ID: any, typeof: { ID: string, data: string }, data: any }[]>}
     */
    endsWith(key) {
        return key.key
            ? this.filter((element) => element.ID.endsWith(key.key))
            : this.filter((element) => element.ID.endsWith(key));
    }
    /**
     * @description Filter the database by the key
     * @example <db>.filter(t => t == "test")
     * @param {*} argument
     * @param {*} callback
     * @returns {Promise<{ ID: any, typeof: { ID: string, data: string }, data: any }[]>}
     */
    filter(callback, argument) {
        if (argument)
            callback = callback.bind(argument);
        return this.all().filter(callback);
    }
    /**
     * @description Check if the key includes with the key in the database
     * @example <db>.includes({key:`ydb`})
     * @param {*} key
     * @returns {Promise<any[]>}
     */
    includes(key) {
        return key.key
            ? this.filter((element) => element.ID.includes(key.key))
            : this.filter((element) => element.ID.includes(key));
    }
    /**
     * @description Does a math calculation and stores the value in the database!
     * @param {string} key Data key
     * @param {string} operator One of +, -, %, * or /
     * @param {number} value The value, must be a number
     * @param {boolen} goToNegative Move to negative
     * @example db.math({key:"points",operator:"+",value:150})
     * @return {Promise<void>}
     */
    math(key, operator, new_value, goToNegative) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key && key != 0)
                throw Error((0, util_1.formatErrorMessage)("No key found", "Database", "Method", "math"));
            if (key.goToNegative)
                goToNegative = key.goToNegative;
            if (key.operator)
                operator = key.operator;
            if (key.value)
                new_value = key.value;
            if (key.key)
                key = key.key;
            if ((!new_value && new_value != 0) || (!key && key != 0) || !operator)
                throw Error((0, util_1.formatErrorMessage)("No key or value or operator found", "Database", "Method", "math"));
            let old_value = this.has({ key }) == true ? this.get({ key }) : 0;
            let data = this.cache;
            data.math(key, operator, new_value, goToNegative);
            yield this.writeFileSync(data);
        });
    }
    /**
     * @example <db>.add({key:`data`,value:2)
     * @param {string} key Data key
     * @param {number} value The value, must be a number
     * @returns {Promise<void>}
     */
    add(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.value)
                value = key.value;
            if (key.key)
                key = key.key;
            if ((!value && value != 0) || (!key && key != 0))
                throw Error((0, util_1.formatErrorMessage)("No key or value found", "Database", "Method", "add"));
            yield this.math(key, "+", value);
        });
    }
    /**
     * @example <db>.multiply({key:"coins", value:2})
     * @param {string} key Data key
     * @param {number} value The value, must be a number
     * @returns {Promise<void>}
     */
    multiply(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.value)
                value = key.value;
            if (key.key)
                key = key.key;
            if ((!value && value != 0) || (!key && key != 0))
                throw Error((0, util_1.formatErrorMessage)("No key or value found", "Database", "Method", "multiply"));
            return yield this.math(key, "*", value);
        });
    }
    /**
     * @description Action is a class that is a dummy database where you can implement your methods without affecting the main database itself and save it for later whenever you want!
     * @example <db>.action()
     */
    action() {
        return new Action_1.Action(this);
    }
    /**
     * @example <db>.double({key:"coins"})
     * @param {string} key Data key
     * @param {number} value The value, must be a number
     * @returns {Promise<void>}
     */
    double(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.value)
                value = key.value;
            if (key.key)
                key = key.key;
            if ((!value && value != 0) || (!key && key != 0))
                throw Error((0, util_1.formatErrorMessage)("No key or value found", "Database", "Method", "double"));
            return yield this.math(key, "*", 2);
        });
    }
    /**
     * @example <db>.subtract({key:"coins", value:50})
     * @param {string} key Data key
     * @param {number} value The value, must be a number
     * @returns {Promise<void>}
     */
    subtract(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key.value)
                value = key.value;
            if (key.key)
                key = key.key;
            if ((!value && value != 0) || (!key && key != 0))
                throw Error((0, util_1.formatErrorMessage)("No key or value found", "Database", "Method", "subtract"));
            return yield this.math(key, "-", value);
        });
    }
    /**
     * @description Check if the value is numeric
     * @param {*} val
     * @returns {"boolean"}
     */
    static isNumeric(val) {
        return /^-?\d+$/.test(`${val}`);
    }
}
exports.Database = Database;
Database.Style = {
    Array: {
        writing_format: Array.from,
        reading_format: (a) => {
            return a;
        },
    },
    Object: {
        writing_format: Object.fromEntries,
        reading_format: Object.entries,
    },
};
