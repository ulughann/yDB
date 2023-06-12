import { formatErrorMessage } from "./util";
import { Database } from "./Database";
import { Collection } from "./Collection";

/**
 * @description This is a dummy database to implement methods you want to test.
 */

export class Action extends Collection {
  public capture: Collection;
  constructor(private database: Database, values?: IterableIterator<any>) {
    if (!(database instanceof Database))
      throw Error(
        formatErrorMessage(
          "Database class must be set correctly",
          "Action",
          "Parameter",
          "database"
        )
      );
    super(values ? values : database.cache.entries());
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
  save(database?: Database) {
    if (!(database instanceof Database))
      throw Error(
        formatErrorMessage(
          "Database class must be set correctly",
          "Action",
          "Method",
          "save"
        )
      );
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
