const express = require('express');
// const app = express();
const mongoose=require('mongoose');
const User = require("./modles/users")
const bodyParser = require('body-parser');
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
const cors=require('cors');


const app = express();
// const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());

// app.post('/user', bodyParser.json(), async (req, res) => {
  
  
//   try {
//     const {name,email,password,contact}=req.body;

    

    
    

//     const userexist = User.findOne({ email:email})
//     if(userexist){
//         res.json("exist")
//     }
//     else{
//       const newuser = new User({
//         name,
//         email,
//         password,
//         contact
//       });
//       await newuser.save();
//       res.json("notexist");
//     }
//     //  const newuser = new User({
//     //   name,
//     //   email,
//     //   password,
//     //   contact
//     // });
//     // await newuser.save();
//     // return res.status(201).json("new user created ");
//   } catch (err) {
//     console.log(err);
//     return res.json("server error ");
//   }
// });
app.post("/user", bodyParser.json(),async(req,res)=>{
  const{name,email,password,contact}=req.body

  const data={
    name:name,
      email:email,
      password:password,
     
      contact:contact
  }

  try{
      const check=await User.findOne({email:email})

      if(check){
          res.json("exist")
      }
      else{
         
          // await User.save([data])
           const newuser = new User({
      name,
      email,
      password,
      contact
    });
    await newuser.save();
    res.json("notexist")
      }

  }
  catch(e){
      res.json("fail")
  }

})
const connectDB= async()=>{
    try {
        await mongoose.connect("mongodb+srv://anubhavkhare:anubhav%40123@cluster0.y1uhuh8.mongodb.net/demo");
        console.log("MONGO CONNECTED");
    } catch (error) {
        console.log(error)
        // process.exit(1)
    }
}
 app.listen(3001,()=>{
    connectDB();
    console.log(`server in runing  at port `)
 })