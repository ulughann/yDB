import { Database } from "./Database";
export declare class ElementInData {
    private database;
    ID: any;
    data: any;
    readonly typeof: {
        ID: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
        data: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    };
    constructor(key: any, database: Database);
    /**
     * @name remove
     * @returns {"boolean"}
     */
    remove(): Promise<boolean>;
    /**
     * @name delete
     * @returns {"boolean"}
     */
    delete(): Promise<boolean>;
    /**
     * @name edit
     * @param {key,value} edit key or value
     * @returns {"any"}
     */
    edit(input: {
        value?: any;
        key?: any;
    }): any;
}
