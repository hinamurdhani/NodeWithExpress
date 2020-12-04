const express = require('express')
const router = new express.Router();
const MensRanking = require("../models/mens")
router.get("/", async(req,res) => {
    res.send("heloo")
})

router.post("/mens", async(req,res) => {
    try{
        const mensData = new MensRanking(req.body)
        const result = await mensData.save()
        res.status(201).send(result)
    }catch(err){
        res.status(400).send(err)
    }
   
})
router.get("/mens", async(req,res) => {
    try{
        const mensData = await MensRanking.find().sort({"ranking":1})
        res.status(201).send(mensData)
    }catch(err){
        res.status(400).send(err)
    }
   
})
router.get("/mens/:id", async(req,res) => {
    try{
        const _id = req.params.id
        const mensData = await MensRanking.findById(_id)
        res.status(201).send(mensData)
    }catch(err){
        res.status(400).send(err)
    }
   
})
router.patch("/mens/:id", async(req,res) => {
    try{
        const _id = req.params.id
        const mensData = await MensRanking.findByIdAndUpdate(_id,req.body,{
            new : true
        })
        res.status(201).send(mensData)
    }catch(err){
        res.status(400).send(err)
    }
   
})
router.delete("/mens/:id", async(req,res) => {
    try{
        const _id = req.params.id
        const mensData = await MensRanking.findByIdAndDelete(_id)
        res.status(201).send(mensData)
    }catch(err){
        res.status(400).send(err)
    }
   
})
module.exports = router
