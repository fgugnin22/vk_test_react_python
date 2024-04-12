import { Api } from "@/store/api";
import { Link, useParams } from "react-router-dom";
import Paragraph from "./Paragraph";
import CommentComponent from "./CommentComponent";
import Form from "./Form";

const ArticlePage = () => {
  const params = useParams();

  const article = Api.useGetArticleByIdQuery(Number(params.id));

  const link = location.href;

  const handleRefresh = () => {
    article.refetch();
  };

  return (
    <div className="px-4 pb-6 md:px-6 md:pb-12 lg:pb-16 pt-6">
      <div>
        <Link
          to="/"
          className="flex items-center gap-2 hover:underline hover:opacity-60 transition duration-100 mb-2"
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 1024 1024"
            fill="#000000"
          >
            <path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill=""
            />
          </svg>
          Go back to articles list
        </Link>
        <p className="text-xl text-gray-500 font-medium">
          Page link:
          <br /> {link}
        </p>
      </div>
      <article className="prose prose-gray mx-auto max-w-6xl dark:prose-invert mt-8 h-full">
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
          <div className="text-gray-500 dark:text-gray-400 flex items-center gap-4">
            <span> {article.data?.comments_count} comments</span>
            <button onClick={handleRefresh}>
              <svg
                className={
                  "fill-black hover:fill-gray-500 transition duration-100 " +
                  (article.isLoading ? " animate-spin" : " animate-none")
                }
                height="25px"
                width="25px"
                viewBox="0 0 489.645 489.645"
              >
                <g>
                  <path
                    d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
		c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
		c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
		c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
		C414.856,432.511,548.256,314.811,460.656,132.911z"
                  />
                </g>
              </svg>
            </button>
          </div>
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
      <div className="mt-4">
        <Form isReply={false} articleId={article.data?.id ?? 0} />
      </div>
    </div>
  );
};

export default ArticlePage;
