const express=require("express");
const path=require("path");
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

let user=null;

// first page = register
app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"public","register.html"));
});

app.post("/register",(req,res)=>{
user={
name:req.body.name,
password:req.body.password
};
res.redirect("/login.html");
});

app.post("/login",(req,res)=>{
const name=req.body.name;
const password=req.body.password;

if(!user || name!==user.name || password!==user.password){
res.send(`<h2>Please register first</h2>
<a href="/register.html">Register</a>`);
}else{
res.redirect("/index.html");
}
});

app.listen(3000,()=>console.log("Server running"));