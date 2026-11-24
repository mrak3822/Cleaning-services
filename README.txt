LB CLEANING COMPANY - LANDING PAGE
==================================

Open index.html in any browser. No build step.

FILES
  index.html        page markup
  css/styles.css    all styling (colors are CSS variables at the top of the file)
  js/main.js        animations, before/after slider, FAQ, testimonials, booking form
  images/           every image used on the page

FONTS
  Montserrat + Poppins load from Google Fonts (needs internet).

REPLACING THE IMAGES WITH REAL PHOTOS
  All images in images/ are original illustrations used as stand-ins.
  To use real photos: put your photo in images/ and change the file name in
  the matching <img src="..."> in index.html.

  Service cards (4:3 crop, ~1200x900 recommended):
    service-home, service-rental, service-pre, service-post,
    service-commercial, service-office
  Hero:     hero-arch (portrait, ~680x1000), hero-bubbles (square)
  About:    about-supplies (portrait, ~880x1200)
  Before/after (landscape 16:9, ~1800x1000). Use the SAME camera angle for
  the before and after photo of each room:
    kitchen-before / kitchen-after
    bathroom-before / bathroom-after
    living-room-before / living-room-after

  Before/after file names are built in js/main.js (search "images/" + room).
  If your photos are .jpg, change ".svg" to ".jpg" in the two lines there.

BOOKING FORM
  The form validates name + email and shows a thank-you card, but it does not
  send anything yet. In js/main.js, find "HOOK UP YOUR BACKEND HERE" and post
  the `data` object to Formspree, Web3Forms, EmailJS or your own API.

CONTENT
  Phone, email, testimonials and service descriptions come from the client's
  current website (lbcleaningcompany.com).
