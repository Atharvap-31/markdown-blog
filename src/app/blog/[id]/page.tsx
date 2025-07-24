import fs from "fs";
import path from "path";
import matter from "gray-matter";
import markdownToHtml from "../../../../utils/markdownToHtml";

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("posts"));
  return files.map((filename) => ({
    id: filename.replace(".md", ""),
  }));
}

export default async function BlogPost({ params }: Props) {
  const filePath = path.join("posts", `${params.id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const htmlContent = await markdownToHtml(content);

  return (
    <article className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300">
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 mb-4">
        {data.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6 border-b border-dashed pb-4">
        📅 {data.date}
      </p>

      <div
        className="prose prose-lg max-w-none text-gray-800 prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:underline prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
