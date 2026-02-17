const express=require('express');
const app=express();
app.use(express.json());

//middleware to log request details
app.use((req,res,next)=>{
console.log(`${req.method} ${req.url}`);
next();
});

//employee data (in-memory)
let employees=[
{id:1,name:"Arun",designation:"Developer",salary:40000},
{id:2,name:"Nandhitha",designation:"Tester",salary:35000}
];

//GET all employees
app.get('/employees',(req,res)=>{
res.json(employees);
});

//GET employee by id
app.get('/employees/:id',(req,res,next)=>{
const id=parseInt(req.params.id);
const employee=employees.find(e=>e.id===id);
if(!employee){
return next({status:404,message:"Employee not found"});
}
res.json(employee);
});

//POST add employee
app.post('/employees',(req,res)=>{
const {name,designation,salary}=req.body;
if(!name||!designation||!salary){
return res.status(400).json({message:"All fields required"});
}
const newEmployee={
id:employees.length?employees[employees.length-1].id+1:1,
name,designation,salary
};
employees.push(newEmployee);
res.status(201).json({message:"Employee added",employee:newEmployee});
});

//PUT update employee
app.put('/employees/:id',(req,res,next)=>{
const id=parseInt(req.params.id);
const employee=employees.find(e=>e.id===id);
if(!employee){
return next({status:404,message:"Employee not found"});
}
const {name,designation,salary}=req.body;
if(name)employee.name=name;
if(designation)employee.designation=designation;
if(salary)employee.salary=salary;
res.json({message:"Employee updated",employee});
});

//DELETE employee
app.delete('/employees/:id',(req,res,next)=>{
const id=parseInt(req.params.id);
const index=employees.findIndex(e=>e.id===id);
if(index===-1){
return next({status:404,message:"Employee not found"});
}
employees.splice(index,1);
res.json({message:"Employee deleted"});
});

//error handling middleware
app.use((err,req,res,next)=>{
res.status(err.status||500).json({message:err.message||"Server error"});
});

//server
app.listen(3000,()=>{
console.log("Server running on port 3000");
});