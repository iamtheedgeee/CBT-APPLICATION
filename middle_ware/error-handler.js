const CustomAPIError=require('../errors/custom-api-error')
const mongoose=require('mongoose')
const {StatusCodes}=require('http-status-codes')

const errorHandlerMiddleware = (err,req,res,next) => {
    if (err instanceof CustomAPIError) {
      return res.status(err.status_code).json({ msg: err.message })
    }
    else if(err instanceof mongoose.Error.ValidationError){
      for(let field in err.errors){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:err.errors[field].message})
      }
    }
    else if(err.name==="MongoError" && err.code==11000){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"Index Violation"})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
  
  module.exports = errorHandlerMiddleware
  