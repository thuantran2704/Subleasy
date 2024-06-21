const mongoose = require("mongoose");

const dbConnect = () => {
    const connectionParams = {useNewUrlParser: true};
    mongoose.connect(process.env.MONGO_URL, connectionParams);
    
    mongoose.connection.on('connected', () => {
        console.log('connected to db');
    });
    mongoose.connection.on("error", (err) => {
        console.log(`Mongoose default connection has occured ${err} error`);
    });
    
    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose default connection is disconnected");
    });
}
//placeholder

module.exports = dbConnect;