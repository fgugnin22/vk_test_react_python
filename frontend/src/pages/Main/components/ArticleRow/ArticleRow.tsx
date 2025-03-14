import { Article } from "@/store/api";
import { Link } from "react-router-dom";

type ArticleRowProps = { article: Article };

const ArticleRow: React.FC<ArticleRowProps> = (props) => {
  return (
    <Link
      to={`/articles/${props.article.id}/`}
      className="flex w-full transition duration-100 hover:bg-gray-100"
    >
      <p className="p-4 w-[25%] font-medium">{props.article.heading}</p>
      <p className="p-4 w-[25%] text-center">{props.article.rating}</p>
      <p className="p-4 w-[25%] text-center">{props.article.author_name}</p>
      <p className="p-4 w-[25%] text-right">{props.article.created_at}</p>
    </Link>
  );
};

export default ArticleRow;
