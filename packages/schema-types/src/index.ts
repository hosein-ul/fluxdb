export interface FluxProject {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  teamId?: string;
  createdAt: string;
  updatedAt: string;
  schema: FluxSchema;
}

export interface FluxSchema {
  version: number;
  tables: Table[];
  relations: Relation[];
}

export type TableColor =
  | 'cobalt'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'violet'
  | 'cyan'
  | 'slate';

export interface Table {
  id: string;
  name: string;
  color: TableColor;
  position: { x: number; y: number };
  columns: Column[];
  comment?: string;
}

export type ColumnType =
  | 'uuid'
  | 'serial'
  | 'bigserial'
  | 'text'
  | 'varchar'
  | 'char'
  | 'integer'
  | 'bigint'
  | 'smallint'
  | 'decimal'
  | 'float'
  | 'boolean'
  | 'timestamp'
  | 'timestamptz'
  | 'date'
  | 'time'
  | 'json'
  | 'jsonb'
  | 'enum';

export type ColumnConstraint =
  | 'PRIMARY_KEY'
  | 'UNIQUE'
  | 'NOT_NULL'
  | 'FOREIGN_KEY'
  | 'INDEX';

export interface Column {
  id: string;
  name: string;
  type: ColumnType;
  constraints: ColumnConstraint[];
  defaultValue?: string;
  enumValues?: string[];
  comment?: string;
}

export type RelationType = '1:1' | '1:N' | 'N:M';

export interface Relation {
  id: string;
  fromTableId: string;
  fromColumnId: string;
  toTableId: string;
  toColumnId: string;
  type: RelationType;
  label?: string;
}

export interface SchemaSnapshot {
  id: string;
  projectId: string;
  version: number;
  label?: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  data: FluxSchema;
}

export interface ShareLink {
  id: string;
  projectId: string;
  token: string;
  createdAt: string;
  expiresAt?: string;
}

export interface CollaboratorPresence {
  id: string;
  name: string;
  color: string;
  avatar?: string;
  cursor: { x: number; y: number } | null;
  selectedTableId: string | null;
  lastActive: number;
}
