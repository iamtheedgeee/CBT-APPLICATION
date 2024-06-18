const mongoose= require('mongoose')

const connect_db= async(uri)=>{
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
}

module.exports=connect_db

