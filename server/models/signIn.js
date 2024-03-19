const mongoose = require('mongoose');

const TeachersignSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        default:null,
        required:false
    },
    classs:{
        type:Number,
        default:null,
        required:false

    }
});

module.exports = mongoose.model('TeacherSign', TeachersignSchema);