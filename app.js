const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const authRout = require("./routes/auth.rout");
const linkRout = require("./routes/link.rout");
const redirectRout = require("./routes/redirect.routes");
const path = require("path");

const app = express();
const PORT = config.get("port") || 5000;

app.use(express.json({extended: true}))
app.use("/api/auth", authRout);
app.use("/api/link", linkRout);
app.use("/t", redirectRout);

if (process.env.NODE_ENV === "protuction") {

    app.use("/", express.static(path.join(__dirname, "client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "Build", "index.html"))
    })
}

async function startDB() {
    try {
        await mongoose.connect(config.get("mongoURI"),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });

        app.listen(PORT, () => {
            console.log(`Server run on port ${PORT}`)
        })
    } catch (e) {
        console.log("DB error " + e.message);
        process.exit(1);
    }
}

startDB();
