const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.write("<h1>Welcome to Home PAge.......</h1>");
    res.write("<h1>Welcome to Home PAge.......</h1>");
    res.send();
});

app.get('/about',(req,res) => {
    res.send("Welcome to About Us  PAge.......");
});

app.get('/temp',(req,res) => {
    res.send([{
        id:1,
        name : "hina",
    },
    {
        id:1,
        name : "hina",
    },
    {
        id:1,
        name : "hina",
    }
]);
});

//express.static -- middleware use to do whatever is done in between res and req

app.get('/contact',(req,res) => {
    res.send("Welcome to Contact Uss PAge.......");
});

app.listen(3000 , () => {
    console.log("Listining.........");
});
