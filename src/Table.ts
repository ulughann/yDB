import { Database } from "./Database";
import { formatErrorMessage } from "./util";
import { writeFileSync, readFileSync, statSync, unlinkSync } from "fs";
import { Collection } from "./Collection";

export class Table extends Database {
  public ID:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object";
  private typeof: {
    ID:
      | "string"
      | "number"
      | "bigint"
      | "boolean"
      | "symbol"
      | "undefined"
      | "object"
      | "function";
    data:
      | "symbol"
      | "array"
      | "undefined"
      | "string"
      | "number"
      | "bigint"
      | "boolean"
      | "object"
      | "function";
  };

  constructor(key: any, private database: Database) {
    if (!(database instanceof Database))
      throw Error(
        formatErrorMessage(
          "Database class must be set correctly",
          "DataFromElement",
          "Parameter",
          "database"
        )
      );
    super(database.inputPath, database.options);
    this.ID = key;
    this.typeof = {
      ID: typeof this.ID,
      data: this.database.has(this.ID) ? this.database.type(this.ID) : "object",
    };
    if (this.typeof.data != "object" && this.typeof.data != "array")
      throw Error(
        formatErrorMessage(
          "The value of the element must be object",
          "DataFromElement",
          "Parameter",
          "key"
        )
      );
  }
  /**
   * @description to get the value of the element
   */
  get cache() {
    let readFileData =
      this.database.get(this.ID) || this.database.style.writing_format([]);
    return readFileData.length <= 1
      ? new Collection()
      : new Collection(this.database.style.reading_format(readFileData));
  }
  /**
   * @description Write the data in the file
   * @example <db>.writeFileSync()
   * @param {*} data
   * @returns {Promise<void>}
   */
  async writeFileSync(collection: Collection): Promise<void> {
    await this.database.set(
      this.ID,
      this.database.style.writing_format(collection.map)
    );
  }
}
