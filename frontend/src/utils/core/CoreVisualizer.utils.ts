import type { Field, Model, Relation, Schema } from "../../types/CoreModelType";

export interface DisplayField {
  name: string;
  type: string; // e.g. "UUID", "String(255)", "Enum(Role)"
  isPrimary: boolean;
  isForeignKey: boolean;
  isUnique: boolean;
  isNullable: boolean;
  description?: string;
}

// What one table node needs to render
export interface TableNode extends Record<string, unknown> {
  modelName: string;
  tableName: string; // actual DB table name
  fields: DisplayField[];
}

// What one edge (arrow between tables) needs to render
export interface TableEdge {
  id: string;
  fromModel: string;
  fromField: string;
  toModel: string;
  toField: string;
  relationType: string;
  onDelete: string;
  isOptional: boolean;
}

function formatFieldType(field: Field): string {
  if (field.type === "Enum" && field.enumName) return `Enum(${field.enumName})`;
  if ((field.type === "String" || field.type === "Char") && field.length)
    return `${field.type}(${field.length})`;
  if (field.type === "Decimal" && field.precision != null) {
    const scale = field.scale != null ? `,${field.scale}` : "";
    return `Decimal(${field.precision}${scale})`;
  }
  if (field.isArray) return `${field.type}[]`;
  return field.type;
}

export const extractData = (
  schema: Schema,
): {
  nodes: TableNode[];
  edges: TableEdge[];
} => {
  const nodes = schema.models.map((model: Model) => ({
    modelName: model.name,
    tableName: model.tableName ?? model.name.toLowerCase(),
    fields: model.fields.map((f) => ({
      name: f.name,
      type: formatFieldType(f),
      isPrimary: f.isPrimary ?? false,
      isForeignKey: f.isForeignKey ?? false,
      isUnique: f.isUnique ?? false,
      isNullable: f.isNullable ?? true,
      description: f.description,
    })),
  }));

  const edges: TableEdge[] = schema.relations.map((rel: Relation) => ({
    id: `${rel.fromModel}-${rel.fromField}->${rel.toModel}-${rel.toField}`,
    fromModel: rel.fromModel,
    fromField: rel.fromField,
    toModel: rel.toModel,
    toField: rel.toField,
    relationType: rel.type,
    onDelete: rel.onDelete,
    isOptional: rel.isOptional,
  }));

  console.log(nodes);

  return { nodes, edges };
};
