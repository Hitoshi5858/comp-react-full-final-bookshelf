const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  review:{
    type:String,
    required:'n/a'
  },
  pages:{
    type:String,
    required:'n/a'
  },
  rating:{
    type:Number,
    required:true,
    min:1,
    max:5
  },
  price:{
    type:String,
    required:'n/a'
  },
  ownerId:{
    type:String,
    required:true
  }
}, {timestamps:true})

const Book = mongoose.model('Book',bookSchema);

module.exports = { Book };