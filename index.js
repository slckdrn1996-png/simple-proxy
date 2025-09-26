const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url param" });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"   // 🔥 JSON isteği olduğunu belirtiyoruz
      }
    });

    const text = await response.text();

    // JSON ise parse edip JSON olarak döndür
    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch (e) {
      // JSON değilse raw HTML döndür
      res.send(text);
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
