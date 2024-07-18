import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { connection } from "./database/connection.js";
import cookieParser from "cookie-parser";
import { checkUser, requireAuth } from "./middleware/authMiddleware.js";

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

// cookies
app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");

  res.cookie("newUser", false);
  // the expires or maxAge indicate the time the cookie will be in the browser, by default is session
  // it manteins unleast you close the browser
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  }); /* a day */
  res.send("You got the cookies!!");
});
app.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});
app.listen(3000, () => {
  connection();
});
