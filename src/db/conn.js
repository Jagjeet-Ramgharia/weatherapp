const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/userRegistration",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection succesfull")
}).catch((e)=>{
    console.log(e)
})
