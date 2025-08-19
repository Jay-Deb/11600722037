const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/urls", urlRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/urlshortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB Connected"))
.catch(err => console.log(" MongoDB Error:", err));
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


