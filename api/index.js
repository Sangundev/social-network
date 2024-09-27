const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts")



dotenv.config();


// Kết nối đến MongoDB
mongoose.connect(process.env.MONGO_URL, {
    // Không cần chỉ định useNewUrlParser và useUnifiedTopology
})
.then(() => {
    console.log("Connected to MongoDB!");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.get("/",(req,res)=>{
//     res.send("welcom to homepage")
// })

// app.get("/user",(req,res)=>{
//     res.send("welcom to userpage")
// })
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(8800,()=>{
    console.log("Backend sever is running!")
})