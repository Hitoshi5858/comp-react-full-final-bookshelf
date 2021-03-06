const express = require('express');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

const { User } = require('./models/user');
const { Book } = require('./models/book');

app.use(bodyParse.json());
app.use(cookieParser());


//GET
app.get('/api/getBook',(req,res)=>{
  let id = req.query.id;
  
  Book.findById(id,(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.send(doc);
  })
})

app.get('/api/books',(req,res)=>{
  //localhost:3001/api/books?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  //ORder = asc || desc
  Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
    if(err) return res.status(400).send(err);
    res.send(doc);    
  })

})



//POST
app.post('/api/book', (req,res)=>{
  const book = new Book(req.body)

  book.save((err,doc)=>{
    if(err) return res.status(400).send(err);
    res.status(200).json({
      post:true,
      bookId: doc._id
    })
  })
})


//UPDATE

//DELETE

const port = process.env.PORT || 3001;
app.listen(port,()=>{
  console.log(`SERVER Running`);
  
})

