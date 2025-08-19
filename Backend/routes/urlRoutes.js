import express from "express";
import shortid from "shortid";
import Url from "../models/Url.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:5000/${shortCode}`;

    const newUrl = new Url({ longUrl: url, shortCode, shortUrl });
    await newUrl.save();

    res.json({ shortUrl });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
