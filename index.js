import express from "express";
import mongoose, { Schema } from "mongoose";
import server from './routes/authroutes.js';
import cors from 'cors';
import router from './routes/orderRouter.js'

const app = express();
app.use(express.json());
app.use('/api/auth',server)
app.use(cors());
app.use('/api', router);


mongoose.connect('mongodb+srv://ms9218764:mayank123@cluster0.fivajcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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


app.listen(3000,()=>{
    console.log(`server is running on port 3000`)
})
