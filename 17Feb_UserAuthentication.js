const express=require('express');
const app=express();
app.use(express.json());

//in-memory users
let users=[];
let loggedIn=false; //simulate login session

//middleware for authentication
function authMiddleware(req,res,next){
if(!loggedIn){
return res.status(401).json({message:"Access denied. Please login first"});
}
next();
}

//register route
app.post('/register',(req,res)=>{
const {username,password}=req.body;
if(!username||!password){
return res.status(400).json({message:"Username and password required"});
}

//conceptual hashing (simple example)
const hashedPassword="hashed_"+password;

users.push({username,password:hashedPassword});
res.status(201).json({message:"User registered successfully"});
});

//login route
app.post('/login',(req,res)=>{
const {username,password}=req.body;
const hashedPassword="hashed_"+password;

const user=users.find(u=>u.username===username&&u.password===hashedPassword);

if(!user){
return res.status(401).json({message:"Invalid username or password"});
}

loggedIn=true;
res.json({message:"Login successful"});
});

//protected route
app.get('/dashboard',authMiddleware,(req,res)=>{
res.json({message:"Welcome to dashboard"});
});

//server
app.listen(3000,()=>{
console.log("Server running on port 3000");
});