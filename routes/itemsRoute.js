const express = require("express");
const itemModel = require('../models/itemsModel')
const router = express.Router()

router.get("/get-all-items", async(req, res) => {
    try {
        const items = await itemModel.find()
        res.send(items)
    } catch (error) {
        res.status(400).json(error)
    }
})  

router.post("/add-item", async(req, res) => {
    try {
        const newItem = new itemModel(req.body)
        await newItem.save()
        res.send('Item Added Successfully')
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
})

router.post("/edit-item", async(req, res) => {
    try {
        await itemModel.findOneAndUpdate({_id: req.body.itemId}, req.body)
        res.send('Item Updated Successfully')
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
})

router.post("/delete-item", async(req, res) => {
    try {
        await itemModel.findOneAndDelete({_id: req.body.itemId})
        res.send('Item Deleted Successfully')
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
})



module.exports = router