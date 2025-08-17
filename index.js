import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// ✅ ده الـ VERIFY TOKEN اللي هتكتبه وانت بتظبط Webhook في Meta
const VERIFY_TOKEN = "my_verify_token";

// ✅ Route للتحقق من Webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED ✅");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// ✅ Route لاستقبال رسائل واتساب
app.post("/webhook", (req, res) => {
  let body = req.body;

  console.log("📩 رسالة جديدة:", JSON.stringify(body, null, 2));

  // دايمًا لازم تبعت 200 عشان واتساب مايعيدش الطلب
  res.sendStatus(200);
});

// ✅ شغل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 السيرفر شغال على البورت ${PORT}`));
