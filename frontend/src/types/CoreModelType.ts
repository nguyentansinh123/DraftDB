// ============================================================
// PRIMITIVES
// ============================================================

export type FieldType =
  // Numeric
  | "Int"
  | "SmallInt"
  | "BigInt"
  | "Float"
  | "Double"
  | "Decimal"
  // String
  | "String" // VARCHAR — use `length` to set size
  | "Text" // unlimited length text
  | "Char" // fixed-length — use `length`
  | "UUID"
  // Boolean
  | "Boolean"
  // Date / Time
  | "Date"
  | "Time"
  | "DateTime"
  | "Timestamp"
  // Binary
  | "Bytes"
  // Structured
  | "Json"
  | "JsonB" // PostgreSQL only
  // Special
  | "Enum"; // set `enumName` to point to a DbEnum

export type RelationType =
  | "one-to-one"
  | "one-to-many"
  | "many-to-one"
  | "many-to-many";

export type CascadeAction =
  | "CASCADE"
  | "SET_NULL"
  | "SET_DEFAULT"
  | "RESTRICT"
  | "NO_ACTION";

export type IndexType = "BTREE" | "HASH" | "GIN" | "GIST";

export type DatabaseType =
  | "postgresql"
  | "mysql"
  | "sqlite"
  | "mssql"
  | "mongodb";

// Default value is either a raw literal or a DB-level function call
export type DefaultValue =
  | { kind: "literal"; value: string | number | boolean }
  | { kind: "function"; fn: "now()" | "uuid()" | "cuid()" | "autoincrement()" }
  | { kind: "null" };

// ============================================================
// FIELD
// ============================================================

export interface Field {
  name: string;
  type: FieldType;

  // --- Constraints ---
  isPrimary?: boolean;
  isNullable?: boolean; // false = NOT NULL, defaults to true when absent
  isUnique?: boolean;
  isAutoIncrement?: boolean;

  // --- Default ---
  default?: DefaultValue;

  // --- Type-specific sizing ---
  length?: number; // VARCHAR(255), CHAR(10)
  precision?: number; // DECIMAL(precision, scale)
  scale?: number;

  // --- PostgreSQL arrays ---
  isArray?: boolean; // e.g. Int[] or String[]

  // --- Enum reference ---
  enumName?: string; // required when type === "Enum"

  // --- Foreign key ---
  isForeignKey?: boolean;
  references?: {
    model: string;
    field: string;
  };

  // --- Documentation ---
  description?: string; // shown as tooltip in the UI
}

// ============================================================
// INDEX
// ============================================================

export interface Index {
  name?: string;
  fields: string[]; // one or more field names
  isUnique: boolean;
  type?: IndexType;
}

// ============================================================
// MODEL
// ============================================================

export interface Model {
  name: string;
  tableName?: string; // if DB table name differs from model name

  fields: Field[];
  indexes: Index[];

  // Composite primary key spanning multiple fields
  compositePrimaryKey?: string[];

  // Composite unique constraints e.g. [["firstName", "lastName"]]
  uniqueConstraints?: string[][];

  description?: string;
}

// ============================================================
// RELATION
// ============================================================

export interface Relation {
  name: string; // e.g. "posts", "author"

  fromModel: string;
  fromField: string; // the FK field on fromModel

  toModel: string;
  toField: string; // the referenced field on toModel (usually "id")

  type: RelationType;

  onDelete: CascadeAction;
  onUpdate: CascadeAction;

  isOptional: boolean; // true = nullable FK, relation is optional

  // Only for many-to-many: the junction/pivot table
  junction?: {
    tableName: string;
    fromForeignKey: string; // FK column pointing to fromModel
    toForeignKey: string; // FK column pointing to toModel
  };
}

// ============================================================
// ENUM
// ============================================================

export interface DbEnum {
  name: string;
  values: string[]; // e.g. ["ADMIN", "USER", "GUEST"]
  description?: string;
}

// ============================================================
// SCHEMA  (root — the whole project)
// ============================================================

export interface Schema {
  name: string;
  databaseType: DatabaseType;

  models: Model[];
  relations: Relation[];
  enums: DbEnum[];

  version?: string; // for tracking migrations
  description?: string;
}
