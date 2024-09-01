from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from .forms import ContactForm

def index(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            try:
                send_mail(
                    subject=f"Contact Form: {name}",
                    message=f"Name: {name}\nEmail: {email}\nMessage: {message}",
                    from_email='info@julian-schaepermeier.de',
                    recipient_list=['info@julian-schaepermeier.de'],
                    fail_silently=False,
                )
                request.session['contact_message'] = 'Thank you for your message!'  # Nachricht speichern
            except Exception as e:
                request.session['contact_message'] = f'An error occurred: {e}'

            return redirect('/#contact')  # Zurück zur Kontaktsektion

    else:
        form = ContactForm()

    contact_message = request.session.pop('contact_message', '')  # Nachricht abrufen und löschen
    return render(request, 'index.html', {'form': form, 'message': contact_message})
