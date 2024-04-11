import { Api } from "@/store/api";
import { useParams } from "react-router-dom";
import Paragraph from "./Paragraph";
import CommentComponent from "./CommentComponent";

const ArticlePage = () => {
  const params = useParams();

  const article = Api.useGetArticleByIdQuery(Number(params.id));

  const link = location.href;

  return (
    <div className="px-4 pb-6 md:px-6 md:pb-12 lg:pb-16 pt-6">
      <p className="text-xl text-gray-500 font-medium">
        Page link:
        <br /> {link}
      </p>
      <article className="prose prose-gray mx-auto max-w-6xl dark:prose-invert mt-8">
        <div className="space-y-2 not-prose">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {article.data?.heading}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Posted on {article.data?.created_at}
          </p>
          <p className="text-gray-500 dark:text-gray-400">By John Doe</p>
        </div>
        <div>
          {article.data?.paragraphs.map((par) => (
            <Paragraph
              key={par.content.slice(10) + par.heading?.slice(10)}
              p={par}
            />
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </svg>
          <span className="text-gray-500 dark:text-gray-400">
            {article.data?.comments.length} comments
          </span>
        </div>
        <div>
          {article.data?.comments.map((com) => (
            // Называется CommentComponent чтобы обойти коллизии с Comment, т.к. это built-in
            <CommentComponent
              key={com.id + com.content.slice(0, 5)}
              comment={com}
            />
          ))}
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
