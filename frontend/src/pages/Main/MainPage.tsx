import { Button } from "@/shared";
import { Api } from "../../store/api";
import ArticleRow from "./components/ArticleRow";

const MainPage = () => {
  const articles = Api.useGetArticlesQuery({});

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 p-4 items-center gap-4 md:grid-cols-3 md:p-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold tracking-tight">Articles</h1>
            <Button>Force Refresh</Button>
          </div>
          <div className="col-start-1 col-end-4 w-full">
            <div className="overflow-auto">
              <table className="min-w-full w-full">
                <thead>
                  <tr className="border-t border-b bg-gray-50 dark:bg-gray-950">
                    <th className="p-4 text-left text-sm font-normal tracking-wider">
                      Title
                    </th>
                    <th className="p-4 text-left text-sm font-normal tracking-wider">
                      Rating
                    </th>
                    <th className="p-4 text-left text-sm font-normal tracking-wider">
                      Author
                    </th>
                    <th className="p-4 text-left text-sm font-normal tracking-wider">
                      Publish Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {articles.data?.results.map((article) => (
                    <ArticleRow key={article.id + article.heading + "row"} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <Button>Previous</Button>
        <p className="text-sm font-medium">Page 1</p>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default MainPage;
