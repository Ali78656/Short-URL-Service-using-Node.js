const Url = require("../models/url");

const generateNewUrl = async (req, res) => {
  // ✅ Dynamically import nanoid inside the async function
  const { nanoid } = await import("nanoid");

  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: " URL is required" });
  }

   
  
  const shortID = nanoid(8);
  await Url.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id, 
  });

  return res.render("home", {
    Id: shortID,
  });
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId: shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  generateNewUrl,
  getAnalytics,
};
