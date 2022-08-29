const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');

function logErrors(err,req,res,next){
  console.error(err);
  next(err);
}

function errorHandlers(err,req,res,next){
  res.status(500).json({
     message: err.message,
     stack: err.stack,
  });
}

function boomerrorHandlers(err,req,res,next){

   if (err.isBoom){
     const {output}= err;
     res.status(output.statusCode).json(output.payload);
   }

  next(err);
}

function ormerrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}


module.exports={ logErrors, errorHandlers,boomerrorHandlers,ormerrorHandler }
