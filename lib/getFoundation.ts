import type { Foundation } from "../interfaces";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const foundationsDirectory = join(process.cwd(), "_foundations");

export function getFoundationSlugs() {
  return fs.readdirSync(foundationsDirectory);
}

export function getFoundationBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(foundationsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Foundation = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllFoundations(fields: string[] = []) {
  const slugs = getFoundationSlugs();
  const foundations = slugs
    .map((slug) => getFoundationBySlug(slug, fields))
    // sort foundations by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return foundations;
}
