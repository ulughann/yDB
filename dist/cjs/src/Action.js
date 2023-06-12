"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const util_1 = require("./util");
const Database_1 = require("./Database");
const Collection_1 = require("./Collection");
/**
 * @description This is a dummy database to implement methods you want to test.
 */
class Action extends Collection_1.Collection {
    constructor(database, values) {
        if (!(database instanceof Database_1.Database))
            throw Error((0, util_1.formatErrorMessage)("Database class must be set correctly", "Action", "Parameter", "database"));
        super(values ? values : database.cache.entries());
        this.database = database;
        this.capture = this.database.cache;
    }
    /**
     * @name undo
     * @description Reverts your database to before the dummy was created
     * @returns
     */
    undo() {
        this.map = this.capture.map;
        return this;
    }
    /**
     * @name save
     * @description Saves the cache to the database
     * @returns
     */
    save(database) {
        if (!(database instanceof Database_1.Database))
            throw Error((0, util_1.formatErrorMessage)("Database class must be set correctly", "Action", "Method", "save"));
        let db = database ? database : this.database;
        return db.writeFileSync(this);
    }
    /**
     * @name reload
     * @returns
     */
    reload() {
        this.map = this.database.cache.map;
        return this;
    }
}
exports.Action = Action;
