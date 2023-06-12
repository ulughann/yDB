import { Database } from "./Database";
import { formatErrorMessage } from "./util";
export class ElementInData {
    constructor(key, database) {
        this.database = database;
        if (!(database instanceof Database))
            throw Error(formatErrorMessage("Database class must be set correctly", "ElementInData", "Parameter", "database"));
        this.ID = key;
        this.data = database.has(key) ? database.get(key) : undefined;
        this.typeof = { ID: typeof this.ID, data: typeof this.data };
    }
    /**
     * @name remove
     * @returns {"boolean"}
     */
    remove() {
        return this.database.delete({ key: this.ID });
    }
    /**
     * @name delete
     * @returns {"boolean"}
     */
    delete() {
        return this.database.delete({ key: this.ID });
    }
    /**
     * @name edit
     * @param {key,value} edit key or value
     * @returns {"any"}
     */
    edit(input) {
        if (input.value) {
            this.database.set(this.ID, input.value);
            this.data = input.value;
        }
        if (input.key) {
            this.delete();
            return this.database.set(input.key, this.data);
        }
    }
}
