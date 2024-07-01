import express from "express";
import { Sequelize } from "sequelize";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection
const sequelize = new Sequelize("example", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("connection established");
} catch (error) {
  console.log(error);
}

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

app.listen(3000);
