import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ListApiResponse<Entity> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Entity[];
};

export type GetArticlesParams = {
  limit?: number;
  offset?: number;
  url?: string;
};

export type Comment = {
  id: number;
  article_id: number;
  root_comment_id: number | null;
  author_name: number;
  content: string;
  created_at: string;
  has_child_comments: boolean;
};

export type Article = {
  id: number;
  heading: string;
  content: string;
  created_at: string;
  rating: string;
  author_name: number;
  comments: Comment[];
};

export type Author = {
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
      query: ({ limit, offset, url }) => {
        limit ??= 100;
        offset ??= 0;

        if (url) {
          const queryParams = url.slice(url.indexOf("?"));

          return { url: `articles/${queryParams}` };
        } else {
          return { url: `articles/?limit=${limit}&offset=${offset}` };
        }
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
