import User from "../models/User.js";
const handleErrors = (err) => {
  console.log(err.message, err.code);
};
//

const authController = {
  signupGET: (req, res) => {
    res.render("signupjaa");
  },
  signupPOST: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });
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
