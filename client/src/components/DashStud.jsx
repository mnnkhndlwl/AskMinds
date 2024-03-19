import React , {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";
import Doubt from "../images/doubtask.jpg"
import Lottie from 'react-lottie-player'
import stud from "../assets/studDoubt.json"
import doubt from "../assets/doubt.json"
// import Demo2 from './Demo2';
import { StudentDash } from './StudentDash';
import Navbar from './Navbar';
import { useDemoContext } from '../contexts/DemoContext';
import ChatStud from './ChatStud';
import Nav2 from './Nav2';
const DashStud = () => {
  const { studentId ,name} = useParams();
  const [subject,setSubject]= useState('')
  const [classs,setClasss]= useState('')
  const {setStudName} = useDemoContext();
  const token = sessionStorage.getItem('token')
  console.log(subject);
  const navigate = useNavigate()

  const handleSave= (selectClass , selectSubject)=>{
    setSubject(selectSubject);
    setClasss(selectClass)
  }
  useEffect(()=>{
    setStudName(name)
    if(!token){
      navigate('/teachsign')
    }
  },[setStudName])
  return (
    <div className="flex flex-col   doubtstud ">
      <Navbar/>
      <div className="flex flex-col items-center">
        <h2 className="text-5xl text-[#9AD4D6] font-bold text-stud">
          WELCOME {name}{" "}
        </h2>
        <div className="flex justify-around items-center w-[100%] mt-2 stud-dash">
          <div className=" w-[20rem] h-[22rem] rounded-xl  flex flex-col items-center justify-center example mt-11 relative">
            <div className="imgi  w-[100%]  rounded-xl">
              <Lottie play animationData={doubt} className="h-[90%]"></Lottie>
            </div>
            <div className="content bg-[#564787] flex flex-col items-center justify-center text-white">
              <h1 className="text-center text-xl m-1">
                Post your doubt and get answers from our expert teachers
              </h1>
              <Link to={`/dashstud/${studentId}/doubts`}>
                <h1 className="rounded-xl p-1 bg-[#9AD4D6] text-center w-[100%] py-2 my-2">
                  Post doubt
                </h1>
              </Link>
            </div>
          </div>
          <div className=" w-[20rem] h-[22rem] rounded-xl  flex flex-col items-center justify-center example mt-11 relative">
            <div className="imgi  shadow-md w-[100%]  rounded-xl">
              <Lottie play animationData={stud} className="h-[90%]"></Lottie>
            </div>
            <div className="content bg-[#564787] flex flex-col items-center justify-center text-white">
              <h1 className="text-center text-xl m-1">
                Chat with your teacher and get your doubt cleared
              </h1>
              <Link to={`/dashstud/${studentId}/chat/${name}`}>
                <div>
                  <h1 className="rounded-xl p-1 bg-[#9AD4D6] text-center w-[100%] py-2 my-2">
                    Start chatting
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <Router> */}
        {/* <Routes>
          <Route
            path="/chat"
            element={<ChatStud />}
          />
        </Routes> */}
      {/* </Router> */}
    </div>
  );
}

export default DashStud