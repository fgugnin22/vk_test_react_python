import { Article } from "@/store/api";
import { Link } from "react-router-dom";

type ArticleRowProps = { article: Article };

const ArticleRow: React.FC<ArticleRowProps> = (props) => {
  return (
    <Link
      to={`/article/${props.article.id}`}
      className="flex w-full transition duration-100 hover:bg-gray-100"
    >
      <td className="p-4 w-[25%] font-medium">{props.article.heading}</td>
      <td className="p-4 w-[25%] text-center">{props.article.rating}</td>
      <td className="p-4 w-[25%] text-center">{props.article.author_name}</td>
      <td className="p-4 w-[25%] text-right">{props.article.created_at}</td>
    </Link>
  );
};

export default ArticleRow;
