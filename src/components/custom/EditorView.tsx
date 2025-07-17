"use client";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

const EditorView = ({ value, onChange }: EditorViewProps) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `
      declare module "drizzle-orm/pg-core" {
        export function pgTable(name: string, schema: any): any;
        export function serial(name: string): any;
        export function text(name: string): any;
        export function varchar(name: string, config: any): any;
        export function timestamp(name: string): any;
        export function integer(name: string): any;
      }

      declare module "drizzle-orm" {
        export function relations(table: any, fn: any): any;
      }
      `,
        "file:///node_modules/@types/drizzle-fake/index.d.ts"
      );
    }
  }, [monaco]);

  return (
    <Editor
      language="typescript"
      theme="light"
      height="100vh"
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        scrollBeyondLastLine: true,
        fontSize: 14,
        fontFamily: "JetBrains Mono, monospace",
        tabSize: 2,
        automaticLayout: true,
        quickSuggestions: false,
        suggestOnTriggerCharacters: false,
        codeLens: false,
      }}
    />
  );
};

export interface EditorViewProps {
  value: string;
  onChange: (text?: string) => void;
}

export default EditorView;
