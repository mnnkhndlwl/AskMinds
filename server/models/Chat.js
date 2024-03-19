const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  senderId: String,
  recipientId: String,
  senderName:{
    type: String,
    required:false
  },
  recipientName:{
    type: String,
    required:false
  },
  subject:{
    type: String,
    required:false
  },
  messages: [
    {
      senderId : String,
      message : String,
      accepted:{
        type:Boolean,
        default: false,
        required :false,
        
      },
      
      timestamp: { type: Date, default: Date.now }
    }
  ],
});

module.exports = mongoose.model('Chat', chatSchema);