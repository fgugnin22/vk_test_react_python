import { Button } from "@/shared";
import { Api } from "../../store/api";
import ArticleRow from "./components/ArticleRow";

const MainPage = () => {
  const articles = Api.useGetArticlesQuery({}, { pollingInterval: 1000 * 60 });

  return (
    <div className="flex flex-col w-full space-y-4 text-sm sm:text-lg max-w-5xl mx-auto">
      <div className="rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 p-4 items-center gap-4 md:grid-cols-3 md:p-6">
          <h1 className="text-2xl font-bold tracking-tight">Articles</h1>
          <Button className=" col-start-3">Force Refresh</Button>
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
        <Button>Previous</Button>
        <p className=" font-medium">Page 1</p>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default MainPage;
