import express from "express";
import mongoose, { Schema } from "mongoose";
import server from './routes/authroutes.js';
import cors from 'cors';
import router from './routes/orderRouter.js'
import dotenv from 'dotenv';
dotenv.config()

const app = express();
app.use(express.json());
app.use('/api/auth',server)
app.use(cors());
app.use('/api', router);


const port =process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('connected to database')
})
.catch((err)=>{
    console.log(err)
})

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    createdate:{
        type:Date,
        default:Date.now,
    }

})
const User=mongoose.model('User',userSchema)
export default User;


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})