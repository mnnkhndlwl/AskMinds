
import React, { useState, useEffect , } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Navbar from './Navbar';
import about from "../Icons/info.png"
import features from "../Icons/chat.png"
import contact from "../Icons/post.png"
import logo from "../images/logo.png"
import profile from "../Icons/about.png"
import { Link } from 'react-router-dom';
import noTeach from "../images/noTeacher.jpg"
import back from "../Icons/back.png";
import msgIcon from "../Icons/message.png"
import { useDemoContext } from '../contexts/DemoContext';

const ChatStud = () => {
  const available = sessionStorage.getItem('teacherId');
  const ids  = sessionStorage.getItem('ids')
  const studentName = sessionStorage.getItem('name')

  const navigate = useNavigate()

  const {studName} = useDemoContext();

  const { studentId } = useParams();
  const room = studentId;
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState([]);
  const [messageSent, setMessageSent] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [teacherId , setTeacherId] = useState(available || '');
  const [teachIds,setTeachIds] = useState(ids||[])
  const [fullMessage, setFullMessage] = useState([]);
  const [fullMessage2, setFullMessage2] = useState([]);
  const [teachName , setTeachName] = useState('')
  const [names , setNames] = useState([])
  const [selectName , setSelectName] = useState(teachName || '')
  const [showDiv1 , setShowDiv1] = useState(true)
  const [showDiv2 , setShowDiv2] = useState(false)
  const [uniquePairArray ,setUniquePairArray] = useState([])

  const {name} = useParams()

  const [info,setInfo] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setIsSmallScreen(window.innerWidth < 650); // Adjust the threshold as needed
    };
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

    const getChats = async ()=>{
        try{
            const url = `http://localhost:3000/get-chats/${studentId}`;
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        // onSelectStudent(data.recipientId);
        setInfo(data)
        }
        catch(err){
            console.log(err);
        }
        
    }

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

  const getIds = async()=>{
    try{
      const response = await axios.get(`http://localhost:3000/info-get/${studentId}`);
      const names = response.data.info;
        const pairs = names.map(item => [item.senderId, item.senderName]);
        const uniquePairs = new Set(pairs.map(pair => pair.join(',')));
        const uniquePairsArray = Array.from(uniquePairs).map(pairStr => pairStr.split(','));
        setUniquePairArray(uniquePairsArray)
      
    }
    catch(err){
      console.log(err);
    }
  }


  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    newSocket.emit("join_room", room);
    console.log("joined");
    newSocket.on("teach_joined", (data) => {
      setTeachIds((prev)=>[...prev,data.teacherId])
      setTeacherId(data.teacherId);
      
      // console.log(data.teacherId);
      setTeachName(data.senderName);
      // console.log("teach: ",data.senderName);
      sessionStorage.setItem('teacherId', data.teacherId);
    });
    
    newSocket.emit('get_sender_messages', teacherId,studentId , (messages) => {
      console.log('Received sender messages:', messages);
      // setMessageReceived((prev)=>[...prev,messages]);
    });
    newSocket.on("receive_message", (data) => {
      console.log(teachName);
      console.log("recieving msgs");
      // console.log(data.name);
      // setTeachName(data.name)
      const message = data.message;
      setMessageReceived((prevMessages) => [...prevMessages, {message ,type: 'received'}]);
    });
    sessionStorage.setItem('ids',teachIds);
    console.log(teacherId);
    getFullMsg();
    getFullMsg2();
    getChats();
    getIds();
    return () => {
      newSocket.disconnect();
    };
    
  }, [teacherId]);
  

  const sendId = (id)=>{
    setTeacherId(id);
    navigate(`/dashstud/${studentId}/chat/${name}`)
    console.log(teacherId);
  }
  const handleName = (e)=>{
    setSelectName(e);
    setShowDiv1(false);
    setShowDiv2(true)
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room , senderId : studentId, recipientId:teacherId });
    setMessageSent(message);
    setMessageReceived((prevMessages)=>[...prevMessages,{message , type: 'sent'}]);
      setMessage(" ");
};
const mergedAndSortedMessages = [...fullMessage, ...fullMessage2].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div>
      {teacherId ? (
        <div className="relative flex overflow-hidden bg-[#080a18]">
          <div className=" w-[5%] h-[100vh]  flex flex-col justify-between relative gap-3 py-6 chatNav">
            <div className="flex items-center justify-center">
              <img src={logo} className="w-[50%]" />
            </div>
            <div className="h-[25%] flex flex-col justify-between">
              <Link to={`/dashstud/${studentId}/chat/${studentName}`}>
                <div className="flex items-center justify-center">
                  <img src={features} className="w-[50%]" />
                </div>
              </Link>
              <Link to={`/dashstud/${studentId}/doubts`}>
                <div className="flex items-center justify-center">
                  <img src={contact} className="w-[50%]" />
                </div>
              </Link>
            </div>
            <Link to={`/dashstud/${studentId}/${studentName}`}>
              <div className="flex items-center justify-center">
                <img src={profile} className="w-[50%]" />
              </div>
            </Link>
          </div>
          <div className=" w-[28%] h-[100vh] shadow-sm shadow-gray-600 relative flex flex-col chatMid">
            <div className="h-[8%]  flex items-center justify-center shadow-sm shadow-slate-400 text-white">
              Messages
            </div>
            <div className="flex flex-col  items-center   text-white h-[92%] justify-center">
              <div className=" bg-[#1c326c] h-[85%] w-[85%] rounded-xl flex flex-col items-center">
                {uniquePairArray.map((pair, index) => (
                  <div
                    key={index}
                    className="h-11 w-full cursor-pointer flex shadow-sm shadow-slate-400 rounded-t-xl items-center justify-center"
                    onClick={() => {
                      sendId(pair[0]);
                      handleName(pair[1]);
                      handleDivs();
                    }}
                  >
                    {pair[1]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full extra-div">
            {selectName ? (
              <div className="  w-[full] relative h-[100vh] mainChat">
                <h1 className="h-[8%] flex items-center pl-3 shadow-sm shadow-slate-400 text-white">
                  {selectName}
                </h1>
                <div className="overflow-y-auto h-[83%]">
                  <div>
                    {mergedAndSortedMessages.map((msg) => (
                      <div key={msg._id}>
                        {messageReceived.find(
                          (socketMsg) => socketMsg._id === msg._id
                        ) ? null : (
                          <p className="w-auto">
                            {msg.senderId === studentId ? (
                              <div className=" flex justify-end mr-3 text-white">
                                <h1 className="  gap-3  my-1 bg-[#1c326c]  p-2 rounded-xl">
                                  {msg.message}
                                </h1>
                              </div>
                            ) : (
                              <div className="flex ml-3 ">
                                <h1 className=" p-2 rounded-xl my-1 bg-[#DFDFDF]">
                                  {msg.message}
                                </h1>
                              </div>
                            )}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    {messageReceived.map((msg, index) => (
                      <div key={index}>
                        {mergedAndSortedMessages.find(
                          (dbMsg) => dbMsg._id === msg._id
                        ) ? null : (
                          <>
                            {msg.type === "received" ? (
                              <div className="flex ml-3">
                                <h1 className="bg-[#DFDFDF] p-2 rounded-xl my-1">
                                  {msg.message}
                                </h1>
                              </div>
                            ) : (
                              <div className="flex justify-end mr-3 text-white">
                                <h1 className="gap-3 my-1 bg-[#1c326c]  p-2 rounded-xl">
                                  {msg.message}
                                </h1>
                              </div>
                            )}
                          </>
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
                    className="flex w-[95%] p-2 rounded-2xl bg-[#080a18] text-white border-gray-700 border-2"
                  />
                  <button
                    onClick={sendMessage}
                    className="absolute right-[35px] text-[#5e82e6]"
                  >
                    {" "}
                    Send{" "}
                  </button>
                </div>
              </div>
            ) : (
              <div className=" flex flex-col items-center justify-center relative h-[100vh]">
                <img src={msgIcon} className="w-[30%]" />
                <h1 className="text-6xl font-semibold text-white text-center">
                  Chat with your Teachers
                </h1>
              </div>
            )}
          </div>
          {isSmallScreen && (
            <div className="w-[100vw]">
              {showDiv1 && (
                <div className=" w-[100%] h-[100vh] shadow-sm shadow-gray-600 relative flex flex-col">
                  <div className="h-[8%]  flex items-center justify-center shadow-sm shadow-slate-400 text-white">
                    Messages
                  </div>
                  <div className="flex flex-col  items-center  text-white h-[92%] justify-center">
                    <div className=" bg-[#1c326c] h-[85%] w-[85%] rounded-xl flex flex-col items-center">
                      
                      {uniquePairArray.map((pair, index) => (
                        <div
                          key={index}
                          className="h-11 w-full cursor-pointer flex shadow-sm shadow-slate-400 rounded-t-xl items-center justify-center"
                          onClick={() => {
                            sendId(pair[0]);
                            handleName(pair[1]);
                            handleDivs();
                          }}
                        >
                          {pair[1]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {showDiv2 && (
                <div className="  w-[100%] relative h-[100vh] ">
                  <div className=" h-[8%] flex items-center shadow-sm shadow-slate-400 p-2">
                    <img
                      src={back}
                      className="w-[5%] ml-2 back hidden cursor-pointer"
                      onClick={() => {
                        setShowDiv1(true), setShowDiv2(false);
                      }}
                    />
                    <div className=" flex items-center pl-3  text-2xl ml-10 font-bold text-white">
                      {selectName}
                    </div>
                  </div>
                  <div className="overflow-y-auto h-[83%]">
                    <div>
                      {mergedAndSortedMessages.map((msg) => (
                        <div key={msg._id}>
                          <p className="w-auto ">
                            {msg.senderId === studentId ? (
                              <div className=" flex justify-end mr-3 text-white">
                                <h1 className="  gap-3  my-1 bg-[#1c326c]  p-2 rounded-xl">
                                  {msg.message}
                                </h1>
                              </div>
                            ) : (
                              <div className="flex ml-3 ">
                                <h1 className=" p-2 rounded-xl my-1 bg-[#DFDFDF]">
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
                            <div className="flex ml-3">
                              <h1 className="bg-[#DFDFDF] p-2 rounded-xl my-1">
                                {msg.message}
                              </h1>
                            </div>
                          ) : (
                            <div className="flex justify-end mr-3 text-white">
                              <h1 className="gap-3 my-1 bg-[#1c326c]  p-2 rounded-xl">
                                {msg.message}
                              </h1>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex h-[9%] items-center justify-center relative ">
                    <input
                      placeholder="Message..."
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                      className="flex p-2 rounded-2xl justify-center bg-[#080a18] text-white border-gray-700 border-2 w-[95%]"
                    />
                    <button
                      onClick={sendMessage}
                      className=" absolute right-[21px] text-blue-400"
                    >
                      {" "}
                      Send{" "}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="notAvail">
          <Navbar />
          <div className="flex  items-center justify-center text-[#4e4669]">
            <h1 className="text-5xl  text-center font-extrabold">
              Teacher not available yet
            </h1>
            {/* <img src={noTeach} className='w-[30%]' /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatStud;
