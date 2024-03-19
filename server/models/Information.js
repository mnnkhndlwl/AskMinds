const mongoose = require('mongoose') 
const infoSchema = new mongoose.Schema({
  myId: String,
  checked:{
    type:Boolean,
    // required:false,
    default:false
  },
  info: [
    {
      senderId: String,
      senderName: String,
    },
  ],
});

module.exports = mongoose.model('Info',infoSchema);