import os
import django
from django.core.wsgi import get_wsgi_application
import sys

sys.path.append('/root/coding/portfolio') 


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

application = get_wsgi_application()

