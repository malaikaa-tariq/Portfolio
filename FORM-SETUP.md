# Contact form setup

The project has no database and no custom backend.

The React form sends enquiries by AJAX to FormSubmit:

```text
https://formsubmit.co/ajax/maharhassan151@gmail.com
```

## One-time activation

1. Run the website.
2. Submit one real test enquiry.
3. Open the activation email received at `maharhassan151@gmail.com`.
4. Confirm/activate the form.
5. Submit another test enquiry and verify that the email arrives.

The visitor remains on the website and sees one confirmation message.

## Preferred reply method

WhatsApp and Email are selection fields inside the form; they do not navigate the visitor away. The selected option is included in the email so Hassan knows how the client wants to be contacted.

A static/browser-only site cannot automatically send a WhatsApp message to the owner. For that feature, add a secure serverless function using the official Meta WhatsApp Cloud API. Do not put WhatsApp API tokens directly in React or public JavaScript.
