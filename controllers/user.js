const User = require("../models/users");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("User:", user);
  if (!user)
    return res.render("login", {
      error: "Invalid email or password",
    });

  
 const token=  setUser( user);
  res.cookie("uid",token);
  return res.redirect("/");
};

module.exports = {
  userSignup,
  userLogin,
};


