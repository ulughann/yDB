import { Database } from "./Database";
import { Collection } from "./Collection";
/**
 * @description This is a dummy database to implement methods you want to test.
 */
export declare class Action extends Collection {
    private database;
    capture: Collection;
    constructor(database: Database, values?: IterableIterator<any>);
    /**
     * @name undo
     * @description Reverts your database to before the dummy was created
     * @returns
     */
    undo(): this;
    /**
     * @name save
     * @description Saves the cache to the database
     * @returns
     */
    save(database?: Database): Promise<void>;
    /**
     * @name reload
     * @returns
     */
    reload(): this;
}
