# Haswani Sugandhalaya Website

A responsive 3-page static business website.

## Run locally
Open `index.html` in a browser, or use a local server:
- VS Code: install/use Live Server and open `index.html`
- Python: `python -m http.server 8000`, then visit `http://localhost:8000`

## Update business contact details
Open `script.js` and edit the `BUSINESS` object:
- `phoneDisplay`: number shown to visitors
- `phoneLink`: international phone format, e.g. `+919876543210`
- `email`: business email address
- `whatsapp`: WhatsApp number with country code, digits only, e.g. `919876543210`

No contact details have been invented. The placeholders remain until you add the real details.

## Update products
Edit the product cards in `marketplace.html`. Each card uses:
- `data-category` for filtering (`agarbatti`, `dhoop`, `camphor`, `sambrani`, `havan`, `other`)
- `data-name` for search
- local SVG image in `assets/` (replace `src` with your product image path)
- product name and description in the card content

Prices are omitted intentionally because none were supplied. Enquiry buttons open the Contact page with the product name prefilled in the message.

## Contact form
The form performs browser-side validation and opens the visitor's email app with a prefilled message. It is not connected to a server or database. Add the business email in `script.js` to enable the mailto submission.

## Design
Palette: Saffron Orange `#F59E0B`, Warm Cream `#FFF9ED`, Dark Brown `#493323`.
The website uses custom local SVG illustrations as replaceable placeholders. Google Fonts are loaded online; system serif/sans-serif fallbacks are included.
