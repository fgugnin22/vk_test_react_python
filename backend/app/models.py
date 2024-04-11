from django.db import models


class Article(models.Model):
    heading = models.CharField(max_length=128)
    content = models.TextField(max_length=2 ** 14)
    created_at = models.DateField(auto_now_add=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    author = models.ForeignKey(to="Author", on_delete=models.CASCADE)

    def __str__(self):
        return self.heading


class Author(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Comment(models.Model):
    content = models.TextField(max_length=512)
    author = models.ForeignKey(to=Author, on_delete=models.CASCADE)
    article = models.ForeignKey(to="Article", on_delete=models.CASCADE, null=True, blank=True,
                                     related_name='comments')
    root_comment = models.ForeignKey(to="Comment", on_delete=models.CASCADE, null=True, blank=True,
                                     related_name="answers")
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.name} in {self.article.heading}: {self.content[:30]}"
