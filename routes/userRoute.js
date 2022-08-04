const express = require("express");
const userModel = require('../models/userModel')
const router = express.Router()

router.post("/register", async(req, res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.send('User Register Successfully')
    } catch (error) {
        res.status(400).json(error)
    }
})  

router.post("/login", async(req, res) => {
    try {
        const user =  await userModel.findOne({userId: req.body.userId, password: req.body.password,})
        res.send(user)
    } catch (error) {
        res.status(400).json(error)
    }
})
module.exports = router