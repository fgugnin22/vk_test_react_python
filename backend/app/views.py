from django.db.models import Prefetch
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet

from app.models import Article, Comment, Author
from app.serializers import ArticleSerializer, CommentSerializer, AuthorSerializer


class ArticleAPIView(ReadOnlyModelViewSet):
    queryset = (Article.objects
                .prefetch_related(
                    Prefetch(lookup='comments', queryset=Comment.objects.filter(root_comment=None))
                )
                .order_by('created_at'))

    serializer_class = ArticleSerializer


class AuthorAPIView(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class CommentAPIView(ReadOnlyModelViewSet):
    queryset = Comment.objects.all().order_by('created_at')
    serializer_class = CommentSerializer

    @action(methods=["GET"], detail=True)
    def children(self, request, pk=None):
        queryset = self.get_queryset().filter(root_comment=pk)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        content = request.data.get("content")
        article_id = request.data.get("article_id")
        root_comment_id = request.data.get("root_comment_id", None)
        author_id = request.data.get("author_id")

        if root_comment_id is None:
            root_comment = None
        else:
            root_comment = Comment.objects.get(pk=root_comment_id)

        article = Article.objects.get(pk=article_id)

        author = Author.objects.get(pk=author_id)

        new_comment = Comment.objects.create(content=content,
                                             article=article,
                                             author=author,
                                             root_comment=root_comment)

        serializer = self.get_serializer(new_comment, many=False)

        return Response(serializer.data)
