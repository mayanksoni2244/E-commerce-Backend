import e from "express";
import cors from 'cors';
import bcrypt from 'bcrypt'
import User from "../index.js";



const server=e();
server.use(e.json())
server.use(e.urlencoded({extended:true}))
server.use(cors())



server.post("/Reg",async(req,res)=>{
    try{
        const {username,email,password,createdate}=req.body;
        const exist=await User.findOne({email})
        console.log('exist',exist);
        
        if(exist){
           return res.status(400).json({message:'Email already exist',success:false})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const NUser=new User({
            username,
            email,
            createdate,
            password:hashedPassword,
        })
        await NUser.save()
        res.status(201).json({message:"registered",success:true})
        console.log('registered succesfully')
    }
    catch(err){
        console.log('error in register')
        res.status(500).json({message:'something went wrong',success:false})
    }
})

server.post('/login',async(req,res)=>{
   try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:'Email not found',success:false})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:'Invalid password',success:false})
    }
    return res.status(200).json({message:'logged in succesfully',success:true,user:{username:user.username,email:user.email}})
   }
   catch(err){
    console.log('error in login')
   }
})


export default server