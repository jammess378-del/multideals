const prodContainer = document.getElementById("products");

async function fetchTelegramDeals() {
  try {
    const url =
      "https://api.rss2json.com/v1/api.json?rss_url=https://t.me/s/Faydamart";

    const res = await fetch(url);
    const data = await res.json();

    prodContainer.innerHTML = "";

    data.items.forEach(item => {
      let title = item.title || "Deal";
      let link = item.link;
      let desc = item.description || "";

      // Image extract (if exists)
      let imgMatch = desc.match(/<img[^>]+src="([^">]+)"/);
      let image = imgMatch ? imgMatch[1] : "https://via.placeholder.com/150";

      let div = document.createElement("div");
      div.className = "prod-card";
      div.innerHTML = `
        <img src="${image}">
        <p><strong>${title}</strong></p>
        <a href="${link}" target="_blank">View Deal</a>
      `;

      prodContainer.appendChild(div);
    });

  } catch (e) {
    console.error("Telegram feed error", e);
  }
}

// load on start
fetchTelegramDeals();
