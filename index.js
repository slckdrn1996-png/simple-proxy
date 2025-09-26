const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("URL parametresi gerekli. Örn: /proxy?url=https://bdolytics.com/tr/MENA/db/item/55417");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html"
      }
    });
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Hata: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy çalışıyor: http://localhost:${PORT}`);
});
