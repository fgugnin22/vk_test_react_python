import { Button } from "@/shared";
import { Api, Article, ListApiResponse } from "@/store/api";
import ArticleRow from "./components/ArticleRow";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

const MainPage = () => {
  const articles = Api.useGetArticlesQuery({}, { pollingInterval: 1000 * 60 });

  const [getNewArticles] = Api.useLazyGetArticlesQuery();

  const [currentArticles, setCurrentArticles] = useState<
    ListApiResponse<Article> | undefined
  >(undefined);

  useEffect(() => {
    if (articles.data) {
      setCurrentArticles(articles.data);
    }
  }, [articles.data]);

  const handleRefreshButtonClick = () => {
    articles.refetch();
  };

  const createHandlePaginationClick = (where: "previous" | "next") => () => {
    if (currentArticles) {
      getNewArticles({ url: currentArticles[where] ?? undefined })
        .unwrap()
        .then((response) => setCurrentArticles(response));
    }
  };

  return (
    <main className="flex flex-col justify-between w-full space-y-4 text-sm sm:text-lg max-w-5xl mx-auto pb-12 md:px-3 min-h-screen pt-8">
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
            {currentArticles?.results.map((article) => (
              <ArticleRow
                key={article.id + article.heading + "row"}
                article={article}
              />
            ))}
          </div>
        </div>
      </div>
      <Pagination
        createHandler={createHandlePaginationClick}
        isNextDisabled={Number(currentArticles?.next?.length ?? 0) === 0}
        isPrevDisabled={Number(currentArticles?.previous?.length ?? 0) === 0}
      />
    </main>
  );
};

export default MainPage;
