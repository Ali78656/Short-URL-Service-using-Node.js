const express = require("express");
const router = express.Router();
const { generateNewUrl, getAnalytics } = require("../controllers/url");
const Url = require("../models/url");
router.post("/", generateNewUrl);

router.get("/analytics/:shortId", getAnalytics);

//  Chatgpt
router.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await Url.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  // res.redirect(entry.redirectURL);  //old code
  res.redirect(
    entry.redirectURL.startsWith("http")
      ? entry.redirectURL
      : `https://${entry.redirectURL}`
  );
});

// ✅ Authenticated routes
router.post("/", generateNewUrl); // new code after error
router.get("/analytics/:shortId", getAnalytics); // new code after error

// Route to clear visit history for a short URL
router.post('/:shortId/clear-history', async (req, res) => {
  const shortId = req.params.shortId;
  await Url.updateOne({ shortId }, { $set: { visitHistory: [] } });
  res.redirect("/");
});

module.exports = router;
