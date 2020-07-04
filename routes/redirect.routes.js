const {Router} = require("express");
const linkModel = require("../Models/Link");
const router = Router();

router.get("/:code", async (req, res) => {
    try {
        const link = await linkModel.findOne({code: req.params.code});
        if (link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.from)
        }

    } catch (e) {
        res.status(500).json({message: "Try again"})
    }
})

module.exports = router;