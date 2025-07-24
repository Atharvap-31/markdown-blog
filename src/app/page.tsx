// app/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((filename) => {
    const markdown = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data } = matter(markdown);
    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
    };
  });

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
          📘 My Blog
        </h1>
        <p className="text-gray-500 text-sm">
          Thoughts, tutorials & experiments
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 hover:border-blue-500 group">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 mt-2">📅 {post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
