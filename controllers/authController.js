import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const handleErrors = (err) => {
  console.log(err.message, err.code);
};

const maxAge = 3 * 24 * 60 * 60; /* three days */

const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

const authController = {
  signupGET: (req, res) => {
    res.render("signup");
  },
  signupPOST: async (req, res) => {
    const { email, password } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ email, password: newPassword });
      const token = createToken(user.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user.id });
    } catch (error) {
      handleErrors(error);
      res.status(400).send(`Error, user not created: ${error.message}`);
    }
  },
  loginGET: (req, res) => {
    res.render("login");
  },
  loginPOST: (req, res) => {
    console.log(req.body);
    res.send("User login");
  },
};

export default authController;
