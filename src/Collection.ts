import { formatErrorMessage } from "./util";
export class Collection {

  map: Map<any, any>;
  constructor(values?: IterableIterator<any>) {
    this.map = new Map(values ? values : []);
  }
  /**
   * @description Returns the size of the collection
   * @returns {"number"}
   */
  size(): number {
    return this.map.size;
  }
  /**
   * @description Returns all values
   * @returns {IterableIterator<any>}
   */
  values(): IterableIterator<any> {
    return this.map.values();
  }
  /**
   * @description Returns all entries
   * @returns {IterableIterator<any>}
   */
  entries(): IterableIterator<any> {
    return this.map.entries();
  }
  /**
   * @description Get all keys
   * @returns {IterableIterator<any>}
   */
  keys(): IterableIterator<any> {
    return this.map.keys();
  }
  /**
   * @description Makes clear elements of the map
   * @returns {IterableIterator<any>}
   */
  clear(): void {
    return this.map.clear();
  }
  /**
   * @description Adds an element with an arithmetic operation to the map
   * @returns {void}
   */
  math(
    key: string,
    operator: "-" | "+" | "*" | "/",
    value: string | number,
    goToNegative: boolean = false
  ): void {
    if (!/^-?\d+$/.test(`${value}`))
      throw Error(
        formatErrorMessage("Invlid Type Value", "Collection", "Method", "math")
      );
    if (!`${operator}`.match(/(\-|\+|\/|\*)/g))
      throw Error(
        formatErrorMessage(
          "Invlid Type Operator",
          "Collection",
          "Method",
          "math"
        )
      );
    if (typeof goToNegative != "boolean")
      throw Error(
        formatErrorMessage(
          "Invlid Type goToNegative",
          "Collection",
          "Method",
          "math"
        )
      );
    if (!this.has(key)) {
      this.set(key, value);
    } else {
      this.set(key, eval(`${this.get(key)}${operator}${value}`));
    }
  }
  /**
   * @returns {any[]}
   */
  toArray(): any[] {
    return Array.from(this.map);
  }
  /**
   * @returns {any[]}
   */
  toObject(): any[] {
    return Object.fromEntries(this.map);
  }
  /**
   * @returns {any[]}
   */
  isEmpty(): boolean {
    return this.map.size == 0 ? true : false;
  }
  /**
   * @returns number
   */
  findIndex(key: any): number {
    return this.toArray().findIndex((o) => o[0] == key) < 0
      ? 0
      : this.toArray().findIndex((o) => o[0] == key);
  }
  /**
   * @returns {any}
   */
  findByIndex(index: number): any {
    return this.toArray()[index];
  }
  /**
   * @returns {any}
   */
  findByValue(value: any): any {
    return this.toArray().find((v) => v[1] == value);
  }
  /**
   * @returns {Map<any, any>}
   */
  reverse(): Map<any, any> {
    this.map = new Map([...this.map].reverse());
    return this.map;
  }
  /**
   * @returns {"string"}
   */
  toJSON(): string {
    return JSON.stringify(this.toArray());
  }
  /**
   * @returns {"void"}
   */
  deleteEach(...keys: any): void {
    if (Array.isArray(keys[0])) {
      keys[0].forEach((key: any) => {
        this.delete(key);
      });
    } else {
      keys.forEach((key: any) => {
        this.delete(key);
      });
    }
  }
  /**
   * @returns {"void"}
   */
  delete(key: any): void {
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
    } else {
      this.map.delete(key);
    }
  }
  /**
   * @returns {"any"}
   */
  set(key: any, value: any): any {
    if (key instanceof Object) {
      if (this.has(key) == true) {
        this.delete(key);
        this.map.set(key, value);
      } else {
        this.map.set(key, value);
      }
    } else {
      this.map.set(key, value);
    }
  }
  /**
   * @returns {"any"}
   */
  get(key: any): any {
    if (key instanceof Object) {
      let res: any;
      let count = 0;
      this.map.forEach((item_value, item) => {
        count++;
        if (JSON.stringify(key) == JSON.stringify(item)) res = item_value;
        if (count == this.map.size) {
          return res;
        }
      });
      return res;
    } else {
      return this.map.get(key);
    }
  }
  /**
   * @returns {"boolean"}
   */
  has(key: any): boolean {
    if (key instanceof Object) {
      let res = false;
      let count = 0;
      this.map.forEach((item_value, item) => {
        count++;
        if (JSON.stringify(key) == JSON.stringify(item)) res = true;
        if (count == this.map.size) {
          return res;
        }
      });
      return res;
    } else {
      return this.map.has(key);
    }
  }
}
