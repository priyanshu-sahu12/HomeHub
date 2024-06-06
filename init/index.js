const initData = require('./data.js')
const mongoose = require('mongoose');
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/HomeHub";
main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "66588723ac277d985869e5f5"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDb();