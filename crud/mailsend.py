from django.core.mail import EmailMultiAlternatives


def send_welcome_email(firstname, email, origin, code, email):
    subject = 'Welcome to Our Site'
    from_email = 'okpekuighodaro@gmail.com'
    to = [email]
    
    text_content = f'Hi {firstname},\n\nThank you for signing up for our site!\n\nBest regards,\nYour Site Team'
    html_content = f'''
    <html>
    <body>
        <p>Hi {firstname},</p>
        <p>please <a href='{origin}/{code}/{email}'>click</a> here to confirm your  </p>
        <p>Best regards,<br>Your Site Team</p>
    </body>
    </html>
    '''
    
  
    msg = EmailMultiAlternatives(subject, text_content, from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()
