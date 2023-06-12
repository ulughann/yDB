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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const Database_1 = require("./Database");
const util_1 = require("./util");
const Collection_1 = require("./Collection");
class Table extends Database_1.Database {
    constructor(key, database) {
        if (!(database instanceof Database_1.Database))
            throw Error((0, util_1.formatErrorMessage)("Database class must be set correctly", "DataFromElement", "Parameter", "database"));
        super(database.inputPath, database.options);
        this.database = database;
        this.ID = key;
        this.typeof = {
            ID: typeof this.ID,
            data: this.database.has(this.ID) ? this.database.type(this.ID) : "object",
        };
        if (this.typeof.data != "object" && this.typeof.data != "array")
            throw Error((0, util_1.formatErrorMessage)("The value of the element must be object", "DataFromElement", "Parameter", "key"));
    }
    /**
     * @description to get the value of the element
     */
    get cache() {
        let readFileData = this.database.get(this.ID) || this.database.style.writing_format([]);
        return readFileData.length <= 1
            ? new Collection_1.Collection()
            : new Collection_1.Collection(this.database.style.reading_format(readFileData));
    }
    /**
     * @description Write the data in the file
     * @example <db>.writeFileSync()
     * @param {*} data
     * @returns {Promise<void>}
     */
    writeFileSync(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.set(this.ID, this.database.style.writing_format(collection.map));
        });
    }
}
exports.Table = Table;
