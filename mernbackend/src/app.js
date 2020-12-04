const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
require('./db/conn')
const Register = require("./models/register")
const port = process.env.PORT || 3000
const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine","hbs")
app.set("views",template_path)
app.use(express.static(static_path))
hbs.registerPartials(partial_path)

app.get("/",(req,res) => {
    res.render("index")
})
app.get("/register",(Req,res) => {
    res.render("register")
})
app.get("/login",(Req,res) => {
    res.render("login")
})
app.get("/forgot",(Req,res) => {
    res.render("forgot")
})
app.post("/forgot",async(req,res) => {
    try{
        const email = req.body.email
        const pass = req.body.password
        const confirmpass = req.body.confirmpass
        if(pass === confirmpass){
            const result = await Register.update({
                email : email
            },{
                $set :{
                    password : pass,
                    confirmpass : confirmpass
                }
                
            })
            res.redirect("login")
        }else{
            res.send("pasword not match")
        }

    }catch(err){
        res.send(err)
    }
})
app.post("/login",async(req,res) => {
    try{
        const email = req.body.email
        const pass = req.body.password
        const result = await Register.find({
            email : email,
            password : pass
        })
        console.log(result);
        if(!result.length == 0){
            res.redirect("/")
        }else{
            res.send("invalid user name or password")
        }
    }catch(err){
        res.render(err)
    }   
})

app.post("/register",async(req,res) => {
    try{
        const password = req.body.password
        const cpassword = req.body.confirmpass
        if(password === cpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password: req.body.password,
                confirmpass : req.body.confirmpass
                
            })
            const result = await registerEmployee.save()
            res.status(200).render("index")

        }else{
            res.send("password not match")
        }

    }catch(err){
        res.status(400).send(err)
    }
})

app.listen(port , () => {
    console.log("listen to port",port);
})