import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { connection } from "./database/connection.js";

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

app.listen(3000, () => {
  connection();
});
