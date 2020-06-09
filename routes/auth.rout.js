const {Router} = require("express");
const router = Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

router.post("/registration", async (req, res) => {
    try {
        const {email, password} = req.body;
        const condidat = User.findOne({email:email})
        if (condidat){
            return res.status(400).json({message:"email is repeated"})
        }
        const hashPassword = await bcrypt.hash(password,12);
        const user = new User({email, password:hashPassword});
        res.status(201).json({message:"User has created"})

    } catch (e) {
        res.status(500).json({message: "Try again"})
    }
});

router.post("/login", async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: "Try again"})
    }
})


module.exports = router;