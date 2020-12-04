const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const requests = require('requests');
//app.get(route , callback) there are some methods with app are get(),put(),post(),delete()
//get - read , post - craete data , put - update data , delete - delete data
//to set the view engine
const staticPath = path.join(__dirname,'../public');
//change the directory name to templates from views amd then set the path to that template directory
const templatePath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
app.set('views',templatePath);
app.set('view engine','hbs');
hbs.registerPartials(partialPath);



//built in middleware
// app.use(express.static(staticPath));
app.get("/", (req,res) =>{
    res.render("index", {
        myname : "Hinaaa",
    });
});


app.get('/', (req,res) => {
    res.send("Hello from express.....");
});
app.get('/about', (req,res) => {
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=d31b2f1f954605b7f41399c3058e1851`)
        .on('data', (chunk) => {
        const objdata  = JSON.parse(chunk);
        const arraydata = [objdata];
       

        console.log(`city name is ${arraydata[0].name} and temp is ${arraydata[0].main.temp}`);
        res.write(arraydata[0].name);
        // console.log(realvalue);
    })
.on('end',  (err) => {
  if (err) return console.log('connection closed due to errors', err);
  res.end();
});
});
// app.get('/about/*',(req,res) => {
//     res.render("404",{
//         errorcomment: "page not found in about us ",
//     })
// })
app.get('*',(req,res) => {
    res.render("404",{
        errorcomment: "page not found",
    })
})
app.listen(3000 , () => {
    console.log("Listinign");
});


//express.static(root , options)