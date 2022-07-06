const express = require('express');
const faker= require('faker');
const Faker = require('faker/lib');
const router= express.Router();

router.get('/:catid/products/:producid',(req,res) => {
  const { catid,producid }= req.params
  res.json({
     catid,
      producid,

    })
  });

  module.exports= router;
