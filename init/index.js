const { default: mongoose } = require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
// const MONGO_URL=process.env.ATLASDB_URL

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("connected to db");
    await initDB();
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj, owner: "67c1e7d2e45a3c348dc6fd85" }));
        await Listing.insertMany(initData.data);
        console.log("Database was initialized with sample data.");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
};

main().catch((err) => {
    console.log("NO connection", err);
});

// async function main() {
//     await mongoose.connect(MONGO_URL);  
// }
// main().then(()=>{
//     console.log("connected to db");
// }).catch((err)=>
//     {
//     console.log("NO connection",err);
// });

// // const initDB= async () =>{
// //     await Listing.deleteMany({});
// //     await Listing.insertMany(initData.data);
// //     console.log("data was initialized");
// // };
// // initDB();

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data=initData.data.map((obj) => ({...obj, owner: "67c1e7d2e45a3c348dc6fd85"}));
//     await Listing.insertMany(initData.data);
//     console.log("Database was initialized with sample data.");
    
// };
// initDB();
