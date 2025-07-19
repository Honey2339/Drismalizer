"use client";
import EditorView from "@/components/custom/EditorView";
import Flow from "@/components/custom/Flow";
import { TableDefinition } from "@/lib/types";
import { useEffect, useState } from "react";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";
import SplitPane from "react-split-pane";

const defaultValue = `// Please provide your schema here.

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  messages: json("messages").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
});

export type Chat = Omit<InferSelectModel<typeof chat>, "messages"> & {
  messages: Array<Message>;
};`;

const Page = () => {
  const [localStorage, setLocalStorage] = useLocalStorage(
    "localStorage",
    defaultValue
  );
  const [tables, setTables] = useState<TableDefinition[] | null>(null);
  const [value, setValue] = useState(localStorage);
  const [debouncedValue] = useDebounceValue(value, 1000);

  useEffect(() => {
    const fetchParsed = async () => {
      try {
        const res = await fetch("/api/parse", {
          method: "POST",
          body: JSON.stringify({ code: debouncedValue }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API returned ${res.status}: ${text}`);
        }

        const { data } = await res.json();
        setTables(data);
      } catch (err: any) {
        if (err?.type === "cancelation") return;
        console.error("Error parsing schema:", err);
      }
    };

    fetchParsed();
  }, [debouncedValue]);

  return (
    <div className="h-[calc(100vh-4rem)]">
      {
        //@ts-ignore
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize="33%"
          style={{ height: "100%" }}
        >
          <section className="h-full border-r-2 overflow-auto">
            <EditorView value={debouncedValue} onChange={(e) => setValue(e!)} />
          </section>
          <div className="h-full overflow-hidden">
            {tables && <Flow tables={tables} />}
          </div>
        </SplitPane>
      }
    </div>
  );
};

export default Page;
