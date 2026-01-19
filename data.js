const prodContainer = document.getElementById("products");

async function fetchTelegramDeals() {
  try {
    const proxy = "https://api.allorigins.win/raw?url=";
    const target = "https://t.me/s/Faydamart";
    const res = await fetch(proxy + encodeURIComponent(target));
    const html = await res.text();

    // Telegram post blocks
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const posts = doc.querySelectorAll(".tgme_widget_message");

    prodContainer.innerHTML = "";

    posts.forEach(post => {
      const text =
        post.querySelector(".tgme_widget_message_text")?.innerText || "Deal";
      const link =
        post.querySelector(".tgme_widget_message_date")?.href || "#";
      const img =
        post.querySelector("img")?.src ||
        "https://via.placeholder.com/150";

      const div = document.createElement("div");
      div.className = "prod-card";
      div.innerHTML = `
        <img src="${img}">
        <p>${text.substring(0, 80)}...</p>
        <a href="${link}" target="_blank">View Deal</a>
      `;

      prodContainer.appendChild(div);
    });

  } catch (e) {
    console.error("Telegram fetch error", e);
  }
}

fetchTelegramDeals();
