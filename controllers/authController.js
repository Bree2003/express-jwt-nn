const authController = {
  signupGET: (req, res) => {
    res.render("signup");
  },
  signupPOST: (req, res) => {
    res.send("new signup");
  },
  loginGET: (req, res) => {
    res.render("login");
  },
  loginPOST: (req, res) => {
    res.send("user login");
  },
};

export default authController;
