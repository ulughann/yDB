/// <reference types="node" />
import { Collection } from "./Collection";
import { EventEmitter } from "events";
import { ElementInData } from "./ElementInData";
import { Action } from "./Action";
interface DatabaseOptions {
    debug?: boolean;
    cPath?: boolean;
    autoDecrypt?: boolean;
    encryption?: {
        password: string;
        digest?: string;
    };
    style?: {
        writing_format: (input: any) => any;
        reading_format: (input: any) => any;
    };
    parse?: (input: Map<any, any>) => string;
    stringify?: (input: Map<any, any>) => string;
}
declare class Database extends EventEmitter {
    cPath: boolean;
    options: DatabaseOptions;
    readonly autoDecrypt: boolean;
    readonly fileExtension: string;
    readonly isYML: boolean;
    readonly path: string;
    readonly readyInDate: Date;
    inputPath: string;
    readonly encryption?: boolean;
    private encryptionPassword?;
    style: {
        writing_format: (input: any) => any;
        reading_format: (input: any) => any;
    };
    readonly file_exists: boolean;
    crypto: any;
    stringify: (x: any) => any;
    parse: (x: any) => any;
    constructor(path: string, options?: DatabaseOptions);
    /**
     * @description Reads the file and returns the data
     * @example <db>.cache
     * @returns {Collection}
     */
    get cache(): Collection;
    /**
     * @description Sees the raw data
     * @example <db>.raw
     * @returns {Object}
     */
    get raw(): any;
    /**
     * @description Writes the data to the file
     * @example <db>.writeFileSync()
     * @param {*} data
     * @returns {Promise<void>}
     */
    writeFileSync(collection: Collection): Promise<void>;
    /**
     * @description Sets element in database
     * @example <db>.set({version: "1.0.0"})
     * @param {*} key Types a key for the element
     * @param {*} value Types a value for the element
     * @returns {Promise<ElementInData>}
     */
    set(key: any, value?: any): Promise<ElementInData>;
    /**
     * @description Deletes an element from database
     * @example <db>.delete({key:`version`})
     * @param {*} key Types a key for the element
     * @returns {Promise<boolean>}
     */
    remove(key: any): Promise<boolean>;
    /**
     * @description Deletes an element from database
     * @example <db>.delete({key:`version`})
     * @param {*} key Types a key for the element
     * @returns Promise<boolean>
     */
    delete(key: any): Promise<boolean>;
    /**
     * @description Returns all elements in the Database
     * @example <db>.all()
     * @param {*} limit default = 0
     * @returns {ElementInData[]}
     */
    all(limit?: number): ElementInData[];
    /**
     * @description Returns all elements in the Database
     * @example <db>.fetchAll()
     * @param {*} limit default = 0
     * @returns {ElementInData[]}
     */
    fetchAll(limit?: number): ElementInData[];
    /**
     * @description Get all the elements in the database of value
     * @param {*} value
     * @example <db>.getByValue({value:`v6`})
     */
    getByValue(value: any): {
        ID: any;
        typeof: {
            ID: string;
            data: string;
        };
        data: any;
    }[] | false;
    /**
     * @description Get the value of a key
     * @example <db>.get({key:`version`})
     * @param {*} key Type a key for the element
     * @returns Boolean
     */
    get(key: any, value?: any): any;
    /**
     * @description To fetch the value of a specific key element
     * @example <db>.fetch({key:`version`})
     * @param {*} key Type a key for the element
     * @returns {"boolean"}
     */
    fetch(key: any): any;
    /**
     * @description Returns the number of items in the database
     */
    get length(): () => number;
    /**
     * @description To get the file size
     * @example <db>.fileSize
     * @returns {"object"}
     */
    get fileSize(): {
        byte: number;
        megaBytes: number;
        kiloBytes: number;
    };
    /**
     * @description Removes the first element of the array
     * @example <db>.shift({key:`hello`})
     * @param key
     * @returns {Promise<ElementInData>}
     */
    shift(key: any): Promise<ElementInData>;
    /**
     * @description
     * @example <db>.pop({key:`hello`})
     * @param key
     * @returns {"any"}
     */
    pop(key: any): any;
    /**
     * @description To pull an element from an array into data
     * @example <db>.pull({key:`version`,value:"v6"})
     * @param {*} key Type a key for the element
     * @returns {Promise<ElementInData>}
     */
    pull(key: any, value?: any): Promise<ElementInData>;
    /**
     * @description To push an element to an array into data
     * @example <db>.push({key:`version`,value:"v6"})
     * @param {*} key Type a key for the element
     * @returns {Promise<void>}
     */
    push(key: any, value?: any): Promise<void>;
    /**
     * @description To unshift an element to an array into data
     * @example <db>.unshift({key:`version`,value:["v6"]})
     * @param {*} key Type a key for the element
     * @returns {"boolean"}
     */
    unshift(key: any, value?: any): Promise<void>;
    /**
     * @description To get the value type of a given key element
     * @example <db>.type({key:`ydb`})
     * @param {*} key Type a key for the element
     * @returns {"symbol" | "array" | "undefined" | "string" | "number" | "bigint" | "boolean" | "object"}
     */
    type(key: any): "symbol" | "array" | "undefined" | "string" | "number" | "bigint" | "boolean" | "object" | "function";
    /**
     * @description Checking an item from the database if it exists or not
     * @example <db>.has({key:`version`})
     * @param {*} key Type a key for the element
     * @returns {"boolean"}
     */
    has(key: any): boolean;
    /**
     * @param {*} value
     * @returns {"string"}
     */
    encryptString(value: any): string;
    /**
     * @description Returns database connection uptime!
     * @return {"number"}
     * @example console.log(`Database is up for ${db.uptime} ms.`);
     */
    get uptime(): number;
    /**
     * @example <db>.valuesAll()
     * @returns {"any[]"}
     */
    valuesAll(): any[];
    /**
     * @example <db>.keysAll()
     * @returns {"any[]"}
     */
    keysAll(): any[];
    /**
     * @param {*} value
     * @returns {"number","string"}
     */
    decryptString(value: any): string | number;
    /**
     * @param {*} value
     * @returns {"boolean"}
     */
    isEncryptString(value: any): boolean;
    /**
     * @description Reload the database
     * @example <db>.reload(200)
     * @param {*} timeout Data relord working period
     * @returns {Promise<void>}
     */
    reload(timeout?: number): Promise<void>;
    /**
     * @description Clean all data
     * @example <db>.clear()
     * @returns {Promise<void>}
     */
    clear(): Promise<void>;
    /**
     * @description Delete all data
     * @example <db>.deleteAll()
     * @returns {Promise<void>}
     */
    deleteAll(): Promise<void>;
    /**
     * @description Destroy the database
     * @example  <db>.destroy()
     * @returns {Promise<void>}
     */
    destroy(): void;
    /**
     * @description Check if the key starts with the key in the database
     * @example <db>.startsWith({key:`ydb`})
     * @param {*} key
     * @returns {Promise<{ ID: any, typeof: { ID: string, data: string }, data: any }[]>}
     */
    startsWith(key: any): {
        ID: any;
        typeof: {
            ID: string;
            data: string;
        };
        data: any;
    }[];
    /**
     * @description Check if the key ends with the key in the database
     * @example <db>.endsWith({key:`ydb`})
     * @param {*} key
     * @returns {Promise<{ ID: any, typeof: { ID: string, data: string }, data: any }[]>}
     */
    endsWith(key: any): {
        ID: any;
        typeof: {
            ID: string;
            data: string;
        };
        data: any;
    }[];
    /**
     * @description Filter the database by the key
     * @example <db>.filter(t => t == "test")
     * @param {*} argument
     * @param {*} callback
     * @returns {Promise<{ ID: any, typeof: { ID: string, data: string }, data: any }[]>}
     */
    filter(callback: any, argument?: any): {
        ID: any;
        typeof: {
            ID: string;
            data: string;
        };
        data: any;
    }[];
    /**
     * @description Check if the key includes with the key in the database
     * @example <db>.includes({key:`ydb`})
     * @param {*} key
     * @returns {Promise<any[]>}
     */
    includes(key: any): {
        ID: any;
        typeof: {
            ID: string;
            data: string;
        };
        data: any;
    }[];
    /**
     * @description Does a math calculation and stores the value in the database!
     * @param {string} key Data key
     * @param {string} operator One of +, -, %, * or /
     * @param {number} value The value, must be a number
     * @param {boolen} goToNegative Move to negative
     * @example db.math({key:"points",operator:"+",value:150})
     * @return {Promise<void>}
     */
    math(key: {
        key: any;
        value: any;
        goToNegative?: boolean;
        operator: "-" | "+" | "*" | "/";
    } | any, operator?: "-" | "+" | "*" | "/", new_value?: string | number, goToNegative?: boolean): Promise<void>;
    /**
     * @example <db>.add({key:`data`,value:2)
     * @param {string} key Data key
     * @param {number} value The value, must be a number
     * @returns {Promise<void>}
     */
    add(key: {
        key: any;
        value: any;
    } | any, value?: any): Promise<void>;
    /**
     * @example <db>.multiply({key:"coins", value:2})
     * @param {string} key Data key
     * @param {number} value The value, must be a number
     * @returns {Promise<void>}
     */
    multiply(key: {
        key: any;
        value: any;
    } | any, value?: any): Promise<void>;
    /**
     * @description Action is a class that is a dummy database where you can implement your methods without affecting the main database itself and save it for later whenever you want!
     * @example <db>.action()
     */
    action(): Action;
    /**
     * @example <db>.double({key:"coins"})
     * @param {string} key Data key
     * @param {number} value The value, must be a number
     * @returns {Promise<void>}
     */
    double(key: {
        key: any;
        value: any;
    } | any, value?: any): Promise<void>;
    /**
     * @example <db>.subtract({key:"coins", value:50})
     * @param {string} key Data key
     * @param {number} value The value, must be a number
     * @returns {Promise<void>}
     */
    subtract(key: {
        key: any;
        value: any;
    } | any, value?: any): Promise<void>;
    /**
     * @description Check if the value is numeric
     * @param {*} val
     * @returns {"boolean"}
     */
    static isNumeric(val: string | number): boolean;
    static Style: {
        Array: {
            writing_format: {
                <T>(arrayLike: ArrayLike<T>): T[];
                <T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
                <T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
                <T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            };
            reading_format: (a: any) => any;
        };
        Object: {
            writing_format: {
                <T_4 = any>(entries: Iterable<readonly [PropertyKey, T_4]>): {
                    [k: string]: T_4;
                };
                (entries: Iterable<readonly any[]>): any;
            };
            reading_format: {
                <T_5>(o: {
                    [s: string]: T_5;
                } | ArrayLike<T_5>): [string, T_5][];
                (o: {}): [string, any][];
            };
        };
    };
}
/**
 * @event Database#ready
 * @example db.on("ready", () => {
 *     console.log("Successfully connected to the database!");
 * });
 */
/**
 * @event Database#elementEdit
 * @param {ElementInData} elementInData  elementInData
 * @example db.on("elementEdit", console.log);
 */
/**
 * Emitted for general warnings.
 * @event Database#elementAdd
 * @param {ElementInData} elementInData elementInData
 */
export { Collection, Database, ElementInData, Action };
