const express=require('express');
const app=express();
app.use(express.json());

//in-memory product data
let products=[
{id:1,name:"Laptop",price:50000,quantity:10},
{id:2,name:"Mouse",price:500,quantity:50}
];

//GET all products
app.get('/products',(req,res)=>{
res.status(200).json(products);
});

//POST add product
app.post('/products',(req,res)=>{
const {id,name,price,quantity}=req.body;

//validation
if(!id||!name||!price||!quantity){
return res.status(400).json({message:"All fields required"});
}

//prevent duplicate ID
const exists=products.find(p=>p.id===id);
if(exists){
return res.status(400).json({message:"Product ID already exists"});
}

const newProduct={id,name,price,quantity};
products.push(newProduct);
res.status(201).json({message:"Product added",product:newProduct});
});

//PUT update product
app.put('/products/:id',(req,res)=>{
const id=parseInt(req.params.id);
const product=products.find(p=>p.id===id);

if(!product){
return res.status(404).json({message:"Product not found"});
}

const {name,price,quantity}=req.body;
if(name)product.name=name;
if(price)product.price=price;
if(quantity)product.quantity=quantity;

res.json({message:"Product updated",product});
});

//DELETE product
app.delete('/products/:id',(req,res)=>{
const id=parseInt(req.params.id);
const index=products.findIndex(p=>p.id===id);

if(index===-1){
return res.status(404).json({message:"Product not found"});
}

products.splice(index,1);
res.json({message:"Product deleted"});
});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});