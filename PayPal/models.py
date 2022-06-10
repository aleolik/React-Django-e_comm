
from http.client import PROCESSING
from django.conf import settings
from django.db import models
from django.utils import timezone
from APIComp.models import Post
from django.utils.translation import gettext_lazy as _
User = settings.AUTH_USER_MODEL

now = timezone.now()

class Order(models.Model):
    class StatusChoices(models.TextChoices):
        PROCESSING = 'PROC',_('PROCESSING')
        COMPLETED = 'CMPL', _('COMPLETED')
    status = models.CharField(
        max_length=5,
        choices=StatusChoices.choices,
        default=StatusChoices.PROCESSING,
    )
    post = models.ManyToManyField(Post)
    price = models.FloatField(default=0)
    time_updated = models.DateTimeField(auto_now=True,null=True)
    time_created = models.DateTimeField(auto_now_add=True,null=True)
    class Meta:
        ordering = ['-time_created']
    user = models.ForeignKey(User,on_delete=models.CASCADE)
