# Contact form email setup

The contact form is connected to the owner's Gmail address:

```text
maharhassan151@gmail.com
```

Both **WhatsApp** and **Email** selections are sent to that Gmail inbox. The selected option is included in the enquiry so the owner knows whether the customer prefers a WhatsApp or email reply.

## One-time activation required

The site uses FormSubmit's browser-based AJAX endpoint, so there is no custom backend in this project. FormSubmit requires the owner to approve the destination email once.

1. Deploy or run the website through a web server (`npm run dev` is fine).
2. Submit one complete test enquiry.
3. Open `maharhassan151@gmail.com` and check **Inbox**, **Spam**, and **Promotions**.
4. Open the FormSubmit activation message and click the confirmation/activation button.
5. Submit a second test enquiry. It should then arrive in the owner's Gmail.

The website now shows a success message only after FormSubmit returns a successful response. A failed network request no longer displays a false success message.

## Important

An email address alone cannot authorize Gmail or an SMTP account. The one-time activation must be completed by someone who can open the owner's Gmail inbox. No Gmail password or app password should be placed in frontend code.
