require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require('./route/userRoute');
const bcrypt = require('bcrypt');


const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST; 

app.use(cors())
app.use(express.json()); 
app.use('/api/v1', userRoute);

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}
main().then(() => console.log(`Database Connected`));
main().catch((err) => console.error(err));

app.listen(PORT, HOST, () => {
    console.log(`[ready] http://${HOST}:${PORT}`);
});
