from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from .forms import ContactForm

def index(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            honeypot = form.cleaned_data.get('honeypot')
            if honeypot:
                response_data = {'status': 'error', 'message': 'Spam detected!'}
                return JsonResponse(response_data)

            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            try:
                send_mail(
                    subject=f"Contact Form: {name}",
                    message=f"Name: {name}\nEmail: {email}\nMessage: {message}",
                    from_email='info@julianschaepermeier.com',
                    recipient_list=['info@julianschaepermeier.com'],
                    fail_silently=False,
                )
                response_data = {'status': 'success', 'message': 'Thank you for your message!'}
            except Exception as e:
                response_data = {'status': 'error', 'message': f'An error occurred: {e}'}
            
            return JsonResponse(response_data)
    
    else:
        form = ContactForm()

    return render(request, 'index.html', {'form': form})
