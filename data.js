const container = document.getElementById("products");

async function loadTelegramDeals() {
  try {
    const proxy = "https://api.allorigins.win/raw?url=";
    const telegramURL = "https://t.me/s/Faydamart";

    const res = await fetch(proxy + encodeURIComponent(telegramURL));
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const posts = doc.querySelectorAll(".tgme_widget_message");

    container.innerHTML = "";

    posts.forEach(post => {
      const text =
        post.querySelector(".tgme_widget_message_text")?.innerText || "";
      const link =
        post.querySelector(".tgme_widget_message_date")?.href || "#";
      const img =
        post.querySelector("img")?.src ||
        "https://via.placeholder.com/300";

      const card = document.createElement("div");
      card.className = "prod-card";

      card.innerHTML = `
        <img src="${img}">
        <p>${text.substring(0,120)}</p>
        <a href="${link}" target="_blank">View Deal</a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "Failed to load deals";
    console.error(err);
  }
}

loadTelegramDeals();
