const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname,'../public');
const templatesPath = path.join(__dirname,'../templates/views');
const partial_path = path.join(__dirname,'../templates/partials');
console.log(staticPath);
app.set("view engine",'hbs');
app.set('views',templatesPath);
app.use(express.static(staticPath));
hbs.registerPartials(partial_path);
app.get('/',(req,res) => {
    res.render('index');
})
app.get('/about',(req,res) => {
    res.render('about');
})
app.get('/weather',(req,res) => {
    res.render('weather');
})
app.get('*', (req, res) => {
    res.render('404error',{
        errmsg: "Ooopss.. Page Not Found",
    });
})

app.listen(port, () => {
    console.log(`listinign to port ${port}`);
});