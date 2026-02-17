const express=require('express');
const app=express();
app.use(express.json());

//middleware to log request method and url
app.use((req,res,next)=>{
console.log(`${req.method} ${req.url}`);
next();
});

//sample student data
const students=[
{id:1,name:"Arun",course:"BTech",year:3},
{id:2,name:"Nandhitha",course:"BSc",year:2},
{id:3,name:"Anshu",course:"BCA",year:1}
];

//home route
app.get('/',(req,res)=>{
res.json({message:"Welcome to Student Information Management System"});
});

//all students
app.get('/students',(req,res)=>{
res.json(students);
});

//student by id
app.get('/students/:id',(req,res)=>{
const id=parseInt(req.params.id);
const student=students.find(s=>s.id===id);
if(!student){
return res.status(404).json({message:"Invalid student ID"});
}
res.json(student);
});

//server
app.listen(3000,()=>{
console.log("Server running on port 3000");
});