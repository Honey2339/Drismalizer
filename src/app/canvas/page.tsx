"use client";
import EditorView from "@/components/custom/EditorView";
import Flow from "@/components/custom/Flow";
import { useState } from "react";

const defaultValue = `import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

  const toggleEditor = () => setEditorVisible((v) => !v);

  return (
    <div className="flex h-screen">
      {editorVisible && (
        <section className="w-1/3 border-r-2">
          <EditorView />
        </section>
      )}

      <div className="flex-1">
        <Flow />
      </div>
    </div>
  );
};

export default Page;
