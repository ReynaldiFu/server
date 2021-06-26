const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
 res.send("Works");
});

mongoose.connect(
    process.env.DB,
    {
        useNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify:true,
        useUnifiedTopology:true
    },
    (err) => {
    if (err) return console.log(err);
    console.log("MONGODB: Default Connection Established")
    }
);

const userRouter = require("./routers/user.router");
const productRouter = require("./routers/product.router");
const customerRouter = require("./routers/customer.router");
const orderRouter = require("./routers/order.router");
app.use(userRouter,productRouter,customerRouter,orderRouter);

