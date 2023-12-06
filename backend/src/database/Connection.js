const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect(process.env.MONGO_LOCAL_URL);
    console.log("base de donnée connectée");
}

module.exports = connectDB;