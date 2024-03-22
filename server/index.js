const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const TeachSign = require('./models/signIn')
const StudentSign = require('./models/signStud');
const Information = require('./models/Information')
const Chat = require('./models/Chat');
const path = require("path");

const app = express();

require('dotenv').config();

app.use(cors());

const server = http.createServer(app);
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  },
});
const db = process.env.DB
app.use(bodyParser.json());

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const { rmSync } = require('fs');


// Import routes
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

// Use routes
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname1, "../client/dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on('teacher_joined',(data)=>{
    socket.to(data.room).emit('teach_joined',data);
  })

  socket.on("send_message", async (data) => {
    socket.to(data.room).emit("receive_message", {
      senderId : data.senderId,
      message: data.message,
      name:data.name
    });
    await Chat.findOneAndUpdate(
      {
        senderId: data.senderId,
        recipientId: data.recipientId,
        senderName: data.name
      },
      {
        $push: {
          messages: {
            senderId: data.senderId,
            message: data.message,
            accepted:true
          },
        },
      },
      { upsert: true }
    );
    // Function to get messages for a specific sender
    socket.on('get_sender_messages', async (senderId, recipientId, callback) => {
      try {
        console.log(senderId,recipientId);
        const chat = await Chat.findOne({
          senderId,
          recipientId,
        });
        const senderMessages = chat ? chat.messages.map(e=>e.message) : [];
        callback(senderMessages);
      } catch (error) {
        console.error('Error retrieving sender messages:', error);
        throw error;
      }
    });

   
  });

});

// {socket ends}

// retrieve messages
app.get('/chat-messages/:senderId/:receiverId', async (req, res) => {
  try {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;

    console.log(senderId, receiverId);

    const chatMsg = await Chat.findOne({ senderId, recipientId: receiverId });

    if (!chatMsg) {
      return res.status(404).json({ message: "Messages not found" });
    }
    const messages = chatMsg.messages.sort((a, b) => a.timestamp - b.timestamp);

    return res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// retrieve past conversations
app.get('/get-chats/:id',async (req,res)=>{
  try{
    const id = req.params.id;

    const updatedChats = await Chat.updateMany(
      { $set : {senderId: id} },
      { $set: { accepted: true } }
    );
    const info = await Chat.find({senderId:id});
    if(!info){
      return res.status(400).json({message: "information not found"});
    }
    return res.json(info);
  }
  catch(err){
    console.log(err);
  }
})

// get name and subject from id
app.get('/get-name/:userId',async(req,res)=>{
  try{
    const id = req.params.userId;
    const result = await TeachSign.findById(id);
    const result1 = await StudentSign.findById(id)
    if(!result && !result1) return res.status(400).json({message:"id not found"});
    else if(result) return res.json({firstName:result.firstName , lastName : result.lastName });
    else return res.json({firstName:result1.firstName , lastName : result1.lastName });
  }
  catch(err){
    console.log(err);
  }
})

// post information (name,id)
app.post('/info-post',async(req,res)=>{
  try{
    const {myId,senderId,senderName} = req.body;
    let newInfo = await Information.findOne({myId:myId});
    if(!newInfo){
      newInfo = new Information({myId,info:[]});
    }
    if(!newInfo.checked){
      newInfo.info.push({senderId,senderName,checked:true})
    const update = await newInfo.save();
    res.status(200).json(update,{senderId,senderName})
    }
    
  }
  catch(err){
    console.log(err);
  }
})

// get information(name,id)
app.get('/info-get/:myId',async(req,res)=>{
  try{
    const myId = req.params;
    const getInfo = await Information.findOne(myId);
    if(!getInfo){
      return res.status(400).json({message:"id not found"})
    }
      return res.status(200).json(getInfo);
      
  }
  catch(err){
    console.log(err);
  }
})