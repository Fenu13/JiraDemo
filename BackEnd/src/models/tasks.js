const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const req = require('express/lib/request')

const tasksSchema = new mongoose.Schema({
    todo_tasks :{
        type : String,
        
        
    },
    processing_tasks :{
        type : String,
     
        
    },
    done_tasks :{
        type : String,
        
        
    },
},
{
    timestamps : true
})

const Task = mongoose.model('Task',tasksSchema)

module.exports = Task

