import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ListApiResponse<Entity> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Entity[];
};

type GetArticlesParams = {
  limit: number;
  offset: number;
};

type Comment = {
  id: number;
  article_id: number;
  root_comment_id: number | null;
  author_id: number;
  content: string;
  created_at: string;
  has_child_comments: boolean;
};

type Article = {
  id: number;
  heading: string;
  content: string;
  created_at: string;
  rating: string;
  author_id: number;
  comments: Comment[];
};

type Author = {
  id: number;
  name: string;
};

const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_ROOT_URL }),
  tagTypes: [],
  refetchOnMountOrArgChange: true,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getArticles: builder.query<ListApiResponse<Article>, GetArticlesParams>({
      query: ({ limit, offset }) => {
        limit ??= 100;
        offset ??= 0;

        return { url: `articles/?limit=${limit}&offset=${offset}` };
      }
    }),
    getArticleById: builder.query<Article, number>({
      query: (id) => {
        return { url: `articles/${id}` };
      }
    }),
    getChildComments: builder.query<Comment[], number>({
      query: (id) => {
        return { url: `comments/${id}/children` };
      }
    }),
    createAuthor: builder.mutation<Author, Omit<Author, "id">>({
      query: (body) => {
        return { url: `authors`, method: "POST", body: JSON.stringify(body) };
      }
    })
  })
});

export { Api };
