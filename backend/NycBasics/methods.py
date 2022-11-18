import random
from django.conf import settings
from django.core.mail import send_mail

def generate_activation_code():
    return int(''.join([str(random.randint(0,10)) for _ in range(6)]))

def send_verification_mail(email):
    
    generated_code = generate_activation_code()
    subject = 'NYC Basics Verification Code'
    message = f'Your verification code:\n{generated_code}..'
    from_email = settings.EMAIL_HOST_USER
    recipient_list=[email, ]
    send_mail(subject, message, from_email, recipient_list)