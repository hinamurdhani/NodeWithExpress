const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/Registration", {
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    
}).then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
})