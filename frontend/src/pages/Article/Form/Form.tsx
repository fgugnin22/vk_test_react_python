import { Button } from "@/shared";
import { Api } from "@/store/api";
import React, { useState } from "react";

type FormProps = {
  isReply: boolean;
  repliedCommentId?: number;
  articleId: number;
};

const Form: React.FC<FormProps> = (props) => {
  const [createComment] = Api.useCreateCommentMutation();

  const [content, setContent] = useState("");

  const handleTextareaChange = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setContent((e.target as HTMLTextAreaElement).value);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      article_id: props.articleId,
      root_comment_id: props.repliedCommentId ?? null,
      author_name: 3,
      content
    };

    createComment(body);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label className="text-lg font-medium" htmlFor="content">
        Ваш {props.isReply ? "ответ" : "комментарий"}:
      </label>
      <textarea
        id="content"
        className="border border-gray-500 rounded-[10px] p-2 text-lg w-full"
        minLength={3}
        onChange={handleTextareaChange}
        required
      ></textarea>
      <Button className="w-full">Отправить</Button>
    </form>
  );
};

export default Form;
