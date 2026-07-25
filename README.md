# Hassan Nawaz — Architect Designer Portfolio

A responsive React/Vite portfolio with separate pages for Home, Projects, About, Services, Contact and individual project details.

## Main improvements

- Light theme is the default; dark theme is optional and saved in the browser.
- Larger, cleaner navigation buttons with no numbering.
- Profile photograph and the title **Architect Designer** are used in the navigation.
- Homepage is deliberately concise and does not repeat the project library or About-page biography.
- Projects are separated into: 2D Drawings, 3D Visualization, Commercial, Hospitality, Interior, Prefab & Modular and Residential.
- Every project is listed once in its primary category.
- Services page contains only relevant service information; process cards and “Typical deliverables” blocks were removed.
- Contact rail uses icons and is automatically hidden on screens where it could overlap content.
- Contact form submits by AJAX without navigating away from the portfolio.
- Form success uses one clear confirmation message rather than repeated WhatsApp/email buttons.
- Dropdowns, inputs, cards and headings are readable in both themes.
- Page headings are page-specific and use moderate sizes and consistent spacing.

## Run in VS Code

1. Extract the folder.
2. Open the folder containing `package.json` in VS Code.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
npm run preview
```

The deployable files are created in `dist/`.

## Contact-form activation

The form uses a normal browser POST to FormSubmit and sends enquiries to:

```text
maharhassan151@gmail.com
```

On the first real submission, FormSubmit sends an activation email to that address. Hassan must open that email and activate the form once. After activation, later submissions are delivered by email. The form uses FormSubmit's official AJAX endpoint and only displays success after the service confirms that it accepted the submission.

No custom backend, database, serverless API, Resend service, or WhatsApp API is used.

### Reply-channel behavior

Every form submission is delivered to the owner at `maharhassan151@gmail.com`. The selected WhatsApp or Email option is included in the enquiry as the customer’s preferred reply channel. WhatsApp remains a website selection only: it does not open WhatsApp or use a WhatsApp API. The customer sees a channel-specific success message and the owner responds through the selected channel.

## External video footage

The architectural background footage is loaded from Pexels download endpoints. It is used as atmospheric footage only and is not represented as Hassan Nawaz’s own project work. Poster images from the portfolio remain visible if a video cannot load.

See `VIDEO-SOURCES.md` for source and licence details.
