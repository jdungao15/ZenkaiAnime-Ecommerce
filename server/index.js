const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const apicache = require("apicache");
let cache = apicache.middleware;

app.use(express.json());

app.use(
  cors({
    origin: "https://zenkai-anime.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const animeRoutes = require("./routes/anime");

// Apply caching only to animeRoutes
animeRoutes.use(cache("10 minutes"));

// Use routes
app.use("/", animeRoutes);
app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
