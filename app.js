const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
const PORT = config.get("port") || 5000;

async function startDB() {
    try {
        await mongoose.connect(config.get("mongoURI"),
            {
                useNewUrlParser: true,
                useUnifiedTopology:true,
                useCreateIndex:true
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
