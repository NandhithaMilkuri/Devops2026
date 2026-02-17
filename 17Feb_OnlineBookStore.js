const express=require('express');
const app=express();
app.use(express.json());

let books=[
{id:1,title:"Java Basics",author:"Nandhitha",price:500},
{id:2,title:"Python Guide",author:"Arun",price:450}
];

//GET all books
app.get('/books',(req,res)=>{
res.status(200).json(books);
});

//POST add book
app.post('/books',(req,res)=>{
const {title,author,price}=req.body;
if(!title||!author||!price){
return res.status(400).json({message:"All fields are required"});
}
const newBook={id:books.length?books[books.length-1].id+1:1,title,author,price};
books.push(newBook);
res.status(201).json({message:"Book added",book:newBook});
});

//PUT update book
app.put('/books/:id',(req,res)=>{
const id=parseInt(req.params.id);
const book=books.find(b=>b.id===id);
if(!book){
return res.status(404).json({message:"Book not found"});
}
const {title,author,price}=req.body;
if(title)book.title=title;
if(author)book.author=author;
if(price)book.price=price;
res.status(200).json({message:"Book updated",book});
});

//DELETE book
app.delete('/books/:id',(req,res)=>{
const id=parseInt(req.params.id);
const index=books.findIndex(b=>b.id===id);
if(index===-1){
return res.status(404).json({message:"Book not found"});
}
books.splice(index,1);
res.status(200).json({message:"Book deleted"});
});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});