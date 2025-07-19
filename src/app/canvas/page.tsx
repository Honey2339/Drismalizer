"use client";
import EditorView from "@/components/custom/EditorView";
import Flow from "@/components/custom/Flow";
import { parseDrizzleSchema } from "@/lib/extractor";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const defaultValue = `// Please provide your schema here.

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  body: text("body").notNull(),
  postId: integer("post_id").references(() => posts.id),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});`;

const Page = () => {
  const [editorVisible, setEditorVisible] = useState(true);
  const [localStorage, setLocalStorage] = useLocalStorage(
    "localStorage",
    defaultValue
  );

  const [value, setValue] = useState(localStorage);

  const toggleEditor = () => setEditorVisible((v) => !v);

  useEffect(() => {
    const fetchParsed = async () => {
      const res = await fetch("/api/parse", {
        method: "POST",
        body: JSON.stringify({ code: value }),
        headers: { "Content-Type": "application/json" },
      });

      const { data } = await res.json();
      console.log(data);
    };

    fetchParsed();
  }, []);

  return (
    <div className="flex h-screen">
      {editorVisible && (
        <section className="w-1/3 border-r-2">
          <EditorView value={value} onChange={(e) => setValue(e!)} />
        </section>
      )}

      <div className="flex-1">
        <Flow />
      </div>
    </div>
  );
};

export default Page;
