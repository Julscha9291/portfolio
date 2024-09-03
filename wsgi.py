import os
import django
from django.core.wsgi import get_wsgi_application
import sys

sys.path.append('/home/pi/portfolio') 


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

application = get_wsgi_application()

