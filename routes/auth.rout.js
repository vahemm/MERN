const {Router} = require("express");
const jwt = require("jsonwebtoken");
const config = require("config")
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const {check, validationResult} = require("express-validator");

const router = Router();
router.post(
    "/registration",
    [
        check("email", "Is not email").isEmail(),
        check("password", "Must be more than 8 simbol").isLength({min: 8})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const error = errors.array()
                const str = error.map(item => {
                    return item.msg
                });
                const errorStr = str.join(" : ")

                return res.status(400).json({
                    errors: error,
                    message: errorStr
                })
            }
            const {email, password} = req.body;
            const condidat = await User.findOne({email: email})
            if (condidat) {
                return res.status(400).json({message: "email is repeated"})
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashPassword});
            await user.save();
            res.status(201).json({message: "User has created"})

        } catch (e) {
            res.status(500).json({message: "Try again"})
        }
    });

router.post("/login",
    [
        check("email", "Is not email").normalizeEmail().isEmail(),
        check("password", "write password").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = errors.array()
                const str = error.map(item => {
                    return item.msg
                });
                const errorStr = str.join(" : ")

                return res.status(400).json({
                    errors: error,
                    message: errorStr
                })
            }

            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: "User is not found"})
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: "False password"})
            }

            const token = jwt.sign(
                {userID: user.id},
                config.get("jwtSecret"),
                {expiresIn: "1h"}
            )
            console.log(token)
            res.json({token, userID: user.id})

        } catch (e) {
            res.status(500).json({message: "Try again"})
        }
    });


module.exports = router;