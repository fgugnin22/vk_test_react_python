import { Button } from "@/shared";
import { Api } from "../../store/api";
import ArticleRow from "./components/ArticleRow";

const MainPage = () => {
  const articles = Api.useGetArticlesQuery({}, { pollingInterval: 1000 * 60 });

  const [getNewArticles] = Api.useLazyGetArticlesQuery();

  const handleRefreshButtonClick = () => {
    articles.refetch();
  };

  const createHandlePaginationClick = (where: "previous" | "next") => () => {
    if (articles.data) {
      getNewArticles({ url: articles.data[where] ?? undefined });
    }
  };

  const handlePrevClick = createHandlePaginationClick("previous");
  const handleNextClick = createHandlePaginationClick("next");

  return (
    <main className="flex flex-col w-full space-y-4 text-sm sm:text-lg max-w-5xl mx-auto pb-12 md:px-3">
      <div className="rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 p-4 items-center gap-4 md:grid-cols-3 md:p-6">
          <h1 className="text-2xl font-bold tracking-tight">Articles</h1>
          <Button className=" col-start-3" onClick={handleRefreshButtonClick}>
            Force Refresh
          </Button>
          <div className="col-start-1 col-end-4 w-full">
            <div className="border-t border-b bg-gray-50 dark:bg-gray-950 flex font-medium">
              <p className="p-4 text-left tracking-wider w-[25%]">Title</p>
              <p className="p-4 text-center tracking-wider w-[25%]">Rating</p>
              <p className="p-4 text-center tracking-wider w-[25%]">Author</p>
              <p className="p-4 text-right tracking-wider w-[25%]">
                Publish Date
              </p>
            </div>
            {articles.data?.results.map((article) => (
              <ArticleRow
                key={article.id + article.heading + "row"}
                article={article}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <Button
          disabled={Number(articles.data?.previous?.length ?? 0) === 0}
          onClick={handlePrevClick}
        >
          Previous
        </Button>
        <p className=" font-medium">Page 1</p>
        <Button
          disabled={Number(articles.data?.next?.length ?? 0) === 0}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </main>
  );
};

export default MainPage;
