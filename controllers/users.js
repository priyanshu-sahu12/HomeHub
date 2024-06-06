const User = require("../models/user.js");

module.exports.showSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupUser = async (req, res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registedUser = await User.register(newUser, password);
        console.log(registedUser);
        req.login( registedUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to HomeHub ! You are successfully Logged in");
            res.redirect("/listings");
        });
  
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};

module.exports.showLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) =>{
    req.flash("success", "Welcome to HomeHub ! You are successfully Logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logOutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged You out!");
        res.redirect("/listings");
    });
};