import React, { useState, useEffect } from 'react';
import { useParams , useNavigate, Link} from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios'
import ChatBox from './ChatBox';
import about from "../Icons/info.png"
import features from "../Icons/chat.png"
import contact from "../Icons/post.png"
import logo from "../images/logo.png"
import profile from "../Icons/about.png"
import { useDemoContext } from '../contexts/DemoContext';
import Navbar from './Navbar';
import back from "../Icons/back.png"

const ChatTeach = () => {

  // const {name}  = useDemoContext();
  const { teacherId ,studentId, nam,studentName} = useParams();
  const navigate = useNavigate();
  
  const storedStudentId = sessionStorage.getItem('studentId');
  const [studId, setStudentId] = useState(storedStudentId);
  const [studName ,setStudName]= useState([])
  const [ids,setIds] = useState([])
  const [selectName , setSelectName] = useState(studentName || '')
  const [showDiv1 , setShowDiv1] = useState(true)
  const [showDiv2 , setShowDiv2] = useState(false)
  const [showDiv3 , setShowDiv3] = useState(false)
  const [uniquePairArray ,setUniquePairArray] = useState([])

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
  const handleBack = ()=>{
    setShowDiv1(true)
    setShowDiv2(false)
    console.log('clicked');
  }

    const getChats = async ()=>{
        try{
            const url = `http://localhost:3000/get-chats/${teacherId}`;
        const response = await axios.get(url);
        const data = response.data;
        const names = data.map(item => item.senderName)
        const recipientIds = data.map(item => item.recipientId)
        setInfo(recipientIds)
        }
        catch(err){
            console.log(err);
        }
        
    }

    const getIds = async()=>{
      try{
        const response = await axios.get(`http://localhost:3000/info-get/${teacherId}`);
        const names = response.data.info;
        const pairs = names.map(item => [item.senderId, item.senderName]);
        const uniquePairs = new Set(pairs.map(pair => pair.join(',')));
        const uniquePairsArray = Array.from(uniquePairs).map(pairStr => pairStr.split(','));
        setUniquePairArray(uniquePairsArray)


        // const senderIds = names.map(item => item.senderId);
        // const uniqueData = new Set(senderIds);
        // // names.forEach(item => {
        //   uniqueData.add({ senderId: item.senderId, senderName: item.senderName });
        // });
        // const uniqueNamesArray = [...uniqueData];
        console.log(uniquePairArray);
        
        // console.log(uniqueNames); 
        setStudName([...uniquePairs])
        
      }
      catch(err){
        console.log(err);
      }
    }

    const handleName = (e)=>{
      setSelectName(e);
      setShowDiv1(false)
      setShowDiv2(true)
      setShowDiv3(false)
    }
    const handleDivs = ()=>{
      console.log('clicked');
      setShowDiv1(false);
      setShowDiv2(true)
    }

    useEffect(()=>{
      setInfo((prev) => [...prev, studentId]);
        getChats();
        getIds();
        console.log(nam);
        // console.log(isSmallScreen);
    },[studId,studentId,nam])

    const sendId = (id)=>{
      // const newStudentId = e.target.textContent;
      setStudentId(id);
      sessionStorage.setItem('studentId', id);
      navigate(`/chatTeach/${teacherId}/${nam}/${id}`)
      // console.log(studId);
    }

  return (
    <div className="flex text-white bg-[#080a18] chatTeach-main">
      <div className="chat-nav ran-nav">
        <Navbar />
      </div>

      <div className=" w-[5%] h-[100vh]  flex flex-col justify-between relative gap-3 py-6 chat-nav1">
        <Link to="/">
          <div className="flex items-center justify-center">
            <img src={logo} className="w-[50%]" />
          </div>
        </Link>
        <div className="h-[25%] flex flex-col justify-between">
          <Link to={`/dashteach/${teacherId}/${nam}/doubts`}>
            <div className="flex items-center justify-center">
              <img src={contact} className="w-[50%]" />
            </div>
          </Link>
          <Link to={`/dashteach/${teacherId}/profile`}>
            <div className="flex items-center justify-center">
              <img src={about} className="w-[50%]" />
            </div>
          </Link>
          <Link to={`/chatTeach/${teacherId}/${nam}`}>
            <div className="flex items-center justify-center">
              <img src={features} className="w-[50%]" />
            </div>
          </Link>
        </div>

        <Link to={`/dashteach/${teacherId}/${nam}`}>
          <div className="flex items-center justify-center">
            <img src={profile} className="w-[50%]" />
          </div>
        </Link>
      </div>
      <div className="flex w-[95%] chat-mid">
        <div className=" w-[30%] h-[100vh] shadow-sm shadow-gray-600  messages">
          <div className="flex flex-col items-center justify-center h-[100vh] relative">
            <div className="h-[8.5%]  flex items-center shadow-sm w-full justify-center  shadow-slate-400">
              Messages
            </div>
            <div className="flex flex-col items-center w-[90%]   text-white h-[92%] mt-10 relative">
              <div className="bg-[#1c326c] h-[90%] w-[95%] rounded-xl 0 flex flex-col items-center ">
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
        </div>
        <div className=" w-[70%]  chat">
          <ChatBox studentId={studId} selectName={selectName} />
        </div>
      </div>
      {isSmallScreen && (
        <div>
          {showDiv3 && (
            <div className="chat-nav">
              <Navbar />
            </div>
          )}
          <div className="flex w-[95%] chat-mid1">
            {showDiv1 && (
              <div className=" w-[30%] h-[100vh] shadow-sm shadow-gray-600  messages1">
                <div className="flex flex-col items-center justify-center h-[100vh] relative">
                  <div className="flex items-center  h-[8.5%] shadow-slate-400 shadow-sm w-[100%] relative">
                    {/* <Link to={`/dashteach/${teacherId}/${nam}`}>
                      <img
                        src={back}
                        className="w-[6%] ml-2 h-[100%] object-contain"
                      />
                    </Link> */}
                    <div className="  flex items-center   justify-center ml-[35%]">
                      Messages
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-[90%]  text-white h-[92%] mt-10 relative">
                    <div className="bg-[#1c326c] h-[90%] w-[95%] rounded-xl flex flex-col items-center">
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
              </div>
            )}
            {showDiv2 && (
              <div className=" w-[70%] h-[100vh] chat1 flex items-center justify-center">
                <ChatBox
                  studentId={studId}
                  // name={ran}
                  selectName={selectName}
                  onBack={handleBack}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatTeach;
