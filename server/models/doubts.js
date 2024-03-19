const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
    // studentName:{
    //     type:String
    // },
    doubtText:{
        type:String
    },
    studentClass:{
        type:Number
    },
    subject:{
        type:String
    },
    studName:{
        type:String
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'StudentSign'
    },
    accepted:{
        type:Boolean,
        default:false,
        required:false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '24h' }, 
      },
});

module.exports = mongoose.model('Doubt', doubtSchema);