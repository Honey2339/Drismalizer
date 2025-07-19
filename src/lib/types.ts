export interface TableDefinition {
  tableName: string;
  variableName: string;
  columns: ColumnDefinition[];
}

export interface ColumnDefinition {
  name: string;
  type: string;
  config: string[];
}

export interface GithubStars {
  stargazers_count: number;
}
