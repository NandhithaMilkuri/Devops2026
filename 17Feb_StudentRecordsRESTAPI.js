const express=require('express');
const app=express();
app.use(express.json());

//in-memory student data
let students=[
{id:1,name:"Ravi",department:"CSE"},
{id:2,name:"Sita",department:"ECE"}
];

//GET all students
app.get('/students',(req,res)=>{
res.status(200).json(students);
});

//GET student by ID
app.get('/students/:id',(req,res)=>{
const id=parseInt(req.params.id);
const student=students.find(s=>s.id===id);
if(!student){
return res.status(404).json({message:"Student not found"});
}
res.json(student);
});

//POST add student
app.post('/students',(req,res)=>{
const {name,department}=req.body;
if(!name||!department){
return res.status(400).json({message:"Name and Department required"});
}
const newStudent={
id:students.length?students[students.length-1].id+1:1,
name,
department
};
students.push(newStudent);
res.status(201).json({message:"Student added",student:newStudent});
});

//PUT update student
app.put('/students/:id',(req,res)=>{
const id=parseInt(req.params.id);
const student=students.find(s=>s.id===id);
if(!student){
return res.status(404).json({message:"Student not found"});
}
const {name,department}=req.body;
if(name)student.name=name;
if(department)student.department=department;
res.json({message:"Student updated",student});
});

//DELETE student
app.delete('/students/:id',(req,res)=>{
const id=parseInt(req.params.id);
const index=students.findIndex(s=>s.id===id);
if(index===-1){
return res.status(404).json({message:"Student not found"});
}
students.splice(index,1);
res.json({message:"Student deleted"});
});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});