/*
  HASWANI SUGANDHALAYA — BUSINESS SETTINGS
  Replace the placeholders below with the real business details.
  WhatsApp number must include country code, digits only (India: 91XXXXXXXXXX).
*/
const BUSINESS = {
  phoneDisplay: "+91 9405850275",
  phoneLink: "+919405850275", // Example: "+919876543210"
  email: "sureshhaswami@gmail.com", // Example: "hello@example.com"
  whatsapp: "919405850275" // Example: "919876543210"
};

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      nav.classList.toggle("open", !isOpen);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    }));
  }

  // Update configurable contact links and visible values.
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    if (BUSINESS.phoneLink) link.href = `tel:${BUSINESS.phoneLink}`;
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    if (BUSINESS.email) {
      link.href = `mailto:${BUSINESS.email}`;
      if (link.textContent.includes("ADD EMAIL")) link.textContent = BUSINESS.email;
    }
  });
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    if (BUSINESS.phoneDisplay && !BUSINESS.phoneDisplay.includes("ADD PHONE")) {
      if (link.textContent.includes("ADD PHONE")) link.textContent = BUSINESS.phoneDisplay;
    }
  });
  const whatsapp = document.querySelector(".whatsapp-link");
  if (whatsapp) {
    if (BUSINESS.whatsapp) {
      whatsapp.href = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hello, I would like to enquire about your products.")}`;
    } else {
      whatsapp.href = "contact.html";
      whatsapp.addEventListener("click", event => {
        event.preventDefault();
        alert("Please add the business WhatsApp number in script.js before using this link.");
      });
    }
  }

  // Marketplace search and category filters.
  const search = document.getElementById("product-search");
  const filter = document.getElementById("category-filter");
  const grid = document.getElementById("product-grid");
  if (search && filter && grid) {
    const cards = [...grid.querySelectorAll(".product-card")];
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");
    const allowed = ["agarbatti", "dhoop", "camphor", "sambrani", "havan", "other"];
    if (requestedCategory && allowed.includes(requestedCategory)) filter.value = requestedCategory;
    const updateProducts = () => {
      const term = search.value.trim().toLowerCase();
      const category = filter.value;
      let visible = 0;
      cards.forEach(card => {
        const matchesCategory = category === "all" || card.dataset.category === category;
        const matchesSearch = card.dataset.name.includes(term) || card.textContent.toLowerCase().includes(term);
        const show = matchesCategory && matchesSearch;
        card.hidden = !show;
        if (show) visible++;
      });
      document.getElementById("results-count").textContent = `Showing ${visible} ${visible === 1 ? "product" : "products"}`;
      document.getElementById("empty-state").hidden = visible !== 0;
    };
    search.addEventListener("input", updateProducts);
    filter.addEventListener("change", updateProducts);
    updateProducts();
  }

  // Contact form: browser validation first, then open a prefilled email draft.
  const form = document.getElementById("contact-form");
  if (form) {
    const product = new URLSearchParams(window.location.search).get("product");
    if (product) document.getElementById("message").value = `I would like to enquire about: ${product}. `;
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const body = [
        `Name: ${data.get("name")}`,
        `Phone: ${data.get("phone")}`,
        `Email: ${data.get("email") || "Not provided"}`,
        "",
        `Message: ${data.get("message")}`
      ].join("\n");
      const recipient = BUSINESS.email || "";
      if (!recipient) {
        document.getElementById("form-feedback").textContent =
          "Your details are valid. Add the business email in script.js to enable email submission.";
        return;
      }
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent("Website Enquiry — Haswani Sugandhalaya")}&body=${encodeURIComponent(body)}`;
      document.getElementById("form-feedback").textContent = "Your email app should open with the enquiry ready to send.";
    });
  }
});