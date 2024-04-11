from rest_framework import serializers

from app.models import Article, Author, Comment


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    article_id = serializers.PrimaryKeyRelatedField(source="article", read_only=True)
    root_comment_id = serializers.PrimaryKeyRelatedField(source="root_comment", read_only=True)
    author_name = serializers.CharField(source="author", read_only=True)
    has_child_comments = serializers.SerializerMethodField()

    def get_has_child_comments(self, obj):
        return self.Meta.model.objects.filter(root_comment_id=obj.id).count() > 0

    class Meta:
        model = Comment
        fields = (
            "id",
            "article_id",
            "root_comment_id",
            "author_name",
            "content",
            "created_at",
            "has_child_comments"
        )


class ArticleSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    author_name = serializers.CharField(source="author", read_only=True)

    class Meta:
        model = Article
        fields = (
            "id",
            "comments",
            "heading",
            "content",
            "created_at",
            "rating",
            "author_name",
        )

