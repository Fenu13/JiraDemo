const express = require('express')
const router = new express.Router()
const Task = require('../models/tasks')
const auth = require('../middleware/auth')

router.post('/tasks',auth, async (req, res) =>  {
 
    const tasks = new Task(req.body)

    try{
        await tasks.save()
        res.status(201).send(tasks)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tasks',async(req,res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router