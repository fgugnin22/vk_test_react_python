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

export type CreateCommentType = {
  content: string;
  article_id: number;
  root_comment_id: number | null;
  author_name: string;
};

export type Paragraph = {
  heading?: string;
  content: string;
};

export type Comment = {
  id: number;
  article_id: number;
  root_comment_id: number | null;
  author_name: string;
  content: string;
  created_at: string;
  has_child_comments: boolean;
};

export type Article = {
  id: number;
  heading: string;
  created_at: string;
  rating: string;
  author_name: number;
  comments_count: number;
  comments: Comment[];
  paragraphs: Paragraph[];
};

export type Author = {
  id: number;
  name: string;
};

const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ROOT_URL, prepareHeaders(headers) {
      function getCsrfToken(name) {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
          const [key, value] = cookie.split('=');
          if (key === name) {
            return decodeURIComponent(value);
          }
        }
        return null;
      }

      const csrfToken = getCsrfToken('csrftoken') || '';
      headers.append('X-CSRFToken', csrfToken)
    },
  }),
  tagTypes: ["Article"],
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
        return { url: `articles/${id}/` };
      },
      providesTags: ["Article"]
    }),
    getChildComments: builder.query<Comment[], number>({
      query: (id) => {
        return { url: `comments/${id}/children/` };
      }
    }),
    createComment: builder.mutation<
      Comment,
      Omit<Comment, "id" | "has_child_comments" | "created_at">
    >({
      query: (body) => {
        return {
          url: `comments/`,
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
        };
      },
      invalidatesTags: ["Article"]
    })
  })
});

export { Api };
