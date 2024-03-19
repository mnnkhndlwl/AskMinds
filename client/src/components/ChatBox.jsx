import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios'
import teacher from "../Icons/message.png"
import { useDemoContext } from '../contexts/DemoContext';
import back from "../Icons/back.png";
const ChatBox = ({selectName,onBack}) => {
    const { teacherId , studentId} = useParams();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
  // const room = studentId + "-" + randomSuffix;
  const room = studentId
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [messageSent, setMessageSent] = useState("");
  const [studentName , setStudentName] = useState('')
  
  const [fullMessage, setFullMessage] = useState([]);
  const [fullMessage2, setFullMessage2] = useState([]);

  const {name}  = useDemoContext();

  const getFullMsg = async()=>{
    try{
      const url = `http://localhost:3000/chat-messages/${teacherId}/${studentId}`;
    const response = await axios.get(url);
    const data = response.data;
    setFullMessage(data);
    }
    catch(err){
      console.log(err);
    }
    
  }
  const getFullMsg2 = async()=>{
    try{
      const url = `http://localhost:3000/chat-messages/${studentId}/${teacherId}`;
    const response = await axios.get(url);
    const data = response.data;
    setFullMessage2(data);
    }
    catch(err){
      console.log(err);
    }
    
  }
  const handleClickBack = ()=>{
    onBack();
  }
  

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); 
    setSocket(newSocket);
    newSocket.emit("join_room", room);
    newSocket.emit('get_sender_messages', studentId, teacherId, (messages) => {
      console.log('Received sender messages:', messages);
      // setMessageReceived((prev)=>[...prev,messages]);
    });
    newSocket.on("receive_message", (data) => {
      const message = data.message
      setStudentName(data.name)
      const studName = data.name
      console.log("student name", studName);
      setMessageReceived((prevMessages) => [...prevMessages, { message, type: 'received' }]);
    });
    console.log("emitted");
    getFullMsg();
    getFullMsg2();
    console.log(name);
    console.log(studentId);
    // console.log("studetnt name : ",name);

    return () => {
      newSocket.disconnect();
    };
  }, [studentId]);

  const sendMessage = () => {
      socket.emit("send_message", { message, room , senderId :teacherId , recipientId:studentId , senderName:name });
      socket.emit("teacher_joined",{message,room , teacherId , senderName:name});
      
      setMessageReceived((prevMessages)=>[...prevMessages,{message,type:'sent'}]);
      setMessage(" ");
  };
  const mergedAndSortedMessages = [...fullMessage, ...fullMessage2].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  return (
    <div>
      {studentId ? (
        <div className="h-[100vh] overflow-hidden">
          <div className=" h-[8%] flex items-center shadow-sm shadow-slate-400 p-2">
            <img
              src={back}
              className="w-[5%] ml-2 back hidden cursor-pointer"
              onClick={handleClickBack}
            />
            <div className=" flex items-center pl-3  text-2xl ml-10 font-bold">
              {selectName || studentName}
            </div>
          </div>
          <div className="h-[83%] overflow-y-auto relative ">
            <div>
              {mergedAndSortedMessages.map((msg) => (
                <div key={msg._id}>
                  <p className="w-auto ">
                    {msg.senderId === teacherId ? (
                      <div className=" flex justify-end mr-3 ">
                        <h1 className="  gap-3  my-1 bg-[#1c326c]  p-2 rounded-xl">
                          {msg.message}
                        </h1>
                      </div>
                    ) : (
                      <div className="flex ml-3 ">
                        <h1 className="bg-[#DFDFDF] p-2 rounded-xl my-1 text-black">
                          {msg.message}
                        </h1>
                      </div>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div>
              {messageReceived.map((msg, index) => (
                <div key={index}>
                  {msg.type === "received" ? (
                    <div className="flex ml-3 ">
                      <h1 className=" p-2 rounded-xl bg-[#DFDFDF] text-black my-1">
                        {msg.message}
                      </h1>
                    </div>
                  ) : (
                    <div className=" flex justify-end mr-3 ">
                      <h1 className="  gap-3  my-1 bg-[#1c326c]  p-2 rounded-xl">
                        {msg.message}
                      </h1>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-[9%] items-center justify-center relative">
            <input
              placeholder="Message..."
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              className=" p-2 rounded-2xl bg-[#080a18] text-white border-gray-700 border-2 w-[95%]"
            />
            <button onClick={sendMessage} className="ml-[-45px] text-[#5e82e6]">
              Send 
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center relative h-[100vh]">
          <img src={teacher} className="w-[30%]" />
          <h1 className="text-6xl font-semibold text-center">Chat with your Students</h1>
        </div>
      )}
    </div>
  );
}

export default ChatBox