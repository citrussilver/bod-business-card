(function () {
  const config = window.CARD_CONFIG;
  if (!config) return;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  setText("display-name", config.name);
  setText("desc-title", config.title);
  setText("tagline", config.tagline);
  setText("contact-email", config.email);
  setText("contact-phone", config.phone);

  const phoneSection = document.getElementById("phone");
  if (phoneSection && !config.phone) {
    phoneSection.style.display = "none";
  }
})();
