const mongoose = require('mongoose');
const validator = require('validator');

// localhost : port / database name ... it will return the promise
//connection creation 
mongoose.connect("mongodb://localhost:27017/learn", {useNewUrlParser:true , useUnifiedTopology: true})
.then(() => {
    console.log("connected");
})
.catch((err) => {
    console.log("error",err);
});

//Mongoose schema -> defines the structure of your document 
const playListSchema = mongoose.Schema({
    name : {
    type :  String,
    required : true,
    uppercase : true,
    unique : true,
    trim : true,
    minlength : [2,"Min length 2"],
    maxlength : 20
},
    ctype : {
        type : String,
        required : true,
        lowercase : true,
        enum : ["frontend","backend"]
    },
    videos : {
        type : Number,
        validate(value){
            if(value < 0){
                throw new Error("count is negative");
            }
        }
        // validate : {
        //     validator: function(value){
        //         return value.length < 0
        //     },
        //     message:"count is negative"
        // }
    },
    author : String,
    email : 
    { 
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!(validator.isEmail(value))){
                throw new Error("invalid mail")
            }
        }
    },
    active : Boolean,
    date: {
        type : Date,
        default: Date.now
    } 
})

//model is the wrapper to the mongoose schema
//model simply means how we can create our collection - when model then its a class
//first param is PlayList and second param is playListSchemna
const PlayList = new mongoose.model("PlayList",playListSchema);

//insert the document
const craeteDocument = async () => {
    try{
        const js = new PlayList({
            name : "Js",
            ctype : "backend",
            videos : 6,
            author : "hina",
            email : "hina@123",
            active : true,
        
    })
   
    const result = await PlayList.insertMany([js]);
    console.log(result);
    }catch(err){
        console.log(err);
    }
   
}
craeteDocument();
const getDocument = async () => {
    try{
        // const result = await PlayList.find({"ctype": {$nin : ["backend","database"]}})
        const result = await PlayList.find({"author":"hina"})
        .sort({"name":-1})
        .select({"name":1})
  
    console.log(result);
    }catch(err){
        console.log(err);
    }
}
// getDocument();
const updateDocument = async (id) => {
   try{
    const result = await PlayList.findByIdAndUpdate({_id : id} , {
        $set : {
            name : "Python"
        }
    },{
        new : true,
        useFindAndModify : false
    });
    console.log(result);
   }catch(err){
        console.log(err);
   }
}
// updateDocument("5facbad62b4fcf20fc63911f");

const deleteDocument = async (id) => {
    try{
        const result = await PlayList.findByIdAndDelete({_id:id});
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
//delete the document
// deleteDocument("5fabd3b6b8c57724f044f438");
// getDocument();

