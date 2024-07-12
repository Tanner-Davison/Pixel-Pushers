const express = require('express');
const pythonRouter = express.Router();

const exampleData = {
    name: 'John Doe',
    age: 30,
    occupation: 'Software Engineer'
  };

  pythonRouter.get('/data-py', (req, res) => {
    res.status(200).json(exampleData); 
    console.log('python request was made')
  });

  module.exports= pythonRouter