import { Api, Comment } from "@/store/api";
import { useState } from "react";
import Form from "../Form";
import { useParams } from "react-router-dom";

type CommentComponentProps = {
  comment: Comment;
};

const CommentComponent: React.FC<CommentComponentProps> = (props) => {
  const articleId = Number(useParams().id);

  const [getReplies] = Api.useLazyGetChildCommentsQuery();

  const [replies, setReplies] = useState<Comment[] | undefined>(undefined);

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleReplyClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleGetRepliesButtonClick = () => {
    getReplies(props.comment.id)
      .unwrap()
      .then((comments) => setReplies(comments));
  };

  return (
    <div
      style={{
        marginLeft: `${props.comment.root_comment_id !== null ? 40 : 0}px`
      }}
      className="flex flex-col gap-1 my-6 max-w-full relative"
    >
      <button
        className="ml-auto hover:bg-gray-200 transition p-1 absolute top-0 right-0 rounded-xl"
        onClick={handleReplyClick}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="text-xl mr-9">
        <span className="font-semibold">{props.comment.author_name}</span>
        <span className="text-sm ml-4">at {props.comment.created_at}</span>
      </p>
      <p className="text-lg mr-9">{props.comment.content}</p>
      {props.comment.has_child_comments && replies === undefined && (
        <button
          className="flex items-center gap-2 hover:opacity-50 transition"
          onClick={handleGetRepliesButtonClick}
        >
          <div className="grow h-[2px] bg-gray-500"></div>See replies
          <div className="grow h-[2px] bg-gray-500"></div>
        </button>
      )}
      {isFormVisible && (
        <Form
          isReply={true}
          repliedCommentId={props.comment.id}
          articleId={articleId}
        />
      )}
      {replies !== undefined && (
        <div className=" relative">
          <div className="absolute top-0 bottom-4 w-[2px] bg-gray-300"></div>

          {replies.map((comment) => (
            <CommentComponent
              key={comment.id + comment.content.slice(10)}
              comment={comment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
