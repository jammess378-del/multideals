const CHANNEL_URL = "https://t.me/s/Faydamart";

fetch(CHANNEL_URL)
  .then(res => res.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const messages = doc.querySelectorAll(".tgme_widget_message");

    const container = document.getElementById("deals");

    messages.forEach(msg => {

      const photo = msg.querySelector(".tgme_widget_message_photo_wrap");
      const text = msg.querySelector(".tgme_widget_message_text");
      const link = msg.querySelector("a");

      if (!photo || !text || !link) return;

      const bg = photo.style.backgroundImage;
      const img = bg.slice(5, -2);

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${img}">
        <div class="content">${text.innerText.slice(0, 120)}...</div>
        <a href="${link.href}" target="_blank">View Deal</a>
      `;

      container.appendChild(card);
    });
  });
