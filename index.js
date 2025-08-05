const express = require("express");
const app = express();
const Port = 8001;
const path = require("path");
const urlRoute = require("./routes/url");
const { connectDB } = require("./connect");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookierParser = require('cookie-parser');
const { restrictToLoggedInUserOnly, checkAuth} = require("./middlewares/auth");
// const Url = require("./models/url");

connectDB("mongodb://localhost:27017/shortUrl")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookierParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/url", require("./routes/url")); //add this  new after error
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

// app.get("/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await Url.findOneAndUpdate(
//     { shortId: shortId },
//     { $push: { visitHistory: { timestamp: Date.now() } } }
//   );
//   res.redirect(entry.redirectURL);
// });

app.listen(Port, () => console.log(`Server Stated at port :${Port}`));
