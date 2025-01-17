import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Función para manejar errores de Sequelize
const handleSequelizeError = (err) => {
  console.log(err.message, err.name);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }
  // incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    // unique email
    if (err.fields.email) {
      errors.email = "That email is already registered";
    }
  } else if (err.name === "SequelizeValidationError") {
    err.errors.forEach((error) => {
      console.log(error);
      if (error.path === "email") {
        errors.email = error.message;
      }
      if (error.path === "password") {
        errors.password = error.message;
      }
    });
  }

  return errors;
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
    try {
      const user = await User.create({ email, password });
      const token = createToken(user.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user.id });
    } catch (error) {
      const errors = handleSequelizeError(error);
      res.status(400).json({ errors });
    }
  },
  loginGET: (req, res) => {
    res.render("login");
  },
  loginPOST: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user.id });
    } catch (error) {
      const errors = handleSequelizeError(error);
      res.status(400).json({ errors });
    }
  },
  logoutGET: (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  },
};

export default authController;
