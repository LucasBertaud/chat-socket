const mongoose = require("mongoose");

const Connection = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("base de donnée connectée");
}

module.exports = Connection;