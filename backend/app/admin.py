from django.contrib import admin
from app.models import *

admin.site.register([Article, Author, Comment, Paragraph])