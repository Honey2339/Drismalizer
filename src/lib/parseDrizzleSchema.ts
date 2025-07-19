import {
  CallExpression,
  ObjectLiteralExpression,
  Project,
  SyntaxKind,
} from "ts-morph";
import { ColumnDefinition, TableDefinition } from "./types";

export function parseDrizzleSchema(code: string): TableDefinition[] {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      allowJs: true,
    },
  });

  const sourceFile = project.createSourceFile("schema.ts", code);

  const tables: TableDefinition[] = [];

  sourceFile.getVariableStatements().forEach((stmt) => {
    stmt.getDeclarations().forEach((declaration) => {
      const initializer = declaration.getInitializer();

      if (
        !initializer ||
        !initializer.compilerNode ||
        initializer.getKind() !== SyntaxKind.CallExpression
      )
        return;

      const callExp = initializer as CallExpression;
      const exprText = callExp.getExpression().getText();

      if (exprText !== "pgTable") return;

      const args = callExp.getArguments();

      if (args.length < 2) return;

      const tableNameArg = args[0].getText().replace(/['"`]/g, "");
      const schemaObj = args[1] as ObjectLiteralExpression;

      const columns: ColumnDefinition[] = [];

      schemaObj.getProperties().forEach((prop) => {
        if (prop.getKind() !== SyntaxKind.PropertyAssignment) return;

        const propAssign = prop.asKindOrThrow(SyntaxKind.PropertyAssignment);
        const columnName = propAssign.getName();

        const init = propAssign.getInitializerIfKind(SyntaxKind.CallExpression);
        if (!init) return;

        let baseType = "";
        const config: string[] = [];

        let currentExpr: CallExpression | undefined = init;

        while (currentExpr) {
          const expression = currentExpr.getExpression();

          if (expression.getKind() === SyntaxKind.Identifier) {
            baseType = expression.getText();
            break;
          } else if (
            expression.getKind() === SyntaxKind.PropertyAccessExpression
          ) {
            const method = expression.getLastToken()?.getText();
            if (method) {
              if (method === "references") {
                const args = currentExpr.getArguments();
                if (args.length === 1) {
                  const arrowFn = args[0].asKind(SyntaxKind.ArrowFunction);
                  if (arrowFn) {
                    const refBody = arrowFn.getBody();
                    const refText = refBody.getText();
                    const [refTable] = refText.split(".");
                    config.push(`references(${refTable})`);
                  } else {
                    config.push("references(?)");
                  }
                } else {
                  config.push("references(?)");
                }
              } else {
                config.push(method);
              }
            }

            const innerExpr = expression.getFirstChildByKind(
              SyntaxKind.CallExpression
            );
            currentExpr = innerExpr ?? undefined;
          } else {
            break;
          }
        }

        columns.push({
          name: columnName,
          type: baseType,
          config: config.reverse(),
        });
      });
      tables.push({
        tableName: tableNameArg,
        variableName: declaration.getName(),
        columns,
      });
    });
  });

  return tables;
}
