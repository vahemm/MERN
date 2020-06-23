const linkModel = require("../Models/Link");
const {Router} = require("express");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortID = require("shortid")

const router = Router();

router.post("/generate", auth, async (req, res) => {
    try {
        const baseURL = config.get("baseURL");
        const {from} = req.body;
        const code = shortID.generate();

        const to = baseURL + "/t/" + code;
        const existing = await linkModel.findOne({from});

        if (existing){
            return res.json({link:existing})
        };

        const link = new linkModel({
            code, to, from, owner: req.user.userID
        });

        await link.save();
        res.status(201).json({link})

    } catch (e) {
        res.status(500).json({message: "Try again"})
    }
});
router.get("/", auth, async (req, res) => {
    try {
        const links = await linkModel.find({owner: req.user.userID});
        res.json(links)
    } catch (e) {
        res.status(500).json({message: "Try again"})
    }
})

router.get("/:id", auth, async (req, res) => {
    try {
        const link = await linkModel.findById(req.params.id);
        res.json(link)
    } catch (e) {
        res.status(500).json({message: "Try again"})
    }
})


module.exports = router;
