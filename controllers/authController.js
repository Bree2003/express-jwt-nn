import User from "../models/User.js";
import bcrypt from "bcrypt";

const handleErrors = (err) => {
  console.log(err.message, err.code);
};
//

const authController = {
  signupGET: (req, res) => {
    res.render("signup");
  },
  signupPOST: async (req, res) => {
    const { email, password } = req.body;
    // geneeración de salt para la contraseña
    const newPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ email, password: newPassword });
      res.status(201).json(user);
    } catch (error) {
      handleErrors(error);
      res.status(400).send("error, user nor created");
    }
  },
  loginGET: (req, res) => {
    res.render("login");
  },
  loginPOST: (req, res) => {
    console.log(req.body);
    res.send("user login");
  },
};

export default authController;
