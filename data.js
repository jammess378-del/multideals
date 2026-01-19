// -----------------------------
// Telegram Bot API integration
// -----------------------------
const botToken = "7243849381:AAFpr-7WobxnLqKXM2CC6OVnDuVUwDf-Bjs";
const chatId = "@Faydamart"; // ya aapke channel ka username

const prodContainer = document.getElementById("products");

// Function to fetch latest messages from Telegram bot
async function fetchTelegramDeals() {
    try {
        const url = `https://api.telegram.org/bot${botToken}/getUpdates`;
        const res = await fetch(url);
        const data = await res.json();

        let deals = [];

        // Loop through messages
        data.result.forEach(msg => {
            if(msg.message && msg.message.text){
                // Format: "Category | Product Name | Price"
                let text = msg.message.text;
                if(text.includes("|")){
                    let [category, name, price] = text.split("|");
                    deals.push({
                        category: category.trim(),
                        name: name.trim(),
                        price: price.trim(),
                        image: "https://via.placeholder.com/150" // Optional: placeholder image
                    });
                }
            }
        });

        // Show products on page
        updateProducts(deals);

    } catch(e){
        console.error("Error fetching deals:", e);
    }
}

// Function to update products section
function updateProducts(deals){
    prodContainer.innerHTML = "";
    deals.forEach(d => {
        let div = document.createElement("div");
        div.className = "prod-card";
        div.innerHTML = `
            <img src="${d.image}" alt="${d.name}">
            <p>${d.name}</p>
            <p>₹${d.price}</p>
        `;
        prodContainer.appendChild(div);
    });
}

// Fetch every 30 seconds
setInterval(fetchTelegramDeals, 30000);

// Initial load
fetchTelegramDeals();
